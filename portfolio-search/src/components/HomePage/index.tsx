"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Code, Briefcase, GraduationCap, User, Linkedin, Github } from 'lucide-react';
import { searchContent } from '../../utils/contentUtils';
import { GlobalStyle } from './GlobalStyles';
import AnimatedLogo from './AnimatedLogo';
import SearchBar from './SearchBar';
import Shortcuts from './Shortcuts';
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);

  // Environment variables for secret page
  const secretTrigger = process.env.NEXT_PUBLIC_SECRET_TRIGGER;

  // Navigation functions using Next.js router
  const navigateToContent = (contentId: string) => {
    router.push(`/content/${contentId}`);
    setShowAutocomplete(false);
  };

  const navigateToSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowAutocomplete(false);
  };

  const navigateToExperience = () => {
    router.push('/experience');
  };

  const navigateToEducation = () => {
    router.push('/education');
  };

  const navigateToProjects = () => {
    router.push('/projects');
  };

  const navigateToAbout = () => {
    router.push('/about');
  };

  const navigateToSecret = () => {
    router.push('/secret');
    setShowAutocomplete(false);
  };

  // Shortcuts that navigate to different routes
  const shortcuts: ShortcutItem[] = [
    { 
      name: 'Projects', 
      icon: <Code size={20} />,
      action: navigateToProjects
    },
    { 
      name: 'Experience', 
      icon: <Briefcase size={20} />,
      action: navigateToExperience
    },
    { 
      name: 'Education', 
      icon: <GraduationCap size={20} />,
      action: navigateToEducation
    },
    { 
      name: 'About Me', 
      icon: <User size={20} />,
      action: navigateToAbout
    }
  ];

  // Autocomplete suggestions
  const autocompleteItems: AutocompleteItem[] = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const items: AutocompleteItem[] = [];

    // Check for secret page trigger (exact match, case insensitive)
    if (secretTrigger && searchQuery.toLowerCase() === secretTrigger.toLowerCase()) {
      items.push({
        text: 'Special Access',
        type: 'page',
        subtitle: 'Restricted content',
        action: navigateToSecret
      });
    }

    // Only add other suggestions if it's not the secret trigger
    if (searchQuery.toLowerCase() !== secretTrigger?.toLowerCase()) {
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
      const staticPages = [
        { name: 'Projects', action: navigateToProjects },
        { name: 'Experience', action: navigateToExperience },
        { name: 'Education', action: navigateToEducation },
        { name: 'About Me', action: navigateToAbout }
      ];
      
      staticPages.forEach(page => {
        if (page.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !items.some(item => item.text === page.name)) {
          items.push({
            text: page.name,
            type: 'page',
            action: () => {
              page.action();
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
            window.open('https://linkedin.com/in/your-profile', '_blank');
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
            window.open('https://github.com/your-username', '_blank');
            setShowAutocomplete(false);
          }
        });
      }
    }

    return items.slice(0, 5);
  }, [searchQuery, secretTrigger]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Check if it's the secret trigger first
      if (secretTrigger && searchQuery.toLowerCase() === secretTrigger.toLowerCase()) {
        navigateToSecret();
      } else {
        navigateToSearch(searchQuery);
      }
    }
  };

  const handleFocus = () => {
    setShowAutocomplete(true);
  };

  const handleBlur = () => {
    // Delay hiding autocomplete to allow for clicks
    setTimeout(() => setShowAutocomplete(false), 200);
  };

  // Home page only renders the search interface
  return (
    <>
      <GlobalStyle />
      <TabManager>
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