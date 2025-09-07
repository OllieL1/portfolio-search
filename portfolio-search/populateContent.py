#!/usr/bin/env python3
"""
Content JSON Manager
A GUI application to manage content.json entries for a personal website.
"""

import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import json
from datetime import datetime
import re
from typing import Dict, List, Optional, Any

class AutocompleteCombobox(ttk.Combobox):
    """A Combobox with autocomplete functionality"""
    
    def __init__(self, parent, values=None, **kwargs):
        super().__init__(parent, **kwargs)
        self.values_list = values or []
        self['values'] = self.values_list
        self.bind('<KeyRelease>', self.on_key_release)
        self.bind('<Button-1>', self.on_click)
    
    def on_key_release(self, event):
        """Handle key release events for autocomplete"""
        if event.keysym in ('Up', 'Down', 'Left', 'Right', 'Tab', 'Return'):
            return
        
        current_text = self.get()
        if not current_text:
            self['values'] = self.values_list
            return
        
        # Filter values based on current input
        matches = [item for item in self.values_list 
                  if current_text.lower() in item.lower()]
        self['values'] = matches
        
        if matches:
            self.event_generate('<Down>')
    
    def on_click(self, event):
        """Show all values when clicked"""
        self['values'] = self.values_list
    
    def add_value(self, value: str):
        """Add a new value to the list"""
        if value not in self.values_list:
            self.values_list.append(value)
            self['values'] = self.values_list

