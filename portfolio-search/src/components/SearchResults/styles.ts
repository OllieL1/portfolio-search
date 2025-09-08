import styled from 'styled-components';

export const SearchResultsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SearchHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

export const SearchTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SearchQuery = styled.span`
  color: #4285f4;
  font-weight: 700;
`;

export const ResultCount = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ResultCard = styled.article`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-color: #4285f4;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const ResultTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a0dab;
  margin-bottom: 0.25rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const ResultCompany = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #4285f4;
  margin-bottom: 0.5rem;
`;

export const ResultMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: #666;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

export const ResultDate = styled.span`
  font-weight: 500;
`;

export const ResultCategory = styled.span`
  background: #f0f8ff;
  color: #4285f4;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const ResultSnippet = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1rem;
  
  .highlight {
    background: #fff3cd;
    padding: 0.1em 0.2em;
    border-radius: 3px;
    font-weight: 600;
  }
`;

export const ResultSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const SkillChip = styled.span<{ $highlighted?: boolean }>`
  background: ${props => props.$highlighted ? '#4285f4' : '#f8f9fa'};
  color: ${props => props.$highlighted ? 'white' : '#333'};
  border: 1px solid ${props => props.$highlighted ? '#4285f4' : '#e0e0e0'};
  border-radius: 16px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
`;

export const NoResultsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

export const NoResultsText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const BackButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-family: 'Roboto Slab', serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 2rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;