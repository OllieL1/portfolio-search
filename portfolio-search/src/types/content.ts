export interface ContentItem {
  id: string;
  title: string;
  company: string;
  dateRange: string;
  detail: string;
  skills: string[];
  type: 'experience' | 'project' | 'education' | 'about';
  category: string;
  link?: {
    url: string;
    label: string;
  };
}

export interface ContentData {
  experiences: ContentItem[];
  projects: ContentItem[];
  education: ContentItem[];
  about: ContentItem[];
}

export type ContentType = 'experiences' | 'projects' | 'education' | 'about';