import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Search, Briefcase, GraduationCap, Code, User, Hash } from 'lucide-react';
import { getContentById } from '../../utils/contentUtils';
import { useIsClient } from '../../hooks/useWindow'; // Import the custom hook
import { Tab } from './types';
import { TabsContainer, Tab as TabElement, TabTitle, CloseButton, ContentWrapper, NewSearchButton, ScrollableTabs } from './styles';

interface TabManagerProps {
  children: React.ReactNode;
}

// Session storage helpers (safe for SSR)
const saveTabsToStorage = (tabs: Tab[]) => {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('portfolio-tabs', JSON.stringify(tabs));
    } catch (error) {
      console.warn('Failed to save tabs to session storage:', error);
    }
  }
};

const loadTabsFromStorage = (): Tab[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem('portfolio-tabs');
      if (stored) {
        const tabs = JSON.parse(stored);
        if (Array.isArray(tabs) && tabs.every(tab => tab.id && tab.title && tab.type)) {
          return tabs;
        }
      }
    } catch (error) {
      console.warn('Failed to load tabs from session storage:', error);
    }
  }
  return [];
};

// Helper function to get search params safely
const getSearchParams = (): URLSearchParams => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

// Helper function to get icon for tab type
const getTabIcon = (type: Tab['type']) => {
  switch (type) {
    case 'search':
      return <Hash size={14} />;
    case 'experience':
      return <Briefcase size={14} />;
    case 'education':
      return <GraduationCap size={14} />;
    case 'projects':
      return <Code size={14} />;
    case 'about':
      return <User size={14} />;
    case 'skills':
      return <Hash size={14} />;
    case 'content':
      return null; // No icon for content tabs
    default:
      return null;
  }
};

// Helper function to create tab from current route
const createTabFromRoute = (pathname: string, searchParams?: URLSearchParams): Tab | null => {
  const timestamp = Date.now();
  
  if (pathname === '/') {
    return null; // Home doesn't create a tab
  }
  
  if (pathname === '/experience') {
    return {
      id: 'experience',
      title: 'Experience',
      type: 'experience',
      url: pathname,
      timestamp
    };
  }
  
  if (pathname === '/projects') {
    return {
      id: 'projects',
      title: 'Projects',
      type: 'projects',
      url: pathname,
      timestamp
    };
  }
  
  if (pathname === '/education') {
    return {
      id: 'education',
      title: 'Education',
      type: 'education',
      url: pathname,
      timestamp
    };
  }
  
  if (pathname === '/about') {
    return {
      id: 'about',
      title: 'About Me',
      type: 'about',
      url: pathname,
      timestamp
    };
  }
  
  if (pathname === '/search') {
    // Handle search tabs more robustly
    let query = '';
    
    if (searchParams) {
      query = searchParams.get('q') || '';
    } else {
      // Fallback to safe search params getter
      const urlParams = getSearchParams();
      query = urlParams.get('q') || '';
    }
    
    if (query) {
      return {
        id: `search-${query}`,
        title: `Search: ${query}`,
        type: 'search',
        url: `${pathname}?q=${encodeURIComponent(query)}`,
        searchQuery: query,
        timestamp
      };
    }
    
    // If no query, don't create a tab (this prevents the flicker)
    return null;
  }
  
  if (pathname.startsWith('/skills/')) {
    const skill = pathname.split('/skills/')[1];
    if (skill) {
      const decodedSkill = decodeURIComponent(skill);
      return {
        id: `skills-${decodedSkill}`,
        title: `Skill: ${decodedSkill}`,
        type: 'skills',
        url: pathname,
        skillName: decodedSkill,
        timestamp
      };
    }
  }
  
  if (pathname.startsWith('/content/')) {
    const contentId = pathname.split('/content/')[1];
    if (contentId) {
      const content = getContentById(contentId);
      if (content) {
        return {
          id: contentId,
          title: content.title,
          type: 'content',
          url: pathname,
          contentId: contentId,
          timestamp
        };
      }
    }
  }
  
  return null;
};

const TabManager: React.FC<TabManagerProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [tabs, setTabs] = useState<Tab[]>([]);
  
  // Use custom hook for client-side detection
  const isClient = useIsClient();

  // Load tabs from session storage on mount
  useEffect(() => {
    if (!isClient) return;
    
    const storedTabs = loadTabsFromStorage();
    if (storedTabs.length > 0) {
      setTabs(storedTabs);
    }
  }, [isClient]);

  // Update tabs when route changes
  useEffect(() => {
    if (!isClient) return;
    
    const searchParams = getSearchParams();
    const currentTab = createTabFromRoute(pathname, searchParams);
    
    if (currentTab) {
      setTabs(prevTabs => {
        // Check if tab already exists
        const existingTabIndex = prevTabs.findIndex(tab => tab.id === currentTab.id);
        let newTabs;
        
        if (existingTabIndex >= 0) {
          // Update existing tab timestamp
          newTabs = [...prevTabs];
          newTabs[existingTabIndex] = { ...newTabs[existingTabIndex], timestamp: Date.now() };
        } else {
          // Add new tab, limit to 10 tabs
          newTabs = [...prevTabs, currentTab];
          if (newTabs.length > 10) {
            // Remove oldest tab
            newTabs.sort((a, b) => a.timestamp - b.timestamp);
            newTabs = newTabs.slice(1);
          }
        }
        
        saveTabsToStorage(newTabs);
        return newTabs;
      });
    }
  }, [pathname, isClient]);

  const handleTabClick = (tab: Tab) => {
    router.push(tab.url);
  };

  const handleNewSearchClick = () => {
    router.push('/');
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      saveTabsToStorage(newTabs);
      return newTabs;
    });
    
    // If we're closing the currently active tab, navigate to home
    const activeTabId = getActiveTabId();
    if (activeTabId === tabId) {
      router.push('/');
    }
  };

  // Find the currently active tab based on pathname
  const getActiveTabId = (): string => {
    // New Search is ONLY active on home page
    if (pathname === '/') {
      return 'new-search';
    }
    
    // For all other pages, find the matching tab
    const searchParams = getSearchParams();
    const currentTab = createTabFromRoute(pathname, searchParams);
    
    // If we can't find a matching tab, don't highlight anything (not even New Search)
    return currentTab ? currentTab.id : '';
  };

  // Only calculate active tab on client side
  const activeTabId = isClient ? getActiveTabId() : '';
  const shouldShowTabs = tabs.length > 0 || pathname !== '/';

  if (!shouldShowTabs) {
    return <>{children}</>;
  }

  return (
    <>
      <TabsContainer>
        {/* New Search Button - pinned on mobile */}
        <NewSearchButton
          $active={activeTabId === 'new-search'}
          onClick={handleNewSearchClick}
        >
          <Search size={14} />
          <TabTitle className="desktop-only">New Search</TabTitle>
        </NewSearchButton>

        {/* Scrollable tabs container */}
        <ScrollableTabs>
          {tabs.map(tab => (
            <TabElement
              key={tab.id}
              $active={activeTabId === tab.id}
              onClick={() => handleTabClick(tab)}
            >
              {getTabIcon(tab.type)}
              <TabTitle title={tab.title}>{tab.title}</TabTitle>
              <CloseButton onClick={(e) => handleCloseTab(e, tab.id)}>
                <X size={12} />
              </CloseButton>
            </TabElement>
          ))}
        </ScrollableTabs>
      </TabsContainer>

      <ContentWrapper>
        {children}
      </ContentWrapper>
    </>
  );
};

export default TabManager;