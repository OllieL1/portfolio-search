"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Search, Briefcase, GraduationCap, Code, User, Hash, ChevronRight, Home, Pin, PinOff } from 'lucide-react';
import { getContentById } from '../../utils/contentUtils';
import { useIsClient } from '../../hooks/useWindow';
import { Tab } from './types';
import {
  SidebarContainer,
  SidebarTrigger,
  SidebarHoverArea,
  SidebarHeader,
  NewSearchContainer,
  SearchInput,
  HomeButton,
  PinButton,
  SectionContainer,
  SectionHeader,
  TabsList,
  TabItem,
  DesktopContent,
  MobileTabsContainer,
  MobileTabsList,
  MobileNewSearchButton,
  MobileTabItem,
  MobileContent
} from './styles';

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

const saveSidebarState = (pinned: boolean) => {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('sidebar-pinned', JSON.stringify(pinned));
    } catch (error) {
      console.warn('Failed to save sidebar state:', error);
    }
  }
};

const loadSidebarState = (): boolean => {
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem('sidebar-pinned');
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.warn('Failed to load sidebar state:', error);
    }
  }
  return false;
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
      return null;
    default:
      return null;
  }
};

// Helper function to get section icon
const getSectionIcon = (section: string) => {
  switch (section) {
    case 'Experience':
      return <Briefcase size={16} />;
    case 'Education':
      return <GraduationCap size={16} />;
    case 'Projects':
      return <Code size={16} />;
    case 'About Me':
      return <User size={16} />;
    default:
      return null;
  }
};

