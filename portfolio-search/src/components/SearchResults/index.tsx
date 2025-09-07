import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ContentItem } from '../../types/content';
import {
  SearchResultsContainer,
  SearchHeader,
  SearchTitle,
  SearchQuery,
  ResultCount,
  ResultsList,
  ResultCard,
  ResultHeader,
  ResultTitle,
  ResultCompany,
  ResultMeta,
  ResultDate,
  ResultCategory,
  ResultSnippet,
  ResultSkills,
  SkillChip,
  NoResults,
  NoResultsTitle,
  NoResultsText,
  BackButton
} from './styles';

interface SearchResultsProps {
  query: string;
  results: ContentItem[];
  onResultClick: (contentId: string) => void;
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  onResultClick,
  onBack
}) => {
  // Helper function to highlight search terms in text
  const highlightText = (text: string, searchQuery: string): string => {
    if (!searchQuery.trim()) return text;
    
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
    });
    
    return highlightedText;
  };

  // Helper function to check if a skill matches the search query
  const isSkillHighlighted = (skill: string, searchQuery: string): boolean => {
    if (!searchQuery.trim()) return false;
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    return searchTerms.some(term => skill.toLowerCase().includes(term));
  };

  // Helper function to create snippet from detail text
  const createSnippet = (detail: string, searchQuery: string, maxLength: number = 150): string => {
    if (!searchQuery.trim()) return detail.slice(0, maxLength) + (detail.length > maxLength ? '...' : '');
    
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    const lowerDetail = detail.toLowerCase();
    
    // Find the first occurrence of any search term
    let bestIndex = -1;
    let bestTerm = '';
    
    searchTerms.forEach(term => {
      const index = lowerDetail.indexOf(term);
      if (index !== -1 && (bestIndex === -1 || index < bestIndex)) {
        bestIndex = index;
        bestTerm = term;
      }
    });
    
    if (bestIndex === -1) {
      return detail.slice(0, maxLength) + (detail.length > maxLength ? '...' : '');
    }
    
    // Create snippet around the found term
    const startIndex = Math.max(0, bestIndex - 50);
    const endIndex = Math.min(detail.length, startIndex + maxLength);
    let snippet = detail.slice(startIndex, endIndex);
    
    if (startIndex > 0) snippet = '...' + snippet;
    if (endIndex < detail.length) snippet = snippet + '...';
    
    return snippet;
  };

  return (
    <SearchResultsContainer>
      <BackButton onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Search
      </BackButton>

      <SearchHeader>
        <SearchTitle>
          Search results for "<SearchQuery>{query}</SearchQuery>"
        </SearchTitle>
        <ResultCount>
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </ResultCount>
      </SearchHeader>

      {results.length === 0 ? (
        <NoResults>
          <NoResultsTitle>No results found</NoResultsTitle>
          <NoResultsText>
            Try searching for different keywords or check your spelling.
            <br />
            You can search for projects, experiences, education, or skills.
          </NoResultsText>
        </NoResults>
      ) : (
        <ResultsList>
          {results.map((result) => (
            <ResultCard 
              key={result.id} 
              onClick={() => onResultClick(result.id)}
            >
              <ResultHeader>
                <div>
                  <ResultTitle>{result.title}</ResultTitle>
                  <ResultCompany>{result.company}</ResultCompany>
                </div>
                <ResultMeta>
                  <ResultDate>{result.dateRange}</ResultDate>
                  <ResultCategory>{result.category}</ResultCategory>
                </ResultMeta>
              </ResultHeader>

              <ResultSnippet
                dangerouslySetInnerHTML={{
                  __html: highlightText(createSnippet(result.detail, query), query)
                }}
              />

              <ResultSkills>
                {result.skills.slice(0, 5).map((skill, index) => (
                  <SkillChip 
                    key={index}
                    $highlighted={isSkillHighlighted(skill, query)}
                  >
                    {skill}
                  </SkillChip>
                ))}
                {result.skills.length > 5 && (
                  <SkillChip>+{result.skills.length - 5} more</SkillChip>
                )}
              </ResultSkills>
            </ResultCard>
          ))}
        </ResultsList>
      )}
    </SearchResultsContainer>
  );
};

export default SearchResults;