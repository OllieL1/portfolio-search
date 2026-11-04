import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { useWindow } from '../../hooks/useWindow';

// Types
interface AutocompleteItem {
  text: string;
  type: 'page' | 'external' | 'skill';
  icon?: React.ReactNode;
  subtitle?: string;
  action: () => void;
}

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  autocompleteItems: AutocompleteItem[];
  showAutocomplete: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

// Styled components
const SearchContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 6.5rem 0 3rem;
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font: inherit;
  font-size: 1.02rem;
  letter-spacing: -0.005em;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background: var(--bg-input);
  color: var(--text-heading);
  box-shadow: var(--shadow-sm);

  &:hover {
    box-shadow: var(--shadow-md);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: color-mix(in srgb, var(--text-tertiary) 45%, var(--border-default));
    box-shadow: var(--shadow-md);
  }

  &::placeholder {
    color: var(--text-tertiary);
    font-weight: 400;
  }

  @media (max-width: 768px) {
    padding-right: 1.25rem;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  left: 0.65rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-tertiary);
  padding: 0.45rem;
  border-radius: 50%;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--accent-primary);
    background: color-mix(in srgb, var(--accent-primary) 8%, transparent);
  }
`;

const ShortcutBadge = styled.div<{ $visible: boolean }>`
  position: absolute;
  right: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.2rem;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Kbd = styled.kbd`
  min-width: 1.5rem;
  text-align: center;
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  font-family: inherit;
  color: var(--text-secondary);
  line-height: 1.1;
  font-weight: 600;
`;

const AutocompleteContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  padding: 0.35rem;
  max-height: 320px;
  overflow-y: auto;
  z-index: 50;
  margin-top: 0.5rem;
`;

const AutocompleteItem = styled.div`
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  border-radius: 10px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: var(--bg-hover);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const AutocompleteIcon = styled.div`
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const AutocompleteContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const AutocompleteText = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

const AutocompleteSubtitle = styled.span`
  color: var(--text-tertiary);
  font-size: 0.85rem;
  text-align: right;
  margin-left: auto;
`;

// Component
const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onSearch,
  autocompleteItems,
  showAutocomplete,
  onFocus,
  onBlur
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const { isMobile } = useWindow();

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  const showBadge = !isFocused && !searchQuery;

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder={isMobile ? 'Search my portfolio…' : 'Search skills, tools, topics…'}
        aria-label="Search portfolio"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        data-home-search
      />
      <ShortcutBadge $visible={showBadge}>
        <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
        <Kbd>K</Kbd>
      </ShortcutBadge>
      <SearchButton onClick={onSearch} aria-label="Search">
        <Search size={18} />
      </SearchButton>
      {showAutocomplete && autocompleteItems.length > 0 && (
        <AutocompleteContainer>
          {autocompleteItems.map((item, index) => (
            <AutocompleteItem key={index} onClick={item.action}>
              {item.icon && (
                <AutocompleteIcon>
                  {item.icon}
                </AutocompleteIcon>
              )}
              <AutocompleteContent>
                <AutocompleteText>{item.text}</AutocompleteText>
                {item.subtitle && (
                  <AutocompleteSubtitle>{item.subtitle}</AutocompleteSubtitle>
                )}
              </AutocompleteContent>
            </AutocompleteItem>
          ))}
        </AutocompleteContainer>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
