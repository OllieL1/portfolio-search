import React from 'react';
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
  border: 1px solid #ddd;
  border-radius: 24px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
  background: white;
  color: black;
  
  &:focus {
    border-color: #4285f4;
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.1);
  }
  
  &::placeholder {
    color: #999;
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
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    color: #4285f4;
    background: rgba(66, 133, 244, 0.1);
  }
`;

const AutocompleteContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 50;
  margin-top: 0.5rem;
`;

const AutocompleteItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const AutocompleteIcon = styled.div`
  color: #666;
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
  color: #333;
  font-weight: 500;
`;

const AutocompleteSubtitle = styled.span`
  color: #999;
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search my portfolio..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
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