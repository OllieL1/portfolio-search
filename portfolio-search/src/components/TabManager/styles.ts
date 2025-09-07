import styled from 'styled-components';

export const TabsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 1rem;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: none;
    padding: 1rem;
    z-index: 1000;
  }
`;

export const Tab = styled.div<{ active: boolean; isNewSearch?: boolean }>`
  background: ${props => props.active ? '#4285f4' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#4285f4' : '#e0e0e0'};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  min-width: fit-content;
  max-width: 200px;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background: ${props => props.active ? '#3367d6' : '#f8f9fa'};
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    max-width: 150px;
  }
`;

export const TabTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin-left: 0.25rem;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const ContentWrapper = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding-top: 0;
    padding-bottom: 80px;
  }
`;