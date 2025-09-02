export interface Tab {
  id: string;
  title: string;
  type: 'home' | 'content' | 'search' | 'skills';
  contentId?: string;
  searchQuery?: string;
  skillName?: string;
  timestamp: number;
}

export interface TabManagerProps {
  children: React.ReactNode;
  currentView: 'home' | 'content' | 'search' | 'skills';
  selectedContentId?: string | null;
  searchQuery?: string;
  selectedSkill?: string;
  onTabChange: (tabId: string) => void;
  onNewSearch: () => void;
}