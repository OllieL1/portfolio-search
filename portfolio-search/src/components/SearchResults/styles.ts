import styled from 'styled-components';

export const SearchResultsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  animation: pageEnter 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SearchHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-light);
`;

export const SearchTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SearchQuery = styled.span`
  color: var(--accent-primary);
  font-weight: 700;
`;

export const ResultCount = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ResultCard = styled.article`
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-color: var(--accent-primary);
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
  color: var(--text-link);
  margin-bottom: 0.25rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const ResultCompany = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: var(--accent-primary);
  margin-bottom: 0.5rem;
`;

export const ResultMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);

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
  background: var(--bg-tag);
  color: var(--accent-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const ResultSnippet = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-detail);
  margin-bottom: 1rem;

  .highlight {
    background: var(--bg-highlight);
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
  background: ${props => props.$highlighted ? 'var(--accent-primary)' : 'var(--bg-subtle)'};
  color: ${props => props.$highlighted ? 'var(--text-on-accent)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.$highlighted ? 'var(--accent-primary)' : 'var(--border-default)'};
  border-radius: 16px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
`;

export const NoResultsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

export const NoResultsText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const BackButton = styled.button`
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-family: 'Roboto Slab', serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 2rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: var(--bg-hover);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;
