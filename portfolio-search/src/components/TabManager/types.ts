export interface Tab {
  id: string;
  title: string;
  type: 'content' | 'search' | 'skills' | 'experience' | 'education' | 'projects' | 'about';
  url: string;
  contentId?: string;
  searchQuery?: string;
  skillName?: string;
  timestamp: number;
}