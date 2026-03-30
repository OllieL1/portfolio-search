import styled from 'styled-components';

export const SkillsResultsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  animation: pageEnter 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SkillsHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-light);
`;

export const SkillsTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SkillName = styled.span`
  color: var(--accent-primary);
  font-weight: 700;
`;

export const ResultCount = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

export const SkillsResultsList = styled.div`
  display: grid;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const SkillResultCard = styled.article`
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-primary);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const CardLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CardRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-link);
  margin-bottom: 0.25rem;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1rem;
    white-space: normal;
    overflow: visible;
    text-overflow: initial;
  }
`;

export const CardCompany = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--accent-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    white-space: normal;
    overflow: visible;
    text-overflow: initial;
  }
`;

export const CardDate = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
`;

export const SkillCount = styled.span`
  background: var(--bg-tag);
  color: var(--accent-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const CardDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-detail);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    -webkit-line-clamp: 3;
  }
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