class ContentJSONManager:
    def __init__(self, root):
        self.root = root
        self.root.title("Content JSON Manager")
        self.root.geometry("800x900")
        
        # Data storage
        self.content_data = {"experiences": [], "projects": [], "education": [], "about": []}
        self.all_skills = set()
        self.file_path = "content.json"
        
        # Load existing data
        self.load_existing_data()
        
        # Create GUI
        self.create_widgets()
        
    def load_existing_data(self):
        """Load existing content.json file if it exists"""
        try:
            with open(self.file_path, 'r', encoding='utf-8') as f:
                self.content_data = json.load(f)
                
            # Extract all existing skills for autocomplete
            for category in self.content_data.values():
                for item in category:
                    if 'skills' in item:
                        self.all_skills.update(item['skills'])
                        
        except FileNotFoundError:
            messagebox.showinfo("Info", f"{self.file_path} not found. Starting with empty data.")
        except json.JSONDecodeError:
            messagebox.showerror("Error", f"Invalid JSON in {self.file_path}")
    
    def create_widgets(self):
        """Create the main GUI widgets"""
        # Main frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Configure grid weights
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        
        # Title
        title_label = ttk.Label(main_frame, text="Content JSON Manager", 
                               font=('Arial', 16, 'bold'))
        title_label.grid(row=0, column=0, columnspan=2, pady=(0, 20))
        
        # File path selection
        file_frame = ttk.LabelFrame(main_frame, text="File Settings", padding="5")
        file_frame.grid(row=1, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 10))
        file_frame.columnconfigure(1, weight=1)
        
        ttk.Label(file_frame, text="JSON File:").grid(row=0, column=0, sticky=tk.W, padx=(0, 5))
        self.file_path_var = tk.StringVar(value=self.file_path)
        ttk.Entry(file_frame, textvariable=self.file_path_var, width=50).grid(row=0, column=1, sticky=(tk.W, tk.E), padx=(0, 5))
        ttk.Button(file_frame, text="Browse", command=self.browse_file).grid(row=0, column=2)
        
        # Form fields
        form_frame = ttk.LabelFrame(main_frame, text="Add New Entry", padding="10")
        form_frame.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E, tk.N), pady=(0, 10))
        form_frame.columnconfigure(1, weight=1)
        
        row = 0
        
        # ID (auto-generated but editable)
        ttk.Label(form_frame, text="ID:").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.id_var = tk.StringVar()
        ttk.Entry(form_frame, textvariable=self.id_var).grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        row += 1
        
        # Title*
        ttk.Label(form_frame, text="Title*:").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.title_var = tk.StringVar()
        title_entry = ttk.Entry(form_frame, textvariable=self.title_var)
        title_entry.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        title_entry.bind('<KeyRelease>', self.update_id)
        row += 1
        
        # Company*
        ttk.Label(form_frame, text="Company*:").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.company_var = tk.StringVar()
        ttk.Entry(form_frame, textvariable=self.company_var).grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        row += 1
        
        # Type*
        ttk.Label(form_frame, text="Type*:").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.type_var = tk.StringVar()
        type_combo = ttk.Combobox(form_frame, textvariable=self.type_var, 
                                 values=['experience', 'project', 'education', 'about'],
                                 state='readonly')
        type_combo.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        type_combo.bind('<<ComboboxSelected>>', self.update_category)
        row += 1
        
        # Category*
        ttk.Label(form_frame, text="Category*:").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.category_var = tk.StringVar()
        ttk.Entry(form_frame, textvariable=self.category_var).grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        row += 1
        
        # Start Date*
        ttk.Label(form_frame, text="Start Date* (YYYY-MM):").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.start_date_var = tk.StringVar()
        ttk.Entry(form_frame, textvariable=self.start_date_var).grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        row += 1
        
        # End Date
        ttk.Label(form_frame, text="End Date (YYYY-MM):").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.end_date_var = tk.StringVar()
        ttk.Entry(form_frame, textvariable=self.end_date_var).grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        row += 1
        
        # Date Range
        ttk.Label(form_frame, text="Date Range:").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.date_range_var = tk.StringVar()
        ttk.Entry(form_frame, textvariable=self.date_range_var).grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        row += 1
        
        # Relevance
        ttk.Label(form_frame, text="Relevance (1-5):").grid(row=row, column=0, sticky=tk.W, padx=(0, 10), pady=5)
        self.relevance_var = tk.StringVar()
        ttk.Entry(form_frame, textvariable=self.relevance_var).grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        row += 1
        
        # Detail*
        ttk.Label(form_frame, text="Detail*:").grid(row=row, column=0, sticky=(tk.NW, tk.W), padx=(0, 10), pady=5)
        detail_frame = ttk.Frame(form_frame)
        detail_frame.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        detail_frame.columnconfigure(0, weight=1)
        
        self.detail_text = tk.Text(detail_frame, height=6, wrap=tk.WORD)
        detail_scrollbar = ttk.Scrollbar(detail_frame, orient=tk.VERTICAL, command=self.detail_text.yview)
        self.detail_text.configure(yscrollcommand=detail_scrollbar.set)
        
        self.detail_text.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        detail_scrollbar.grid(row=0, column=1, sticky=(tk.N, tk.S))
        row += 1
        
        # Skills*
        ttk.Label(form_frame, text="Skills*:").grid(row=row, column=0, sticky=(tk.NW, tk.W), padx=(0, 10), pady=5)
        skills_frame = ttk.Frame(form_frame)
        skills_frame.grid(row=row, column=1, sticky=(tk.W, tk.E), pady=5)
        skills_frame.columnconfigure(0, weight=1)
        
        # Skills entry with autocomplete
        skills_entry_frame = ttk.Frame(skills_frame)
        skills_entry_frame.grid(row=0, column=0, sticky=(tk.W, tk.E), pady=(0, 5))
        skills_entry_frame.columnconfigure(0, weight=1)
        
        self.skills_combo = AutocompleteCombobox(skills_entry_frame, values=list(self.all_skills))
        self.skills_combo.grid(row=0, column=0, sticky=(tk.W, tk.E), padx=(0, 5))
        
        ttk.Button(skills_entry_frame, text="Add Skill", 
                  command=self.add_skill).grid(row=0, column=1)
        
        # Skills listbox
        self.skills_listbox = tk.Listbox(skills_frame, height=4)
        self.skills_listbox.grid(row=1, column=0, sticky=(tk.W, tk.E), pady=(0, 5))
        
        skills_buttons_frame = ttk.Frame(skills_frame)
        skills_buttons_frame.grid(row=2, column=0, sticky=tk.W)
        
        ttk.Button(skills_buttons_frame, text="Remove Selected", 
                  command=self.remove_skill).grid(row=0, column=0, padx=(0, 5))
        ttk.Button(skills_buttons_frame, text="Clear All", 
                  command=self.clear_skills).grid(row=0, column=1)
        row += 1
        
        # Link section
        link_frame = ttk.LabelFrame(form_frame, text="Link (Optional)", padding="5")
        link_frame.grid(row=row, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=10)
        link_frame.columnconfigure(1, weight=1)
        
        ttk.Label(link_frame, text="URL:").grid(row=0, column=0, sticky=tk.W, padx=(0, 10), pady=2)
        self.link_url_var = tk.StringVar()
        ttk.Entry(link_frame, textvariable=self.link_url_var).grid(row=0, column=1, sticky=(tk.W, tk.E), pady=2)
        
        ttk.Label(link_frame, text="Label:").grid(row=1, column=0, sticky=tk.W, padx=(0, 10), pady=2)
        self.link_label_var = tk.StringVar()
        ttk.Entry(link_frame, textvariable=self.link_label_var).grid(row=1, column=1, sticky=(tk.W, tk.E), pady=2)
        
        # Buttons
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=3, column=0, columnspan=2, pady=20)
        
        ttk.Button(button_frame, text="Add Entry", 
                  command=self.add_entry, style='Accent.TButton').grid(row=0, column=0, padx=5)
        ttk.Button(button_frame, text="Clear Form", 
                  command=self.clear_form).grid(row=0, column=1, padx=5)
        ttk.Button(button_frame, text="View JSON", 
                  command=self.view_json).grid(row=0, column=2, padx=5)
    
    def browse_file(self):
        """Browse for JSON file"""
        filename = filedialog.askopenfilename(
            title="Select JSON file",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        if filename:
            self.file_path_var.set(filename)
            self.file_path = filename
            self.load_existing_data()
    
    def update_id(self, event=None):
        """Auto-generate ID based on title"""
        title = self.title_var.get().strip()
        if title and not self.id_var.get():
            # Convert title to lowercase, replace spaces with hyphens, remove special chars
            id_suggestion = re.sub(r'[^a-z0-9\s-]', '', title.lower())
            id_suggestion = re.sub(r'\s+', '-', id_suggestion.strip())
            self.id_var.set(id_suggestion)
    
    def update_category(self, event=None):
        """Auto-update category based on type"""
        type_mapping = {
            'experience': 'Work Experience',
            'project': 'Projects',
            'education': 'Education',
            'about': 'About'
        }
        selected_type = self.type_var.get()
        if selected_type in type_mapping:
            self.category_var.set(type_mapping[selected_type])
    
    def add_skill(self):
        """Add skill to the listbox"""
        skill = self.skills_combo.get().strip()
        if skill:
            # Check if skill already exists in listbox
            current_skills = list(self.skills_listbox.get(0, tk.END))
            if skill not in current_skills:
                self.skills_listbox.insert(tk.END, skill)
                # Add to autocomplete list
                self.skills_combo.add_value(skill)
                self.all_skills.add(skill)
            self.skills_combo.set('')
    
    def remove_skill(self):
        """Remove selected skill from listbox"""
        selection = self.skills_listbox.curselection()
        if selection:
            self.skills_listbox.delete(selection[0])
    
    def clear_skills(self):
        """Clear all skills from listbox"""
        self.skills_listbox.delete(0, tk.END)
    
    def validate_date_format(self, date_str: str) -> bool:
        """Validate date format YYYY-MM"""
        if not date_str:
            return True  # Empty is allowed for optional fields
        
        pattern = r'^\d{4}-\d{2}$'
        if not re.match(pattern, date_str):
            return False
        
        try:
            year, month = map(int, date_str.split('-'))
            return 1 <= month <= 12 and 1900 <= year <= 2100
        except ValueError:
            return False
    
    def validate_form(self) -> tuple[bool, str]:
        """Validate form data"""
        # Required fields
        if not self.id_var.get().strip():
            return False, "ID is required"
        if not self.title_var.get().strip():
            return False, "Title is required"
        if not self.company_var.get().strip():
            return False, "Company is required"
        if not self.type_var.get():
            return False, "Type is required"
        if not self.category_var.get().strip():
            return False, "Category is required"
        if not self.start_date_var.get().strip():
            return False, "Start Date is required"
        if not self.detail_text.get(1.0, tk.END).strip():
            return False, "Detail is required"
        if self.skills_listbox.size() == 0:
            return False, "At least one skill is required"
        
        # Date validation
        if not self.validate_date_format(self.start_date_var.get()):
            return False, "Start Date must be in format YYYY-MM"
        
        end_date = self.end_date_var.get().strip()
        if end_date and not self.validate_date_format(end_date):
            return False, "End Date must be in format YYYY-MM"
        
        # Relevance validation
        relevance = self.relevance_var.get().strip()
        if relevance:
            try:
                rel_int = int(relevance)
                if not 1 <= rel_int <= 5:
                    return False, "Relevance must be between 1 and 5"
            except ValueError:
                return False, "Relevance must be a number"
        
        return True, ""
    
    def add_entry(self):
        """Add the entry to JSON data"""
        # Validate form
        is_valid, error_msg = self.validate_form()
        if not is_valid:
            messagebox.showerror("Validation Error", error_msg)
            return
        
        # Build entry data
        entry = {
            "id": self.id_var.get().strip(),
            "title": self.title_var.get().strip(),
            "company": self.company_var.get().strip(),
            "startDate": self.start_date_var.get().strip(),
            "detail": self.detail_text.get(1.0, tk.END).strip().replace('\n', '\\n'),
            "skills": list(self.skills_listbox.get(0, tk.END)),
            "type": self.type_var.get(),
            "category": self.category_var.get().strip()
        }
        
        # Add optional fields
        end_date = self.end_date_var.get().strip()
        if end_date:
            entry["endDate"] = end_date
        
        date_range = self.date_range_var.get().strip()
        if date_range:
            entry["dateRange"] = date_range
        
        relevance = self.relevance_var.get().strip()
        if relevance:
            entry["relevance"] = int(relevance)
        
        # Add link if provided
        link_url = self.link_url_var.get().strip()
        link_label = self.link_label_var.get().strip()
        if link_url and link_label:
            entry["link"] = {
                "url": link_url,
                "label": link_label
            }
        
        # Add to appropriate category
        entry_type = self.type_var.get()
        if entry_type == 'experience':
            self.content_data['experiences'].append(entry)
        elif entry_type == 'project':
            self.content_data['projects'].append(entry)
        elif entry_type == 'education':
            self.content_data['education'].append(entry)
        elif entry_type == 'about':
            self.content_data['about'].append(entry)
        
        # Save to file
        try:
            with open(self.file_path_var.get(), 'w', encoding='utf-8') as f:
                json.dump(self.content_data, f, indent=2, ensure_ascii=False)
            
            messagebox.showinfo("Success", f"Entry added successfully to {self.file_path_var.get()}")
            self.clear_form()
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save file: {str(e)}")
    
    def clear_form(self):
        """Clear all form fields"""
        self.id_var.set('')
        self.title_var.set('')
        self.company_var.set('')
        self.type_var.set('')
        self.category_var.set('')
        self.start_date_var.set('')
        self.end_date_var.set('')
        self.date_range_var.set('')
        self.relevance_var.set('')
        self.detail_text.delete(1.0, tk.END)
        self.skills_listbox.delete(0, tk.END)
        self.skills_combo.set('')
        self.link_url_var.set('')
        self.link_label_var.set('')
    
    def view_json(self):
        """View current JSON data in a new window"""
        json_window = tk.Toplevel(self.root)
        json_window.title("Current JSON Data")
        json_window.geometry("800x600")
        
        # Create text widget with scrollbars
        frame = ttk.Frame(json_window, padding="10")
        frame.pack(fill=tk.BOTH, expand=True)
        
        text_widget = tk.Text(frame, wrap=tk.NONE)
        v_scrollbar = ttk.Scrollbar(frame, orient=tk.VERTICAL, command=text_widget.yview)
        h_scrollbar = ttk.Scrollbar(frame, orient=tk.HORIZONTAL, command=text_widget.xview)
        
        text_widget.configure(yscrollcommand=v_scrollbar.set, xscrollcommand=h_scrollbar.set)
        
        text_widget.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        v_scrollbar.grid(row=0, column=1, sticky=(tk.N, tk.S))
        h_scrollbar.grid(row=1, column=0, sticky=(tk.W, tk.E))
        
        frame.columnconfigure(0, weight=1)
        frame.rowconfigure(0, weight=1)
        
        # Insert JSON data
        json_str = json.dumps(self.content_data, indent=2, ensure_ascii=False)
        text_widget.insert(1.0, json_str)
        text_widget.configure(state='disabled')

def main():
    """Main function to run the application"""
    root = tk.Tk()
    app = ContentJSONManager(root)
    root.mainloop()

if __name__ == "__main__":
    main()