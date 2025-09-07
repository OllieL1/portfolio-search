import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ContentItem } from '../../types/content';
import {
  SkillsResultsContainer,
  SkillsHeader,
  SkillsTitle,
  SkillName,
  ResultCount,
  SkillsResultsList,
  SkillResultCard,
  CardTop,
  CardLeft,
  CardRight,
  CardTitle,
  CardCompany,
  CardDate,
  SkillCount,
  CardDescription,
  NoResults,
  NoResultsTitle,
  NoResultsText,
  BackButton
} from './styles';

interface SkillsResultsProps {
  skill: string;
  results: ContentItem[];
  onResultClick: (contentId: string) => void;
  onBack: () => void;
}

const SkillsResults: React.FC<SkillsResultsProps> = ({
  skill,
  results,
  onResultClick,
  onBack
}) => {
  // Helper function to create a short description
  const createShortDescription = (detail: string, maxLength: number = 120): string => {
    if (detail.length <= maxLength) return detail;
    
    // Find the last complete sentence or word within the limit
    const truncated = detail.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const lastPeriod = truncated.lastIndexOf('.');
    
    if (lastPeriod > 0 && lastPeriod > maxLength - 50) {
      return detail.slice(0, lastPeriod + 1);
    } else if (lastSpace > 0) {
      return detail.slice(0, lastSpace) + '...';
    } else {
      return truncated + '...';
    }
  };

  return (
    <SkillsResultsContainer>
      <BackButton onClick={onBack}>
        <ArrowLeft size={16} />
        Back
      </BackButton>

      <SkillsHeader>
        <SkillsTitle>
          Items with skill: <SkillName>{skill}</SkillName>
        </SkillsTitle>
        <ResultCount>
          {results.length} {results.length === 1 ? 'item' : 'items'} found
        </ResultCount>
      </SkillsHeader>

      {results.length === 0 ? (
        <NoResults>
          <NoResultsTitle>No items found</NoResultsTitle>
          <NoResultsText>
            No content was found with the skill "{skill}".
            <br />
            Try exploring other skills or check out the main content sections.
          </NoResultsText>
        </NoResults>
      ) : (
        <SkillsResultsList>
          {results.map((result) => (
            <SkillResultCard 
              key={result.id} 
              onClick={() => onResultClick(result.id)}
            >
              <CardTop>
                <CardLeft>
                  <CardTitle title={result.title}>{result.title}</CardTitle>
                  <CardCompany title={result.company}>{result.company}</CardCompany>
                </CardLeft>
                <CardRight>
                  <CardDate>{result.dateRange}</CardDate>
                  <SkillCount>
                    {result.skills.length} skill{result.skills.length !== 1 ? 's' : ''}
                  </SkillCount>
                </CardRight>
              </CardTop>
              
              <CardDescription>
                {createShortDescription(result.detail)}
              </CardDescription>
            </SkillResultCard>
          ))}
        </SkillsResultsList>
      )}
    </SkillsResultsContainer>
  );
};

export default SkillsResults;