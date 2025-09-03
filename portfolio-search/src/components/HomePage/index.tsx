"use client";

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Code, Briefcase, GraduationCap, User, Linkedin, Github } from 'lucide-react';
import { searchContent, getAllContent, getContentBySkill } from '../../utils/contentUtils';
import { GlobalStyle } from './GlobalStyles';
import AnimatedLogo from './AnimatedLogo';
import SearchBar from './SearchBar';
import Shortcuts from './Shortcuts';
import ContentPage from '../ContentPage';
import SearchResults from '../SearchResults';
import SkillsResults from '../SkillsResults';
import TabManager from '../TabManager';
import ExperiencePage from '../ExperiencePage';
import EducationPage from '../EducationPage';

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
  const [currentView, setCurrentView] = useState<'home' | 'content' | 'search' | 'skills' | 'experience' | 'education'>('home');
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [skillsResults, setSkillsResults] = useState<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>('');

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
    setSearchResults([]);
    setSkillsResults([]);
    setSelectedSkill('');
  };

  // Skills navigation function
  const navigateToSkills = (skill: string) => {
    const results = getContentBySkill(skill);
    setSkillsResults(results);
    setSelectedSkill(skill);
    setCurrentView('skills');
  };

  // Navigation to section pages
  const navigateToExperience = () => {
    setCurrentView('experience');
  };

  const navigateToEducation = () => {
    setCurrentView('education');
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
      action: navigateToExperience
    },
    { 
      name: 'Education', 
      icon: <GraduationCap size={20} />,
      action: navigateToEducation  // You'll need to create this function
    },
    { 
      name: 'About Me', 
      icon: <User size={20} />,
      action: () => console.log('Navigate to About Me') 
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
    if (searchQuery.trim()) {
      const results = searchContent(searchQuery);
      setSearchResults(results);
      setCurrentView('search');
      setShowAutocomplete(false);
    }
  };

  const handleFocus = () => {
    setShowAutocomplete(true);
  };

  const handleBlur = () => {
    // Delay hiding autocomplete to allow for clicks
    setTimeout(() => setShowAutocomplete(false), 200);
  };

  // Render experience page
  if (currentView === 'experience') {
    return (
      <>
        <GlobalStyle />
        <TabManager
          currentView={currentView}
          selectedContentId={selectedContentId}
          searchQuery={searchQuery}
          selectedSkill={selectedSkill}
          onTabChange={handleTabChange}
          onNewSearch={handleNewSearch}
        >
          <ExperiencePage 
            onItemClick={navigateToContent} 
            onSkillClick={navigateToSkills}
          />
        </TabManager>
      </>
    );
  }

  if (currentView === 'education') {
  return (
    <>
      <GlobalStyle />
      <TabManager
        currentView={currentView}
        selectedContentId={selectedContentId}
        searchQuery={searchQuery}
        selectedSkill={selectedSkill}
        onTabChange={handleTabChange}
        onNewSearch={handleNewSearch}
      >
        <EducationPage 
          onItemClick={navigateToContent} 
          onSkillClick={navigateToSkills}
        />
      </TabManager>
    </>
  );
}

  // Render skills results page
  if (currentView === 'skills') {
    return (
      <>
        <GlobalStyle />
        <TabManager
          currentView={currentView}
          selectedContentId={selectedContentId}
          onTabChange={handleTabChange}
          onNewSearch={handleNewSearch}
        >
          <SkillsResults
            skill={selectedSkill}
            results={skillsResults}
            onResultClick={navigateToContent}
            onBack={navigateToHome}
          />
        </TabManager>
      </>
    );
  }

  // Render search results page
  if (currentView === 'search') {
    return (
      <>
        <GlobalStyle />
        <TabManager
          currentView={currentView}
          selectedContentId={selectedContentId}
          onTabChange={handleTabChange}
          onNewSearch={handleNewSearch}
        >
          <SearchResults
            query={searchQuery}
            results={searchResults}
            onResultClick={navigateToContent}
            onBack={navigateToHome}
          />
        </TabManager>
      </>
    );
  }

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
            onSkillClick={navigateToSkills}
            showBackButton={false}
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
        searchQuery={searchQuery}
        selectedSkill={selectedSkill}
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