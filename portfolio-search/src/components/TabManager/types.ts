export interface Tab {
  id: string;
  title: string;
  type: 'home' | 'content';
  contentId?: string;
  timestamp: number;
}

export interface TabManagerProps {
  children: React.ReactNode;
  currentView: 'home' | 'content';
  selectedContentId?: string | null;
  onTabChange: (tabId: string) => void;
  onNewSearch: () => void;
}