"use client";

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Code, Briefcase, GraduationCap, User, Linkedin, Github } from 'lucide-react';
import { searchContent, getAllContent } from '../../utils/contentUtils';
import { GlobalStyle } from './GlobalStyles';
import AnimatedLogo from './AnimatedLogo';
import SearchBar from './SearchBar';
import Shortcuts from './Shortcuts';
import ContentPage from '../ContentPage';
import TabManager from '../TabManager';

// Types
interface AutocompleteItem {
  text: string;
  type: 'page' | 'external';
  icon?: React.ReactNode;
  subtitle?: string;
  action: () => void;
}

interface ShortcutItem {
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

// Layout styled components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SearchSection = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

// Main component
const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'content'>('home');
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

  // Navigation functions
  const navigateToContent = (contentId: string) => {
    setSelectedContentId(contentId);
    setCurrentView('content');
    setShowAutocomplete(false);
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedContentId(null);
    setSearchQuery('');
  };

  // Tab management functions
  const handleTabChange = (contentId: string) => {
    navigateToContent(contentId);
  };

  const handleNewSearch = () => {
    navigateToHome();
  };

  // Sample shortcuts - these will eventually navigate to different pages
  const shortcuts: ShortcutItem[] = [
    { 
      name: 'Projects', 
      icon: <Code size={20} />,
      action: () => console.log('Navigate to Projects') 
    },
    { 
      name: 'Experience', 
      icon: <Briefcase size={20} />,
      action: () => console.log('Navigate to Experience') 
    },
    { 
      name: 'Education', 
      icon: <GraduationCap size={20} />,
      action: () => console.log('Navigate to Education') 
    },
    { 
      name: 'About Me', 
      icon: <User size={20} />,
      action: () => console.log('Navigate to About Ollie') 
    }
  ];

  // Autocomplete suggestions
  const autocompleteItems: AutocompleteItem[] = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const items: AutocompleteItem[] = [];

    // Add content matches from JSON data
    const contentMatches = searchContent(searchQuery);
    contentMatches.slice(0, 3).forEach(content => {
      items.push({
        text: content.title,
        type: 'page',
        action: () => {
          navigateToContent(content.id);
        }
      });
    });

    // Add static page matches
    const staticPages = ['Projects', 'Experience', 'Education', 'About Me'];
    staticPages.forEach(page => {
      if (page.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !items.some(item => item.text === page)) {
        items.push({
          text: page,
          type: 'page',
          action: () => {
            console.log(`Navigate to ${page}`);
            setShowAutocomplete(false);
          }
        });
      }
    });

    // Add external links with partial matching
    const query = searchQuery.toLowerCase();
    
    // LinkedIn - matches "link", "linkedin", "in", etc.
    if ('linkedin'.includes(query) && query.length >= 2) {
      items.push({
        text: 'LinkedIn',
        type: 'external',
        icon: <Linkedin size={16} />,
        subtitle: 'Open in LinkedIn',
        action: () => {
          window.open('https://linkedin.com', '_blank');
          setShowAutocomplete(false);
        }
      });
    }

    // GitHub - matches "git", "github", "hub", etc.
    if ('github'.includes(query) && query.length >= 2) {
      items.push({
        text: 'GitHub',
        type: 'external',
        icon: <Github size={16} />,
        subtitle: 'Open in GitHub',
        action: () => {
          window.open('https://github.com', '_blank');
          setShowAutocomplete(false);
        }
      });
    }

    return items.slice(0, 5);
  }, [searchQuery]);

  const handleSearch = () => {
    console.log('Performing search for:', searchQuery);
    setShowAutocomplete(false);
    // TODO: Navigate to search results page
  };

  const handleFocus = () => {
    setShowAutocomplete(true);
  };

  const handleBlur = () => {
    // Delay hiding autocomplete to allow for clicks
    setTimeout(() => setShowAutocomplete(false), 200);
  };

  // Render content page if selected
  if (currentView === 'content' && selectedContentId) {
    return (
      <>
        <GlobalStyle />
        <TabManager
          currentView={currentView}
          selectedContentId={selectedContentId}
          onTabChange={handleTabChange}
          onNewSearch={handleNewSearch}
        >
          <ContentPage
            contentId={selectedContentId}
            onBack={navigateToHome}
            onSkillClick={(skill) => console.log(`Search for skill: ${skill}`)}
          />
        </TabManager>
      </>
    );
  }

  // Render home page
  return (
    <>
      <GlobalStyle />
      <TabManager
        currentView={currentView}
        selectedContentId={selectedContentId}
        onTabChange={handleTabChange}
        onNewSearch={handleNewSearch}
      >
        <Container>
          <SearchSection>
            <AnimatedLogo />
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearch={handleSearch}
              autocompleteItems={autocompleteItems}
              showAutocomplete={showAutocomplete}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Shortcuts shortcuts={shortcuts} />
          </SearchSection>
        </Container>
      </TabManager>
    </>
  );
};

export default HomePage;