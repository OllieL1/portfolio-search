import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5dc;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const PageContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 8px;
  }
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