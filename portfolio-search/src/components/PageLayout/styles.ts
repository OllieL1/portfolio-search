import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-page);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const PageContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-card);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-default);
  animation: pageEnter 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 8px;
  }
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
