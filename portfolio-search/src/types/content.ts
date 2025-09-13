export interface ContentItem {
  id: string;
  title: string;
  company: string;
  startDate: string | null;  // Allow null
  endDate?: string | null;    // Allow null
  dateRange?: string;        // Keep optional
  detail: string;
  skills: string[];
  link?: {
    url: string;
    label: string;
  };
  relevance?: number;
  type: string;
  category: string;
  photos?: PhotoGalleryItem[];
}

export interface ContentData {
  experiences: ContentItem[];
  projects: ContentItem[];
  education: ContentItem[];
  about: ContentItem[];
}

export type ContentType = 'experiences' | 'projects' | 'education' | 'about';

interface PhotoGalleryItem {
  caption: string;
  filename: string; // just the filename, directory will be inferred
}