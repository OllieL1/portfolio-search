'use client';

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Code, Briefcase, GraduationCap, User, Linkedin, Github } from 'lucide-react';
import { GlobalStyle } from './GlobalStyles';
import AnimatedLogo from './AnimatedLogo';
import SearchBar from './SearchBar';
import Shortcuts from './Shortcuts';

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
      name: 'About Ollie', 
      icon: <User size={20} />,
      action: () => console.log('Navigate to About Ollie') 
    }
  ];

  // Autocomplete suggestions
  const autocompleteItems: AutocompleteItem[] = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const items: AutocompleteItem[] = [];

    // Add page matches
    const pageMatches = ['Projects', 'Experience', 'Education', 'About Ollie'];
    pageMatches.forEach(page => {
      if (page.toLowerCase().includes(searchQuery.toLowerCase())) {
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
          window.open('https://www.linkedin.com/in/ollie-wl', '_blank');
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
          window.open('https://github.com/OllieL1', '_blank');
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

  return (
    <>
      <GlobalStyle />
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
    </>
  );
};

export default HomePage;