"use client";

import React, { useState, useMemo } from 'react';
import { useAppRouter } from '../../hooks/useAppRouter';
import styled, { createGlobalStyle } from 'styled-components';
import { Code, Briefcase, GraduationCap, User, Linkedin, Github, Tag, Shuffle } from 'lucide-react';
import { useIsClient } from '../../hooks/useWindow';
import AnimatedLogo from './AnimatedLogo';
import SearchBar from './SearchBar';
import Shortcuts from './Shortcuts';
import HomeFooter, { CONTACT_LINKS } from './HomeFooter';
import contentData from '../../data/content.json';
import { ContentItem } from '../../types/content';

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
  hotkey?: string;
  action: () => void;
}

// Layout styled components
const Page = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 100vh;
    height: 100dvh;
    min-height: 0;
    overflow: hidden;
  }
`;

// The home page always fits on a phone screen, so pin it in place:
// no scrolling and no rubber-band bounce. Only applies while this page is mounted.
const LockMobileScroll = createGlobalStyle`
  @media (max-width: 768px) {
    html,
    body {
      height: 100%;
      overflow: hidden;
      overscroll-behavior: none;
    }
  }
`;

const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 2rem 12vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 8vh;
  }
`;

const SearchSection = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

// Contact icons above the name - only where the mobile bottom bar replaces the footer
const MobileContacts = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 1.25rem;
    margin-bottom: 0.25rem;
  }
`;

const ContactIcon = styled.a`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  color: var(--text-secondary);
  box-shadow: var(--shadow-sm);
  transition: color 0.2s ease, border-color 0.2s ease;

  &:active {
    color: var(--text-heading);
    border-color: color-mix(in srgb, var(--accent-primary) 40%, var(--border-default));
  }
`;

const SurpriseMeButton = styled.button`
  margin-top: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.15rem;
  border-radius: 999px;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  color: var(--text-secondary);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  svg {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: var(--text-heading);
    border-color: color-mix(in srgb, var(--accent-primary) 40%, var(--border-default));
    box-shadow: var(--shadow-md);

    svg {
      transform: rotate(360deg);
      color: var(--accent-primary);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Main component
const HomePage: React.FC = () => {
  const router = useAppRouter();
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

  const navigateToRandomContent = () => {
    // Get all content items from all categories
    const allContent = [
      ...contentData.experiences,
      ...contentData.projects,
      ...contentData.education,
      ...contentData.about
    ];
    
    if (allContent.length > 0) {
      const randomIndex = Math.floor(Math.random() * allContent.length);
      const randomContent = allContent[randomIndex];
      navigateToContent(randomContent.id);
    }
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

  // Shortcuts (hotkeys match the global keyboard shortcuts)
  const shortcuts: ShortcutItem[] = [
    { name: 'Projects', icon: <Code size={14} />, hotkey: '1', action: navigateToProjects },
    { name: 'Experience', icon: <Briefcase size={14} />, hotkey: '2', action: navigateToExperience },
    { name: 'Education', icon: <GraduationCap size={14} />, hotkey: '3', action: navigateToEducation },
    { name: 'About', icon: <User size={14} />, hotkey: '4', action: navigateToAbout },
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
    <Page>
      <LockMobileScroll />
      <Container>
        <SearchSection>
          <MobileContacts aria-label="Contact">
            {CONTACT_LINKS.map(link => (
              <ContactIcon
                key={link.label}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {React.cloneElement(link.icon, { size: 18 })}
              </ContactIcon>
            ))}
          </MobileContacts>
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
          <SurpriseMeButton onClick={navigateToRandomContent}>
            <Shuffle size={14} />
            Surprise me
          </SurpriseMeButton>
        </SearchSection>
      </Container>
      <HomeFooter />
    </Page>
  );
};

export default HomePage;