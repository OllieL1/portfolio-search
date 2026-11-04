import React from 'react';

const ORDERED = /^\s*\d+[.)]\s+/;
const UNORDERED = /^\s*[-*•]\s+/;

type Block =
  | { kind: 'p'; lines: string[] }
  | { kind: 'ol' | 'ul'; items: string[] };

// Turns the plain-text `detail` field into paragraphs and lists.
// Blank lines separate paragraphs; lines starting "1." or "-" become list items.
const parseBlocks = (text: string): Block[] => {
  const blocks: Block[] = [];
  const lines = text.replace(/\\n/g, '\n').replace(/\r\n/g, '\n').split('\n');

  for (const raw of lines) {
    const line = raw.trimEnd();
    const last = blocks[blocks.length - 1];

    if (line.trim() === '') {
      blocks.push({ kind: 'p', lines: [] }); // paragraph break marker
      continue;
    }

    const listKind = ORDERED.test(line) ? 'ol' : UNORDERED.test(line) ? 'ul' : null;
    if (listKind) {
      const item = line.replace(listKind === 'ol' ? ORDERED : UNORDERED, '');
      if (last && last.kind === listKind) last.items.push(item);
      else blocks.push({ kind: listKind, items: [item] });
      continue;
    }

    if (last && last.kind === 'p') last.lines.push(line);
    else blocks.push({ kind: 'p', lines: [line] });
  }

  return blocks.filter(b => (b.kind === 'p' ? b.lines.length > 0 : b.items.length > 0));
};

const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {parseBlocks(text).map((block, i) => {
      if (block.kind === 'p') {
        return (
          <p key={i}>
            {block.lines.map((line, j) => (
              <React.Fragment key={j}>
                {j > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
        );
      }
      const List = block.kind;
      return (
        <List key={i}>
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </List>
      );
    })}
  </>
);

export default RichText;