// Helper function to create tab from current route - includes main section pages on mobile
const createTabFromRoute = (pathname: string, searchParams?: URLSearchParams, isMobile: boolean = false): Tab | null => {
  const timestamp = Date.now();
  
  // On desktop, don't create tabs for main section pages
  // On mobile, do create tabs for main section pages
  if (!isMobile && (pathname === '/' || pathname === '/experience' || pathname === '/projects' || 
      pathname === '/education' || pathname === '/about')) {
    return null;
  }
  
  if (pathname === '/') {
    return null; // Never create tab for home page
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
    let query = '';
    
    if (searchParams) {
      query = searchParams.get('q') || '';
    } else {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isClient = useIsClient();

  // Load tabs and sidebar state from session storage on mount
  useEffect(() => {
    if (!isClient) return;
    
    const storedTabs = loadTabsFromStorage();
    if (storedTabs.length > 0) {
      setTabs(storedTabs);
      // Auto-pin sidebar if tabs exist
      setSidebarPinned(true);
      setSidebarOpen(true);
    } else {
      const pinnedState = loadSidebarState();
      setSidebarPinned(pinnedState);
      setSidebarOpen(pinnedState);
    }
  }, [isClient]);

  // Update tabs when route changes
  useEffect(() => {
    if (!isClient) return;
    
    const searchParams = getSearchParams();
    const isMobile = window.innerWidth <= 768;
    const currentTab = createTabFromRoute(pathname, searchParams, isMobile);
    
    if (currentTab) {
      setTabs(prevTabs => {
        const existingTabIndex = prevTabs.findIndex(tab => tab.id === currentTab.id);
        let newTabs;
        
        if (existingTabIndex >= 0) {
          newTabs = [...prevTabs];
          newTabs[existingTabIndex] = { ...newTabs[existingTabIndex], timestamp: Date.now() };
        } else {
          newTabs = [...prevTabs, currentTab];
          if (newTabs.length > 10) {
            newTabs.sort((a, b) => a.timestamp - b.timestamp);
            newTabs = newTabs.slice(1);
          }
          
          // Auto-pin sidebar on first tab creation
          if (prevTabs.length === 0) {
            setSidebarPinned(true);
            setSidebarOpen(true);
            saveSidebarState(true);
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

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSectionClick = (section: string) => {
    // Don't allow clicking on "Other" section
    if (section === 'Other') return;
    
    const routes: Record<string, string> = {
      'Experience': '/experience',
      'Education': '/education', 
      'Projects': '/projects',
      'About Me': '/about'
    };
    
    const route = routes[section];
    if (route) {
      router.push(route);
    }
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      saveTabsToStorage(newTabs);
      return newTabs;
    });
    
    const activeTabId = getActiveTabId();
    if (activeTabId === tabId) {
      router.push('/');
    }
  };

  const handlePinToggle = () => {
    const newPinnedState = !sidebarPinned;
    setSidebarPinned(newPinnedState);
    setSidebarOpen(newPinnedState);
    saveSidebarState(newPinnedState);
  };

  const handleSidebarMouseEnter = () => {
    if (!sidebarPinned) {
      setSidebarOpen(true);
    }
  };

  const handleSidebarMouseLeave = () => {
    if (!sidebarPinned) {
      setSidebarOpen(false);
    }
  };

  const getActiveTabId = (): string => {
    const searchParams = getSearchParams();
    const isMobile = window.innerWidth <= 768;
    const currentTab = createTabFromRoute(pathname, searchParams, isMobile);
    return currentTab ? currentTab.id : '';
  };

  // Check if current page is a main section page
  const getActiveSectionId = (): string => {
    if (pathname === '/experience') return 'Experience';
    if (pathname === '/education') return 'Education';
    if (pathname === '/projects') return 'Projects';
    if (pathname === '/about') return 'About Me';
    return '';
  };

  const activeTabId = isClient ? getActiveTabId() : '';
  const activeSectionId = isClient ? getActiveSectionId() : '';
  const shouldShowTabs = tabs.length > 0 || pathname !== '/';

  // Group tabs by section (no sorting - maintain original order)
  const groupedTabs = {
    'Experience': tabs.filter(tab => tab.type === 'experience' || 
      (tab.type === 'content' && getContentById(tab.contentId!)?.category === 'Work Experience')),
    'Education': tabs.filter(tab => tab.type === 'education' || 
      (tab.type === 'content' && getContentById(tab.contentId!)?.category === 'Education')),
    'Projects': tabs.filter(tab => tab.type === 'projects' || 
      (tab.type === 'content' && getContentById(tab.contentId!)?.category === 'Projects')),
    'About Me': tabs.filter(tab => tab.type === 'about' || 
      (tab.type === 'content' && getContentById(tab.contentId!)?.category === 'About')),
    'Other': tabs.filter(tab => 
      !['experience', 'education', 'projects', 'about', 'content'].includes(tab.type) ||
      (tab.type === 'content' && !['Work Experience', 'Education', 'Projects', 'About'].includes(getContentById(tab.contentId!)?.category || ''))
    )
  };

  if (!shouldShowTabs) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Desktop Sidebar Hover Area - expanded hover zone */}
      {!sidebarOpen && (
        <SidebarHoverArea onMouseEnter={handleSidebarMouseEnter}>
          <SidebarTrigger>
            <Search size={16} />
          </SidebarTrigger>
        </SidebarHoverArea>
      )}

      {/* Desktop Sidebar */}
      <SidebarContainer 
        $open={sidebarOpen}
        $pinned={sidebarPinned}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        {/* Sidebar Header */}
        <SidebarHeader>
          <NewSearchContainer>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', flex: 1 }}>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                $open={sidebarOpen}
              />
              {sidebarOpen && (
                <HomeButton onClick={handleHomeClick} type="button">
                  <Home size={16} />
                </HomeButton>
              )}
            </form>
          </NewSearchContainer>
          
          {sidebarOpen && (
            <PinButton onClick={handlePinToggle} $pinned={sidebarPinned}>
              {sidebarPinned ? <PinOff size={16} /> : <Pin size={16} />}
            </PinButton>
          )}
        </SidebarHeader>

        {/* Sections */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          {Object.entries(groupedTabs).map(([section, sectionTabs]) => {
            if (sectionTabs.length === 0 && section === 'Other') return null;
            
            return (
              <SectionContainer key={section}>
                {/* Section Header */}
                <SectionHeader 
                  $open={sidebarOpen}
                  $active={activeSectionId === section}
                  $clickable={section !== 'Other'}
                  onClick={() => handleSectionClick(section)}
                >
                  {getSectionIcon(section)}
                  <span className="section-title">{section}</span>
                  {section !== 'Other' && <ChevronRight size={14} className="chevron" />}
                </SectionHeader>

                {/* Section Tabs */}
                <TabsList $open={sidebarOpen}>
                  {sectionTabs.map(tab => (
                    <TabItem
                      key={tab.id}
                      $active={activeTabId === tab.id}
                      onClick={() => handleTabClick(tab)}
                    >
                      {getTabIcon(tab.type)}
                      <span className="tab-title" title={tab.title}>
                        {tab.title}
                      </span>
                      <button
                        className="close-button"
                        onClick={(e) => handleCloseTab(e, tab.id)}
                      >
                        <X size={12} />
                      </button>
                    </TabItem>
                  ))}
                </TabsList>
              </SectionContainer>
            );
          })}
        </div>
      </SidebarContainer>

      {/* Desktop Content with sidebar spacing */}
      <DesktopContent $sidebarOpen={sidebarOpen}>
        {children}
      </DesktopContent>

      {/* Mobile Bottom Tabs */}
      <MobileTabsContainer>
        <MobileTabsList>
          {/* New Search Button - pinned to left */}
          <MobileNewSearchButton
            $active={pathname === '/'}
            onClick={handleHomeClick}
          >
            <Search size={18} />
          </MobileNewSearchButton>

          {/* Scrollable Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none', flex: 1 }}>
            {tabs.slice().reverse().map(tab => (
              <MobileTabItem
                key={tab.id}
                $active={activeTabId === tab.id}
                onClick={() => handleTabClick(tab)}
              >
                {getTabIcon(tab.type)}
                <span className="tab-title">
                  {tab.title}
                </span>
                <button
                  className="close-button"
                  onClick={(e) => handleCloseTab(e, tab.id)}
                >
                  <X size={12} />
                </button>
              </MobileTabItem>
            ))}
          </div>
        </MobileTabsList>
      </MobileTabsContainer>

      {/* Mobile Content with bottom spacing */}
      <MobileContent>
        {children}
      </MobileContent>
    </>
  );
};

export default TabManager;