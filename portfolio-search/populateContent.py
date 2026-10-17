#!/usr/bin/env python3
"""
Content Editor
A small local web app for adding, searching and editing entries in content.json.

Run from the portfolio-search directory:
    python3 populateContent.py            # opens http://127.0.0.1:8765 in your browser
    python3 populateContent.py --port 9000 --no-browser

Only uses the Python standard library - no installs needed.
"""

import argparse
import json
import os
import sys
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any, Dict, List, Optional

ROOT = Path(__file__).resolve().parent
DEFAULT_CONTENT_FILE = ROOT / "src" / "data" / "content.json"
MEDIA_DIR = ROOT / "public" / "content"

SECTIONS = ["experiences", "projects", "education", "about"]
TYPE_TO_SECTION = {
    "experience": "experiences",
    "project": "projects",
    "education": "education",
    "about": "about",
}
MEDIA_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".mov", ".webm"}


class ContentStore:
    """Reads and writes content.json, keeping entry order and key order stable."""

    def __init__(self, path: Path):
        self.path = path
        self.lock = threading.Lock()

    def load(self) -> Dict[str, List[Dict[str, Any]]]:
        if not self.path.exists():
            return {section: [] for section in SECTIONS}
        with open(self.path, "r", encoding="utf-8") as f:
            data = json.load(f)
        for section in SECTIONS:
            data.setdefault(section, [])
        return data

    def write(self, data: Dict[str, Any]) -> None:
        # Write to a temp file first so a crash never leaves a half-written content.json
        tmp_path = self.path.with_suffix(".json.tmp")
        with open(tmp_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        os.replace(tmp_path, self.path)

    @staticmethod
    def find(data: Dict[str, Any], entry_id: str) -> Optional[tuple]:
        for section in SECTIONS:
            for index, item in enumerate(data.get(section, [])):
                if item.get("id") == entry_id:
                    return section, index
        return None

    def save_entry(self, entry: Dict[str, Any], original_id: Optional[str]) -> Dict[str, Any]:
        """Insert a new entry, or update the entry currently stored under original_id."""
        with self.lock:
            data = self.load()
            target_section = TYPE_TO_SECTION.get(entry.get("type", ""))
            if not target_section:
                raise ValueError(f"Unknown type: {entry.get('type')!r}")

            clash = self.find(data, entry["id"])
            if clash and entry["id"] != original_id:
                raise ValueError(f"An entry with ID '{entry['id']}' already exists in {clash[0]}")

            existing = self.find(data, original_id) if original_id else None
            if existing:
                section, index = existing
                merged = merge_preserving_key_order(data[section][index], entry)
                if section == target_section:
                    data[section][index] = merged
                else:
                    data[section].pop(index)
                    data[target_section].append(merged)
            else:
                merged = entry
                data[target_section].append(merged)

            self.write(data)
            return merged

    def delete_entry(self, entry_id: str) -> None:
        with self.lock:
            data = self.load()
            found = self.find(data, entry_id)
            if not found:
                raise ValueError(f"No entry with ID '{entry_id}'")
            section, index = found
            data[section].pop(index)
            self.write(data)

    def move_entry(self, entry_id: str, direction: int) -> None:
        """Move an entry up (-1) or down (+1) within its section."""
        with self.lock:
            data = self.load()
            found = self.find(data, entry_id)
            if not found:
                raise ValueError(f"No entry with ID '{entry_id}'")
            section, index = found
            new_index = index + direction
            items = data[section]
            if 0 <= new_index < len(items):
                items[index], items[new_index] = items[new_index], items[index]
                self.write(data)


def merge_preserving_key_order(original: Dict[str, Any], updated: Dict[str, Any]) -> Dict[str, Any]:
    """Keep the original key order (so git diffs stay small), drop removed keys, append new ones."""
    merged = {key: updated[key] for key in original if key in updated}
    for key, value in updated.items():
        if key not in merged:
            merged[key] = value
    return merged


def list_media() -> Dict[str, List[str]]:
    """Map each folder under public/content to the media files inside it."""
    media: Dict[str, List[str]] = {}
    if not MEDIA_DIR.exists():
        return media
    for folder in sorted(p for p in MEDIA_DIR.iterdir() if p.is_dir()):
        files = sorted(
            f.name for f in folder.iterdir()
            if f.is_file() and f.suffix.lower() in MEDIA_EXTENSIONS
        )
        media[folder.name] = files
    return media


def make_handler(store: ContentStore):
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, format, *args):
            pass  # keep the terminal quiet

        def send_json(self, payload: Any, status: int = 200) -> None:
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def read_json(self) -> Dict[str, Any]:
            length = int(self.headers.get("Content-Length", 0))
            return json.loads(self.rfile.read(length) or b"{}")

        def do_GET(self):
            if self.path == "/":
                body = PAGE_HTML.encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
            elif self.path == "/api/content":
                try:
                    self.send_json({
                        "data": store.load(),
                        "media": list_media(),
                        "file": str(store.path),
                    })
                except json.JSONDecodeError as e:
                    self.send_json({"error": f"Invalid JSON in {store.path}: {e}"}, 500)
            elif self.path.startswith("/media/"):
                self.serve_media(self.path[len("/media/"):])
            else:
                self.send_error(404)

        def serve_media(self, rel_path: str) -> None:
            # Thumbnails for the photo picker; refuse anything outside public/content
            target = (MEDIA_DIR / rel_path).resolve()
            if MEDIA_DIR.resolve() not in target.parents or not target.is_file():
                self.send_error(404)
                return
            content_type = {
                ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
                ".gif": "image/gif", ".webp": "image/webp",
            }.get(target.suffix.lower(), "application/octet-stream")
            body = target.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def do_POST(self):
            try:
                payload = self.read_json()
                if self.path == "/api/save":
                    saved = store.save_entry(payload["entry"], payload.get("originalId"))
                    self.send_json({"ok": True, "entry": saved})
                elif self.path == "/api/delete":
                    store.delete_entry(payload["id"])
                    self.send_json({"ok": True})
                elif self.path == "/api/move":
                    store.move_entry(payload["id"], int(payload["direction"]))
                    self.send_json({"ok": True})
                else:
                    self.send_error(404)
            except (ValueError, KeyError) as e:
                self.send_json({"error": str(e)}, 400)
            except Exception as e:
                self.send_json({"error": f"Failed to save: {e}"}, 500)

    return Handler


