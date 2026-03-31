"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Search,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Tag,
  Linkedin,
  Github,
  CornerDownLeft,
  FileText,
} from 'lucide-react';
import contentData from '../../data/content.json';
import { ContentItem } from '../../types/content';
import {
  Overlay,
  SpotlightContainer,
  SearchInputContainer,
  SearchIconWrapper,
  SpotlightInput,
  EscHint,
  ResultsList,
  ResultItem,
  ResultIcon,
  ResultContent,
  ResultTitle,
  ResultSubtitle,
  ResultAction,
  NoResults,
  SectionLabel,
  FooterHints,
  FooterHintItem,
  FooterKbd,
} from './styles';

interface SpotlightResult {
  id: string;
  text: string;
  subtitle?: string;
  type: 'page' | 'content' | 'skill' | 'external' | 'search';
  icon: React.ReactNode;
  action: () => void;
}

const SpotlightSearch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const secretTrigger = process.env.NEXT_PUBLIC_SECRET_TRIGGER;

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  // Close on route change
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        e.stopPropagation();

        // On home page, focus the existing search bar instead
        if (pathname === '/') {
          const homeInput = document.querySelector(
            '[data-home-search]'
          ) as HTMLInputElement | null;
          if (homeInput) {
            homeInput.focus();
            return;
          }
        }

        setIsOpen((prev) => {
          if (prev) {
            // Closing
            setQuery('');
            setActiveIndex(0);
            return false;
          }
          return true;
        });
      }

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, pathname, close]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Navigation helpers
  const navigate = useCallback(
    (path: string) => {
      router.push(path);
      close();
    },
    [router, close]
  );

  const openExternal = useCallback(
    (url: string) => {
      window.open(url, '_blank');
      close();
    },
    [close]
  );

  // All unique skills
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    const arrays = [
      contentData.experiences,
      contentData.projects,
      contentData.education,
      contentData.about,
    ];
    arrays.forEach((arr) =>
      arr.forEach((item) => item.skills?.forEach((s) => set.add(s)))
    );
    return Array.from(set);
  }, []);

  // Build results list
  const results: SpotlightResult[] = useMemo(() => {
    const items: SpotlightResult[] = [];

    // Empty state: quick navigation
    if (!query.trim()) {
      return [
        {
          id: 'nav-projects',
          text: 'Projects',
          type: 'page',
          icon: <Code size={18} />,
          action: () => navigate('/projects'),
        },
        {
          id: 'nav-experience',
          text: 'Experience',
          type: 'page',
          icon: <Briefcase size={18} />,
          action: () => navigate('/experience'),
        },
        {
          id: 'nav-education',
          text: 'Education',
          type: 'page',
          icon: <GraduationCap size={18} />,
          action: () => navigate('/education'),
        },
        {
          id: 'nav-about',
          text: 'About Me',
          type: 'page',
          icon: <User size={18} />,
          action: () => navigate('/about'),
        },
      ];
    }

    const q = query.toLowerCase();

    // Secret trigger
    if (secretTrigger && q === secretTrigger.toLowerCase()) {
      return [
        {
          id: 'secret',
          text: 'Special Access',
          subtitle: 'Restricted content',
          type: 'page',
          icon: <FileText size={18} />,
          action: () => navigate('/secret'),
        },
      ];
    }

    // Content matches (title + company)
    const allContent: ContentItem[] = [
      ...contentData.experiences,
      ...contentData.projects,
      ...contentData.education,
      ...contentData.about,
    ];

    allContent
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.company?.toLowerCase().includes(q)
      )
      .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
      .slice(0, 4)
      .forEach((item) => {
        items.push({
          id: `content-${item.id}`,
          text: item.title,
          subtitle: item.company || item.category,
          type: 'content',
          icon: <FileText size={18} />,
          action: () => navigate(`/content/${item.id}`),
        });
      });

    // Skill matches
    if (q.length >= 2) {
      allSkills
        .filter((s) => s.toLowerCase().includes(q))
        .sort((a, b) => {
          const al = a.toLowerCase();
          const bl = b.toLowerCase();
          if (al === q) return -1;
          if (bl === q) return 1;
          if (al.startsWith(q) && !bl.startsWith(q)) return -1;
          if (bl.startsWith(q) && !al.startsWith(q)) return 1;
          return a.localeCompare(b);
        })
        .slice(0, 3)
        .forEach((skill) => {
          items.push({
            id: `skill-${skill}`,
            text: skill,
            subtitle: 'Skill',
            type: 'skill',
            icon: <Tag size={18} />,
            action: () => navigate(`/skills/${encodeURIComponent(skill)}`),
          });
        });
    }

    // Static page matches
    const pages = [
      { name: 'Projects', path: '/projects', icon: <Code size={18} /> },
      { name: 'Experience', path: '/experience', icon: <Briefcase size={18} /> },
      { name: 'Education', path: '/education', icon: <GraduationCap size={18} /> },
      { name: 'About Me', path: '/about', icon: <User size={18} /> },
    ];

    pages.forEach((page) => {
      if (
        page.name.toLowerCase().includes(q) &&
        !items.some((i) => i.text === page.name)
      ) {
        items.push({
          id: `page-${page.name}`,
          text: page.name,
          type: 'page',
          icon: page.icon,
          action: () => navigate(page.path),
        });
      }
    });

    // External links
    if (q.length >= 3) {
      if ('linkedin'.includes(q)) {
        items.push({
          id: 'ext-linkedin',
          text: 'LinkedIn',
          subtitle: 'Open profile',
          type: 'external',
          icon: <Linkedin size={18} />,
          action: () => openExternal('https://linkedin.com/in/ollie-wl'),
        });
      }
      if ('github'.includes(q)) {
        items.push({
          id: 'ext-github',
          text: 'GitHub',
          subtitle: 'Open profile',
          type: 'external',
          icon: <Github size={18} />,
          action: () => openExternal('https://github.com/OllieL1'),
        });
      }
    }

    // "Search for..." fallback at the end
    items.push({
      id: 'search-query',
      text: `Search for "${query}"`,
      type: 'search',
      icon: <Search size={18} />,
      action: () => navigate(`/search?q=${encodeURIComponent(query)}`),
    });

    return items.slice(0, 9);
  }, [query, secretTrigger, allSkills, navigate, openExternal]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results.length, query]);

  // Keyboard navigation within results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[activeIndex]) {
          results[activeIndex].action();
        } else if (query.trim()) {
          navigate(`/search?q=${encodeURIComponent(query)}`);
        }
        break;
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeEl = resultsRef.current.querySelector(
        '[data-active="true"]'
      ) as HTMLElement | null;
      activeEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={close}>
      <SpotlightContainer onClick={(e) => e.stopPropagation()}>
        <SearchInputContainer>
          <SearchIconWrapper>
            <Search size={20} />
          </SearchIconWrapper>
          <SpotlightInput
            ref={inputRef}
            type="text"
            placeholder="Search portfolio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <EscHint onClick={close}>ESC</EscHint>
        </SearchInputContainer>

        <ResultsList ref={resultsRef}>
          {!query.trim() && <SectionLabel>Quick Navigation</SectionLabel>}
          {query.trim() && results.length === 0 ? (
            <NoResults>No results found</NoResults>
          ) : (
            results.map((result, index) => (
              <ResultItem
                key={result.id}
                $active={index === activeIndex}
                data-active={index === activeIndex}
                onClick={result.action}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <ResultIcon $active={index === activeIndex}>
                  {result.icon}
                </ResultIcon>
                <ResultContent>
                  <ResultTitle>{result.text}</ResultTitle>
                  {result.subtitle && (
                    <ResultSubtitle>{result.subtitle}</ResultSubtitle>
                  )}
                </ResultContent>
                <ResultAction>
                  {index === activeIndex && <CornerDownLeft size={14} />}
                </ResultAction>
              </ResultItem>
            ))
          )}
        </ResultsList>

        <FooterHints>
          <FooterHintItem>
            <FooterKbd>↑</FooterKbd>
            <FooterKbd>↓</FooterKbd>
            navigate
          </FooterHintItem>
          <FooterHintItem>
            <FooterKbd>↵</FooterKbd>
            open
          </FooterHintItem>
          <FooterHintItem>
            <FooterKbd>esc</FooterKbd>
            close
          </FooterHintItem>
        </FooterHints>
      </SpotlightContainer>
    </Overlay>
  );
};

export default SpotlightSearch;
