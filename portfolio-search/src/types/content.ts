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
  screenshots?: PhotoGalleryItem[]; // files in public/content/<id>/, shown inline as a showcase
  video?: string; // filename in public/content/videos/
}

export interface ProfileLink {
  label: string;
  url: string;
}

// The main About Me card (and the contact links on the home page)
export interface Profile {
  name: string;
  subtitle: string;
  intro: string;      // blank line = new paragraph
  image?: string;     // file in public/
  location?: string;
  email?: string;
  status?: string;    // e.g. "Interested in 2027 Graduate Roles"
  links: ProfileLink[];
}

export interface ContentData {
  experiences: ContentItem[];
  projects: ContentItem[];
  education: ContentItem[];
  about: ContentItem[];
  profile: Profile;
}

export type ContentType = 'experiences' | 'projects' | 'education' | 'about';

export interface PhotoGalleryItem {
  caption: string;
  filename: string; // just the filename, directory will be inferred
}