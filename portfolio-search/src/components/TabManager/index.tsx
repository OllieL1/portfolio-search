import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { getContentById } from '../../utils/contentUtils';
import { Tab, TabManagerProps } from './types';
import { TabsContainer, Tab as TabElement, TabTitle, CloseButton, ContentWrapper } from './styles';

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
        // Validate tabs structure
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

const TabManager: React.FC<TabManagerProps> = ({
  children,
  currentView,
  selectedContentId,
  onTabChange,
  onNewSearch
}) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('new-search');

  // Load tabs from session storage on mount
  useEffect(() => {
    const storedTabs = loadTabsFromStorage();
    if (storedTabs.length > 0) {
      setTabs(storedTabs);
    }
  }, []);

  // Update tabs when view changes
  useEffect(() => {
    if (currentView === 'content' && selectedContentId) {
      const content = getContentById(selectedContentId);
      if (content) {
        const newTab: Tab = {
          id: selectedContentId,
          title: content.title,
          type: 'content',
          contentId: selectedContentId,
          timestamp: Date.now()
        };

        setTabs(prevTabs => {
          // Check if tab already exists
          const existingTabIndex = prevTabs.findIndex(tab => tab.id === selectedContentId);
          let newTabs;
          
          if (existingTabIndex >= 0) {
            // Update existing tab timestamp
            newTabs = [...prevTabs];
            newTabs[existingTabIndex] = { ...newTabs[existingTabIndex], timestamp: Date.now() };
          } else {
            // Add new tab, limit to 10 tabs
            newTabs = [...prevTabs, newTab];
            if (newTabs.length > 10) {
              // Remove oldest tab
              newTabs.sort((a, b) => a.timestamp - b.timestamp);
              newTabs = newTabs.slice(1);
            }
          }
          
          saveTabsToStorage(newTabs);
          return newTabs;
        });

        setActiveTabId(selectedContentId);
      }
    } else if (currentView === 'home') {
      setActiveTabId('new-search');
    }
  }, [currentView, selectedContentId]);

  const handleTabClick = (tab: Tab) => {
    if (tab.type === 'content' && tab.contentId) {
      setActiveTabId(tab.id);
      onTabChange(tab.contentId);
    }
  };

  const handleNewSearchClick = () => {
    setActiveTabId('new-search');
    onNewSearch();
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      saveTabsToStorage(newTabs);
      
      // If we're closing the active tab, switch to new search
      if (activeTabId === tabId) {
        setActiveTabId('new-search');
        onNewSearch();
      }
      
      return newTabs;
    });
  };

  const shouldShowTabs = tabs.length > 0 || currentView === 'content';

  if (!shouldShowTabs) {
    return <>{children}</>;
  }

  return (
    <>
      <TabsContainer>
        {/* New Search Tab */}
        <TabElement
          active={activeTabId === 'new-search'}
          isNewSearch={true}
          onClick={handleNewSearchClick}
        >
          <Search size={14} />
          <TabTitle>New Search</TabTitle>
        </TabElement>

        {/* Content Tabs */}
        {tabs.map(tab => (
          <TabElement
            key={tab.id}
            active={activeTabId === tab.id}
            onClick={() => handleTabClick(tab)}
          >
            <TabTitle title={tab.title}>{tab.title}</TabTitle>
            <CloseButton onClick={(e) => handleCloseTab(e, tab.id)}>
              <X size={12} />
            </CloseButton>
          </TabElement>
        ))}
      </TabsContainer>

      <ContentWrapper>
        {children}
      </ContentWrapper>
    </>
  );
};

export default TabManager;