PAGE_HTML = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Content Editor</title>
<style>
  :root {
    --bg: #f6f6f4; --panel: #ffffff; --text: #1d1d1b; --muted: #6b6b66;
    --border: #e2e2dd; --accent: #2f5bea; --accent-soft: #e8eeff;
    --danger: #c43d3d; --ok: #2d8a4e; --input: #ffffff; --chip: #eef0f3;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #151515; --panel: #1e1e1e; --text: #ececea; --muted: #9a9a95;
      --border: #333331; --accent: #7c9bff; --accent-soft: #232b45;
      --danger: #ef6b6b; --ok: #5ec07f; --input: #262626; --chip: #2c2f35;
    }
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body { background: var(--bg); color: var(--text); font: 14px/1.45 system-ui, -apple-system, "Segoe UI", sans-serif; }
  .app { display: grid; grid-template-columns: 340px 1fr; height: 100vh; }
  aside { border-right: 1px solid var(--border); background: var(--panel); display: flex; flex-direction: column; min-height: 0; }
  .aside-head { padding: 14px; border-bottom: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
  .aside-head .row { display: flex; gap: 8px; }
  .filters { display: flex; flex-wrap: wrap; gap: 6px; }
  .filters button { padding: 3px 10px; border-radius: 999px; font-size: 12px; }
  .filters button.on { background: var(--accent); color: #fff; border-color: var(--accent); }
  .list { overflow-y: auto; flex: 1; padding: 6px 0; }
  .group-title { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); padding: 12px 14px 4px; }
  .item { padding: 8px 14px; cursor: pointer; border-left: 3px solid transparent; }
  .item:hover { background: var(--bg); }
  .item.active { background: var(--accent-soft); border-left-color: var(--accent); }
  .item .t { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .item .s { color: var(--muted); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  mark { background: #ffe58a; color: inherit; border-radius: 2px; }
  main { overflow-y: auto; min-height: 0; }
  .editor { max-width: 860px; margin: 0 auto; padding: 22px 28px 120px; }
  .editor-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
  .editor-head h1 { font-size: 20px; margin: 0; }
  .badge { font-size: 12px; color: var(--muted); }
  .badge.dirty { color: var(--danger); }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 16px; }
  .full { grid-column: 1 / -1; }
  label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 4px; }
  label .req { color: var(--danger); }
  .hint { font-weight: 400; }
  input, select, textarea, button { font: inherit; color: var(--text); }
  input, select, textarea { width: 100%; padding: 8px 10px; border: 1px solid var(--border); border-radius: 6px; background: var(--input); }
  input:focus, select:focus, textarea:focus { outline: 2px solid var(--accent); outline-offset: -1px; border-color: transparent; }
  textarea { min-height: 260px; resize: vertical; line-height: 1.55; }
  button { padding: 7px 12px; border: 1px solid var(--border); background: var(--panel); border-radius: 6px; cursor: pointer; }
  button:hover { border-color: var(--muted); }
  button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  button.danger { color: var(--danger); }
  button.small { padding: 3px 8px; font-size: 12px; }
  .invalid { border-color: var(--danger) !important; }
  fieldset { border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px 14px; margin: 0; }
  legend { font-size: 12px; font-weight: 600; color: var(--muted); padding: 0 6px; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 6px; border: 1px solid var(--border); border-radius: 6px; background: var(--input); cursor: text; }
  .chip { display: inline-flex; align-items: center; gap: 4px; background: var(--chip); border-radius: 999px; padding: 2px 4px 2px 10px; font-size: 13px; cursor: grab; }
  .chip button { border: none; background: none; padding: 0 5px; color: var(--muted); font-size: 15px; line-height: 1; }
  .chip.dragging { opacity: .4; }
  .chips input { flex: 1; min-width: 160px; border: none; padding: 4px; background: transparent; }
  .chips input:focus { outline: none; }
  .photo-row { display: grid; grid-template-columns: 48px 1fr 1fr auto; gap: 8px; align-items: center; margin-bottom: 8px; }
  .photo-row img { width: 48px; height: 48px; object-fit: cover; border-radius: 4px; background: var(--chip); }
  .photo-row .acts { display: flex; gap: 4px; }
  .actions { position: fixed; bottom: 0; left: 340px; right: 0; background: var(--panel); border-top: 1px solid var(--border); padding: 12px 28px; display: flex; gap: 8px; align-items: center; }
  .actions .spacer { flex: 1; }
  .kbd { font-size: 11px; color: var(--muted); }
  .toast { position: fixed; top: 16px; right: 16px; padding: 10px 14px; border-radius: 8px; background: var(--panel); border: 1px solid var(--border); box-shadow: 0 6px 24px rgba(0,0,0,.15); opacity: 0; transform: translateY(-8px); transition: .2s; pointer-events: none; max-width: 420px; }
  .toast.show { opacity: 1; transform: none; }
  .toast.ok { border-left: 4px solid var(--ok); }
  .toast.err { border-left: 4px solid var(--danger); }
  .empty { color: var(--muted); padding: 20px 14px; }
  .preview { white-space: pre-wrap; background: var(--bg); border: 1px dashed var(--border); border-radius: 6px; padding: 10px 12px; font-size: 13px; max-height: 260px; overflow: auto; }
  @media (max-width: 800px) {
    .app { grid-template-columns: 1fr; grid-template-rows: 40vh 1fr; height: auto; min-height: 100vh; }
    .grid { grid-template-columns: 1fr; }
    .actions { left: 0; padding: 10px 16px; flex-wrap: wrap; }
    .editor { padding: 16px 16px 140px; }
  }
</style>
</head>
<body>
<div class="app">
  <aside>
    <div class="aside-head">
      <div class="row">
        <input id="search" type="search" placeholder="Search title, company, skill, text…  ( / )" autocomplete="off">
        <button id="newBtn" class="primary" title="New entry (Alt+N)">New</button>
      </div>
      <div class="filters" id="filters"></div>
    </div>
    <div class="list" id="list"></div>
  </aside>

  <main>
    <div class="editor">
      <div class="editor-head">
        <h1 id="heading">New entry</h1>
        <span id="status" class="badge"></span>
      </div>

      <form id="form" autocomplete="off" onsubmit="return false">
        <div class="grid">
          <div class="full">
            <label for="title">Title <span class="req">*</span></label>
            <input id="title" name="title">
          </div>
          <div>
            <label for="id">ID <span class="req">*</span> <span class="hint">(URL slug, auto from title for new entries)</span></label>
            <input id="id" name="id">
          </div>
          <div>
            <label for="company">Company <span class="req">*</span></label>
            <input id="company" name="company" list="companyList">
          </div>
          <div>
            <label for="type">Type <span class="req">*</span></label>
            <select id="type" name="type">
              <option value="experience">experience</option>
              <option value="project">project</option>
              <option value="education">education</option>
              <option value="about">about</option>
            </select>
          </div>
          <div>
            <label for="category">Category <span class="req">*</span></label>
            <input id="category" name="category" list="categoryList">
          </div>
          <div>
            <label for="startDate">Start date <span class="req" id="startReq">*</span></label>
            <input id="startDate" name="startDate" type="month">
          </div>
          <div>
            <label for="endDate">End date <span class="hint">(blank = ongoing)</span></label>
            <input id="endDate" name="endDate" type="month">
          </div>
          <div>
            <label for="dateRange">Date range / grade <span class="hint">(optional label)</span></label>
            <input id="dateRange" name="dateRange" placeholder="e.g. Grade: A4">
          </div>
          <div>
            <label for="relevance">Relevance</label>
            <select id="relevance" name="relevance">
              <option value="">—</option>
              <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
            </select>
          </div>

          <div class="full">
            <label for="detail">Detail <span class="req">*</span> <span class="hint">(blank line = new paragraph)</span></label>
            <textarea id="detail" name="detail"></textarea>
          </div>

          <div class="full">
            <label>Skills <span class="req">*</span> <span class="hint">(Enter or comma to add, Backspace to remove, drag to reorder)</span></label>
            <div class="chips" id="skills">
              <input id="skillInput" list="skillList" placeholder="Add a skill…">
            </div>
          </div>

          <fieldset class="full">
            <legend>Link</legend>
            <div class="grid">
              <div><label for="linkUrl">URL</label><input id="linkUrl" placeholder="https://…"></div>
              <div><label for="linkLabel">Label</label><input id="linkLabel" list="linkLabelList" placeholder="e.g. GitHub Link"></div>
            </div>
          </fieldset>

          <fieldset class="full">
            <legend>Media</legend>
            <label>Photos <span class="hint">(filenames from public/content/…)</span></label>
            <div id="photos"></div>
            <button type="button" class="small" id="addPhoto">+ Add photo</button>
            <div style="margin-top:14px">
              <label for="video">Video <span class="hint">(public/content/videos)</span></label>
              <select id="video"></select>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  </main>
</div>

<div class="actions">
  <button class="primary" id="saveBtn">Save</button>
  <span class="kbd">Ctrl+S</span>
  <button id="dupBtn" title="Copy this entry into a new unsaved entry">Duplicate</button>
  <button id="upBtn" title="Move up within its section">↑</button>
  <button id="downBtn" title="Move down within its section">↓</button>
  <span class="spacer"></span>
  <button id="revertBtn">Revert</button>
  <button class="danger" id="deleteBtn">Delete</button>
</div>

<div class="toast" id="toast"></div>

<datalist id="skillList"></datalist>
<datalist id="companyList"></datalist>
<datalist id="categoryList"></datalist>
<datalist id="linkLabelList"></datalist>
<datalist id="photoList"></datalist>

<script>
const SECTIONS = ["experiences", "projects", "education", "about"];
const TYPE_TO_SECTION = { experience: "experiences", project: "projects", education: "education", about: "about" };
const DEFAULT_CATEGORY = { experience: "Work Experience", project: "Projects", education: "Education", about: "About" };
// Field order used for brand-new entries (existing entries keep their own order server-side)
const KEY_ORDER = ["id","title","company","startDate","endDate","dateRange","detail","skills","type","category","link","relevance","photos","video"];

let data = {};
let media = {};
let current = null;        // the stored entry being edited (null = new)
let skills = [];
let photos = [];
let idTouched = false;
let dirty = false;
let activeFilter = "all";

const $ = (id) => document.getElementById(id);
const f = {
  id: $("id"), title: $("title"), company: $("company"), type: $("type"), category: $("category"),
  startDate: $("startDate"), endDate: $("endDate"), dateRange: $("dateRange"), relevance: $("relevance"),
  detail: $("detail"), linkUrl: $("linkUrl"), linkLabel: $("linkLabel"), video: $("video"),
};

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function allEntries() {
  return SECTIONS.flatMap(sec => (data[sec] || []).map(e => ({ sec, e })));
}

function toast(msg, kind = "ok") {
  const t = $("toast");
  t.textContent = msg;
  t.className = `toast show ${kind}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => (t.className = "toast"), kind === "err" ? 5000 : 2200);
}

async function api(path, body) {
  const res = await fetch(path, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {});
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || res.statusText);
  return json;
}

async function reload() {
  const json = await api("/api/content");
  data = json.data;
  media = json.media;
  document.title = "Content Editor";
  refreshSuggestions();
  renderFilters();
  renderList();
}

function refreshSuggestions() {
  const entries = allEntries().map(x => x.e);
  const fill = (id, values) => {
    $(id).innerHTML = [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b))
      .map(v => `<option value="${esc(v)}">`).join("");
  };
  fill("skillList", entries.flatMap(e => e.skills || []));
  fill("companyList", entries.map(e => e.company));
  fill("categoryList", entries.map(e => e.category));
  fill("linkLabelList", entries.map(e => e.link && e.link.label));
  fill("photoList", Object.entries(media).filter(([dir]) => dir !== "videos").flatMap(([, files]) => files));
  const videos = media.videos || [];
  const chosen = f.video.value;
  f.video.innerHTML = `<option value="">— none —</option>` + videos.map(v => `<option>${esc(v)}</option>`).join("");
  f.video.value = chosen;
}

// ---------- sidebar ----------

function renderFilters() {
  const counts = Object.fromEntries(SECTIONS.map(s => [s, (data[s] || []).length]));
  const total = SECTIONS.reduce((n, s) => n + counts[s], 0);
  const btn = (key, label, n) => `<button type="button" data-f="${key}" class="${activeFilter === key ? "on" : ""}">${label} ${n}</button>`;
  $("filters").innerHTML = btn("all", "All", total) + SECTIONS.map(s => btn(s, s[0].toUpperCase() + s.slice(1), counts[s])).join("");
}

function highlight(text, terms) {
  let out = esc(text);
  for (const t of terms) {
    if (!t) continue;
    out = out.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "<mark>$1</mark>");
  }
  return out;
}

function renderList() {
  const q = $("search").value.trim().toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  const html = [];
  for (const sec of SECTIONS) {
    if (activeFilter !== "all" && activeFilter !== sec) continue;
    const scored = [];
    for (const e of data[sec] || []) {
      let score = 0, ok = true;
      for (const t of terms) {
        let s = 0;
        if ((e.title || "").toLowerCase().includes(t)) s += 10;
        if ((e.id || "").toLowerCase().includes(t)) s += 6;
        if ((e.company || "").toLowerCase().includes(t)) s += 5;
        if ((e.skills || []).some(k => k.toLowerCase().includes(t))) s += 4;
        if ((e.detail || "").toLowerCase().includes(t)) s += 1;
        if (!s) { ok = false; break; }
        score += s;
      }
      if (ok) scored.push({ e, score });
    }
    if (terms.length) scored.sort((a, b) => b.score - a.score);
    if (!scored.length) continue;
    html.push(`<div class="group-title">${sec} (${scored.length})</div>`);
    for (const { e } of scored) {
      const active = current && current.id === e.id ? " active" : "";
      const sub = [e.company, e.startDate && (e.startDate + (e.endDate ? " → " + e.endDate : " → now"))].filter(Boolean).join(" · ");
      html.push(`<div class="item${active}" data-id="${esc(e.id)}"><div class="t">${highlight(e.title, terms)}</div><div class="s">${highlight(sub, terms)}</div></div>`);
    }
  }
  $("list").innerHTML = html.join("") || `<div class="empty">No entries match “${esc(q)}”.</div>`;
}

$("filters").addEventListener("click", (ev) => {
  const b = ev.target.closest("button");
  if (!b) return;
  activeFilter = b.dataset.f;
  renderFilters();
  renderList();
});
$("list").addEventListener("click", (ev) => {
  const item = ev.target.closest(".item");
  if (!item) return;
  const found = allEntries().find(x => x.e.id === item.dataset.id);
  if (found && confirmDiscard()) loadEntry(found.e);
});
$("search").addEventListener("input", renderList);
$("search").addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    const first = $("list").querySelector(".item");
    if (first) first.click();
  }
});

// ---------- form ----------

function loadEntry(entry) {
  current = entry;
  idTouched = !!entry;
  const e = entry || { type: "project", category: DEFAULT_CATEGORY.project };
  f.id.value = e.id || "";
  f.title.value = e.title || "";
  f.company.value = e.company || "";
  f.type.value = e.type || "project";
  f.category.value = e.category || "";
  f.startDate.value = e.startDate || "";
  f.endDate.value = e.endDate || "";
  f.dateRange.value = e.dateRange || "";
  f.relevance.value = e.relevance != null ? String(e.relevance) : "";
  // Older entries were saved with a literal "\n" instead of a real newline - show them as real line breaks
  f.detail.value = (e.detail || "").replace(/\\n/g, "\n");
  f.linkUrl.value = (e.link && e.link.url) || "";
  f.linkLabel.value = (e.link && e.link.label) || "";
  f.video.value = e.video || "";
  skills = [...(e.skills || [])];
  photos = (e.photos || []).map(p => ({ ...p }));
  renderSkills();
  renderPhotos();
  updateStartRequired();
  document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
  $("heading").textContent = entry ? entry.title : "New entry";
  for (const id of ["dupBtn", "upBtn", "downBtn", "deleteBtn", "revertBtn"]) $(id).disabled = !entry;
  setDirty(false);
  renderList();
}

function setDirty(v) {
  dirty = v;
  $("status").textContent = v ? "● Unsaved changes" : (current ? `Saved · ${TYPE_TO_SECTION[current.type] || ""}` : "Not saved yet");
  $("status").className = "badge" + (v ? " dirty" : "");
}
function confirmDiscard() {
  return !dirty || confirm("You have unsaved changes. Discard them?");
}

$("form").addEventListener("input", () => setDirty(true));
f.title.addEventListener("input", () => {
  if (!idTouched) f.id.value = slugify(f.title.value);
});
f.id.addEventListener("input", () => { idTouched = true; });
f.type.addEventListener("change", () => {
  const known = Object.values(DEFAULT_CATEGORY);
  if (!f.category.value || known.includes(f.category.value)) f.category.value = DEFAULT_CATEGORY[f.type.value];
  updateStartRequired();
  setDirty(true);
});
function updateStartRequired() {
  $("startReq").style.display = f.type.value === "about" ? "none" : "";
}

// skills chips
function renderSkills() {
  const box = $("skills");
  box.querySelectorAll(".chip").forEach(c => c.remove());
  const input = $("skillInput");
  skills.forEach((s, i) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.draggable = true;
    chip.dataset.i = i;
    chip.innerHTML = `${esc(s)}<button type="button" title="Remove">×</button>`;
    chip.querySelector("button").onclick = () => { skills.splice(i, 1); renderSkills(); setDirty(true); };
    chip.addEventListener("dragstart", (ev) => { chip.classList.add("dragging"); ev.dataTransfer.setData("text/plain", String(i)); });
    chip.addEventListener("dragend", () => chip.classList.remove("dragging"));
    chip.addEventListener("dragover", (ev) => ev.preventDefault());
    chip.addEventListener("drop", (ev) => {
      ev.preventDefault();
      const from = Number(ev.dataTransfer.getData("text/plain"));
      const [moved] = skills.splice(from, 1);
      skills.splice(i, 0, moved);
      renderSkills();
      setDirty(true);
    });
    box.insertBefore(chip, input);
  });
}
function addSkill(raw) {
  const value = raw.trim();
  if (!value) return;
  // Reuse the existing capitalisation if this skill is already used elsewhere
  const known = [...$("skillList").options].map(o => o.value).find(v => v.toLowerCase() === value.toLowerCase());
  const skill = known || value;
  if (!skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
    skills.push(skill);
    renderSkills();
    setDirty(true);
  }
}
$("skills").addEventListener("click", (ev) => { if (ev.target === $("skills")) $("skillInput").focus(); });
$("skillInput").addEventListener("keydown", (ev) => {
  const input = ev.target;
  if (ev.key === "Enter" || ev.key === ",") {
    ev.preventDefault();
    addSkill(input.value);
    input.value = "";
  } else if (ev.key === "Backspace" && !input.value && skills.length) {
    skills.pop();
    renderSkills();
    setDirty(true);
  }
});
$("skillInput").addEventListener("change", (ev) => {
  // Picking from the datalist dropdown fires change without Enter
  if (ev.target.value && [...$("skillList").options].some(o => o.value === ev.target.value)) {
    addSkill(ev.target.value);
    ev.target.value = "";
  }
});

// photos
function photoSrc(filename) {
  for (const [dir, files] of Object.entries(media)) {
    if (files.includes(filename)) return `/media/${encodeURIComponent(dir)}/${encodeURIComponent(filename)}`;
  }
  return "";
}
function renderPhotos() {
  const box = $("photos");
  box.innerHTML = "";
  photos.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "photo-row";
    const src = photoSrc(p.filename);
    row.innerHTML = `
      ${src ? `<img src="${src}" alt="">` : `<img alt="">`}
      <input placeholder="filename.jpg" list="photoList" value="${esc(p.filename)}" data-k="filename">
      <input placeholder="Caption" value="${esc(p.caption)}" data-k="caption">
      <div class="acts">
        <button type="button" class="small" data-a="up" title="Move up">↑</button>
        <button type="button" class="small" data-a="down" title="Move down">↓</button>
        <button type="button" class="small danger" data-a="del" title="Remove">×</button>
      </div>`;
    row.querySelectorAll("input").forEach(inp => inp.addEventListener("input", () => {
      photos[i][inp.dataset.k] = inp.value;
      if (inp.dataset.k === "filename") {
        const img = row.querySelector("img");
        const s = photoSrc(inp.value);
        if (s) img.src = s; else img.removeAttribute("src");
      }
    }));
    row.querySelector(".acts").addEventListener("click", (ev) => {
      const a = ev.target.dataset.a;
      if (!a) return;
      if (a === "del") photos.splice(i, 1);
      if (a === "up" && i > 0) [photos[i - 1], photos[i]] = [photos[i], photos[i - 1]];
      if (a === "down" && i < photos.length - 1) [photos[i + 1], photos[i]] = [photos[i], photos[i + 1]];
      renderPhotos();
      setDirty(true);
    });
    box.appendChild(row);
  });
}
$("addPhoto").onclick = () => { photos.push({ caption: "", filename: "" }); renderPhotos(); setDirty(true); };

// ---------- build + validate ----------

function buildEntry() {
  const v = (el) => el.value.trim();
  const errors = [];
  const bad = (el, msg) => { errors.push(msg); el.classList.add("invalid"); };
  document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));

  if (skillInputHasText()) {
    addSkill($("skillInput").value);
    $("skillInput").value = "";
  }

  const type = f.type.value;
  if (!v(f.id)) bad(f.id, "ID is required");
  else if (!/^[a-z0-9-]+$/.test(v(f.id))) bad(f.id, "ID can only contain lowercase letters, numbers and hyphens");
  else if (allEntries().some(x => x.e.id === v(f.id) && x.e !== current)) bad(f.id, `ID '${v(f.id)}' is already used`);
  if (!v(f.title)) bad(f.title, "Title is required");
  if (!v(f.company)) bad(f.company, "Company is required");
  if (!v(f.category)) bad(f.category, "Category is required");
  if (!v(f.startDate) && type !== "about") bad(f.startDate, "Start date is required");
  if (v(f.startDate) && v(f.endDate) && v(f.endDate) < v(f.startDate)) bad(f.endDate, "End date is before start date");
  if (!v(f.detail)) bad(f.detail, "Detail is required");
  if (!skills.length) { errors.push("Add at least one skill"); $("skills").classList.add("invalid"); }
  if (!!v(f.linkUrl) !== !!v(f.linkLabel)) bad(v(f.linkUrl) ? f.linkLabel : f.linkUrl, "Link needs both a URL and a label");
  const cleanPhotos = photos.map(p => ({ caption: p.caption.trim(), filename: p.filename.trim() })).filter(p => p.filename || p.caption);
  if (cleanPhotos.some(p => !p.filename)) errors.push("Every photo needs a filename");

  const e = {
    id: v(f.id), title: v(f.title), company: v(f.company),
    detail: f.detail.value.replace(/\r\n/g, "\n").trim(),
    skills: [...skills], type, category: v(f.category),
  };
  // startDate/endDate: keep explicit nulls the entry already had (about entries use them)
  const dateField = (key) => {
    if (v(f[key])) e[key] = v(f[key]);
    else if (current && key in current && current[key] === null) e[key] = null;
    else if (key === "startDate" && type === "about") e[key] = null;
  };
  dateField("startDate");
  dateField("endDate");
  if (v(f.dateRange)) e.dateRange = v(f.dateRange);
  if (f.relevance.value) e.relevance = Number(f.relevance.value);
  if (v(f.linkUrl) && v(f.linkLabel)) e.link = { url: v(f.linkUrl), label: v(f.linkLabel) };
  if (cleanPhotos.length) e.photos = cleanPhotos;
  if (f.video.value) e.video = f.video.value;

  // Carry over any extra fields this form doesn't know about
  if (current) for (const k of Object.keys(current)) if (!KEY_ORDER.includes(k)) e[k] = current[k];

  const ordered = {};
  for (const k of [...KEY_ORDER, ...Object.keys(e)]) if (k in e && !(k in ordered)) ordered[k] = e[k];
  return { entry: ordered, errors };
}
function skillInputHasText() { return $("skillInput").value.trim().length > 0; }

async function save() {
  const { entry, errors } = buildEntry();
  if (errors.length) { toast(errors.join(" · "), "err"); return; }
  try {
    const res = await api("/api/save", { entry, originalId: current ? current.id : null });
    await reload();
    const saved = allEntries().find(x => x.e.id === res.entry.id);
    loadEntry(saved ? saved.e : res.entry);
    toast(`Saved “${entry.title}”`);
  } catch (err) {
    toast(err.message, "err");
  }
}

async function move(direction) {
  if (!current) return;
  if (dirty) { toast("Save your changes before reordering", "err"); return; }
  try {
    await api("/api/move", { id: current.id, direction });
    await reload();
    loadEntry(allEntries().find(x => x.e.id === current.id).e);
  } catch (err) { toast(err.message, "err"); }
}

$("saveBtn").onclick = save;
$("newBtn").onclick = () => { if (confirmDiscard()) { loadEntry(null); f.title.focus(); } };
$("revertBtn").onclick = () => { if (current && confirmDiscard()) loadEntry(current); };
$("upBtn").onclick = () => move(-1);
$("downBtn").onclick = () => move(1);
$("dupBtn").onclick = () => {
  if (!current || !confirmDiscard()) return;
  const copy = JSON.parse(JSON.stringify(current));
  copy.title = current.title + " (copy)";
  loadIntoForm(copy);
};
function loadIntoForm(e) {
  // Like loadEntry but keeps the form in "new entry" mode
  loadEntry(e);
  current = null;
  idTouched = false;
  f.id.value = slugify(e.title);
  $("heading").textContent = "New entry (duplicate)";
  for (const id of ["dupBtn", "upBtn", "downBtn", "deleteBtn", "revertBtn"]) $(id).disabled = true;
  setDirty(true);
  renderList();
}
$("deleteBtn").onclick = async () => {
  if (!current || !confirm(`Delete “${current.title}”? This removes it from content.json.`)) return;
  try {
    await api("/api/delete", { id: current.id });
    toast(`Deleted “${current.title}”`);
    await reload();
    loadEntry(null);
  } catch (err) { toast(err.message, "err"); }
};

document.addEventListener("keydown", (ev) => {
  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "s") { ev.preventDefault(); save(); }
  else if (ev.altKey && ev.key.toLowerCase() === "n") { ev.preventDefault(); $("newBtn").click(); }
  else if (ev.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) { ev.preventDefault(); $("search").focus(); }
  else if (ev.key === "Escape" && document.activeElement === $("search")) { $("search").value = ""; renderList(); }
});
window.addEventListener("beforeunload", (ev) => { if (dirty) { ev.preventDefault(); ev.returnValue = ""; } });

reload().then(() => loadEntry(null)).catch(err => toast(err.message, "err"));
</script>
</body>
</html>
"""


def main():
    parser = argparse.ArgumentParser(description="Local web editor for content.json")
    parser.add_argument("--file", default=str(DEFAULT_CONTENT_FILE), help="Path to content.json")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--no-browser", action="store_true", help="Don't open a browser tab")
    args = parser.parse_args()

    store = ContentStore(Path(args.file).resolve())
    try:
        store.load()
    except json.JSONDecodeError as e:
        sys.exit(f"Invalid JSON in {store.path}: {e}")

    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port), make_handler(store))
    except OSError:
        server = ThreadingHTTPServer(("127.0.0.1", 0), make_handler(store))  # port busy, pick a free one

    url = f"http://127.0.0.1:{server.server_address[1]}"
    print(f"Content editor running at {url}")
    print(f"Editing {store.path}")
    print("Press Ctrl+C to stop.")
    if not args.no_browser:
        threading.Timer(0.3, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
