import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

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
  padding: 1rem 3rem 1rem 1rem;
  border: 1px solid var(--border-default);
  border-radius: 24px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
  background: var(--bg-input);
  color: var(--text-primary);

  &:focus {
    border-color: var(--accent-primary);
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.1);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    color: var(--accent-primary);
    background: rgba(66, 133, 244, 0.1);
  }
`;

const ShortcutBadge = styled.div<{ $visible: boolean }>`
  position: absolute;
  right: 3.25rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.2rem;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 0.7 : 0)};
  transition: opacity 0.2s;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Kbd = styled.kbd`
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-radius: 5px;
  padding: 0.2rem 0.45rem;
  font-size: 0.7rem;
  font-family: inherit;
  color: var(--text-tertiary);
  line-height: 1;
  font-weight: 500;
`;

const AutocompleteContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-height: 300px;
  overflow-y: auto;
  z-index: 50;
  margin-top: 0.5rem;
`;

const AutocompleteItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-light);
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
        placeholder="Search my portfolio..."
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
      <SearchButton onClick={onSearch}>
        <Search size={20} />
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
