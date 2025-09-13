"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Code, Briefcase, GraduationCap, User, Linkedin, Github, Tag } from 'lucide-react';
import { useIsClient } from '../../hooks/useWindow';
import { GlobalStyle } from './GlobalStyles';
import AnimatedLogo from './AnimatedLogo';
import SearchBar from './SearchBar';
import Shortcuts from './Shortcuts';
import TabManager from '../TabManager';
import contentData from '../../data/content.json';
import { ContentItem } from '../../types/content'; // Import the type

// Types
interface AutocompleteItem {
  text: string;
  type: 'page' | 'external' | 'skill';
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
  
  const isClient = useIsClient();
  const secretTrigger = process.env.NEXT_PUBLIC_SECRET_TRIGGER;

  // Navigation functions
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

  const navigateToSkill = (skill: string) => {
    router.push(`/skills/${encodeURIComponent(skill)}`);
    setShowAutocomplete(false);
  };

  const safeWindowOpen = (url: string) => {
    if (isClient) {
      window.open(url, '_blank');
    }
    setShowAutocomplete(false);
  };

  // Helper function to get all unique skills from content data
  const getAllSkills = () => {
    const skillsSet = new Set<string>();
    
    // Get skills from all content categories
    const allContentArrays = [
      contentData.experiences,
      contentData.projects,
      contentData.education,
      contentData.about
    ];

    allContentArrays.forEach(contentArray => {
      contentArray.forEach(content => {
        if (content.skills) {
          content.skills.forEach(skill => skillsSet.add(skill));
        }
      });
    });
    
    return Array.from(skillsSet);
  };

  // Custom search function that only searches title and company
  const searchContentTitleAndCompany = (query: string): ContentItem[] => {
    const allContentArrays = [
      contentData.experiences,
      contentData.projects,
      contentData.education,
      contentData.about
    ];

    const results: ContentItem[] = [];
    const queryLower = query.toLowerCase();

    allContentArrays.forEach(contentArray => {
      contentArray.forEach(content => {
        const titleMatch = content.title.toLowerCase().includes(queryLower);
        const companyMatch = content.company?.toLowerCase().includes(queryLower);
        
        if (titleMatch || companyMatch) {
          results.push(content);
        }
      });
    });

    // Sort by relevance if available, otherwise keep original order
    return results.sort((a, b) => {
      const relevanceA = a.relevance || 0;
      const relevanceB = b.relevance || 0;
      return relevanceB - relevanceA;
    });
  };

  // Shortcuts
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

  // Improved autocomplete suggestions
  const autocompleteItems: AutocompleteItem[] = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const items: AutocompleteItem[] = [];
    const query = searchQuery.toLowerCase();

    // Check for secret page trigger
    if (secretTrigger && query === secretTrigger.toLowerCase()) {
      items.push({
        text: 'Special Access',
        type: 'page',
        subtitle: 'Restricted content',
        action: navigateToSecret
      });
      return items; // Return early for secret trigger
    }

    // Add high-relevance content matches (relevance 4 or 5) - search only title and company
    const contentMatches = searchContentTitleAndCompany(searchQuery);
    const highRelevanceMatches = contentMatches.filter(content => 
      content.relevance && content.relevance >= 4
    );
    
    highRelevanceMatches.slice(0, 2).forEach(content => {
      items.push({
        text: content.title,
        type: 'page',
        subtitle: content.company || content.category,
        action: () => navigateToContent(content.id)
      });
    });

    // Add skill matches - navigate to dedicated skill page
    const allSkills = getAllSkills();
    const matchingSkills = allSkills.filter(skill => 
      skill.toLowerCase().includes(query) && query.length >= 2
    );
    
    // Sort skills by relevance (exact match first, then starts with, then contains)
    matchingSkills.sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      
      if (aLower === query) return -1;
      if (bLower === query) return 1;
      if (aLower.startsWith(query) && !bLower.startsWith(query)) return -1;
      if (bLower.startsWith(query) && !aLower.startsWith(query)) return 1;
      return a.localeCompare(b);
    });
    
    matchingSkills.slice(0, 2).forEach(skill => {
      items.push({
        text: skill,
        type: 'skill',
        icon: <Tag size={16} />,
        subtitle: `View ${skill} projects & experience`,
        action: () => navigateToSkill(skill)
      });
    });

    // Add static page matches (only if they match)
    const staticPages = [
      { name: 'Projects', action: navigateToProjects },
      { name: 'Experience', action: navigateToExperience },
      { name: 'Education', action: navigateToEducation },
      { name: 'About Me', action: navigateToAbout }
    ];
    
    staticPages.forEach(page => {
      if (page.name.toLowerCase().includes(query) && 
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

    // Add external links (only for longer queries to reduce noise)
    if (query.length >= 3) {
      if ('linkedin'.includes(query)) {
        items.push({
          text: 'LinkedIn',
          type: 'external',
          icon: <Linkedin size={16} />,
          subtitle: 'Open in LinkedIn',
          action: () => safeWindowOpen('https://linkedin.com/in/ollie-wl')
        });
      }

      if ('github'.includes(query)) {
        items.push({
          text: 'GitHub',
          type: 'external',
          icon: <Github size={16} />,
          subtitle: 'Open in GitHub',
          action: () => safeWindowOpen('https://github.com/OllieL1')
        });
      }
    }

    return items.slice(0, 5); // Limit to 5 items max
  }, [searchQuery, secretTrigger, isClient]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
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
    setTimeout(() => setShowAutocomplete(false), 200);
  };

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