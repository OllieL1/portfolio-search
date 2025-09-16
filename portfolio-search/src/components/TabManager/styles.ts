import styled from 'styled-components';

// Desktop Sidebar Hover Area - expanded hover zone
export const SidebarHoverArea = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 80px;
  height: 100vh;
  z-index: 45;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Desktop Sidebar Trigger
export const SidebarTrigger = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    transform: scale(1.1);
  }
`;

// Desktop Sidebar Styles
export const SidebarContainer = styled.div<{ $open: boolean; $pinned: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-right: 1px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
  width: ${props => props.$open ? '320px' : '0px'};
  overflow-x:auto;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

export const NewSearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SearchInput = styled.input<{ $open: boolean }>`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  min-width: ${props => props.$open ? '200px' : '40px'};
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const HomeButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f9fafb;
    color: #374151;
  }
`;

export const PinButton = styled.button<{ $pinned: boolean }>`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: ${props => props.$pinned ? '#3b82f6' : 'white'};
  color: ${props => props.$pinned ? 'white' : '#6b7280'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.$pinned ? '#2563eb' : '#f9fafb'};
    color: ${props => props.$pinned ? 'white' : '#374151'};
  }
`;

export const SectionContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const SectionHeader = styled.div<{ $open: boolean; $active: boolean; $clickable: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  background: ${props => props.$active ? '#3b82f6' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#374151'};
  
  &:hover {
    background: ${props => {
      if (!props.$clickable) return 'transparent';
      return props.$active ? '#2563eb' : '#f9fafb';
    }};
  }
  
  .section-title {
    font-weight: 600;
    transition: opacity 0.2s ease;
    opacity: ${props => props.$open ? 1 : 0};
  }
  
  .chevron {
    margin-left: auto;
    color: ${props => props.$active ? 'rgba(255, 255, 255, 0.7)' : '#9ca3af'};
    transition: all 0.2s ease;
    opacity: ${props => props.$open ? 1 : 0};
  }
  
  &:hover .chevron {
    color: ${props => props.$active ? 'white' : '#6b7280'};
  }
`;

export const TabsList = styled.div<{ $open: boolean }>`
  margin-left: 1.5rem;
  transition: opacity 0.2s ease;
  opacity: ${props => props.$open ? 1 : 0};
`;

export const TabItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? '#3b82f6' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#374151'};
  box-shadow: ${props => props.$active ? '0 4px 12px -2px rgba(59, 130, 246, 0.25)' : 'none'};
  
  &:hover {
    background: ${props => props.$active ? '#2563eb' : '#f9fafb'};
  }
  
  .tab-title {
    flex: 1;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .close-button {
    padding: 0.25rem;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.2s ease;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : '#e5e7eb'};
    }
  }
  
  &:hover .close-button {
    opacity: 1;
  }
`;

export const DesktopContent = styled.div<{ $sidebarOpen: boolean }>`
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: ${props => props.$sidebarOpen ? '320px' : '0px'};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Mobile Bottom Tabs Styles
// Mobile Bottom Tabs Styles
// Mobile Bottom Tabs Styles
export const MobileTabsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  z-index: 50;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileTabsList = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  /* Hide scrollbar for tabs container */
  & > div::-webkit-scrollbar {
    display: none;
  }
`;

export const MobileNewSearchButton = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'rgba(59, 130, 246, 0.9)' : 'rgba(255, 255, 255, 0.3)'};
  color: ${props => props.$active ? 'white' : '#374151'};
  box-shadow: ${props => props.$active ? '0 8px 20px -3px rgba(59, 130, 246, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(15px);
  
  &:hover {
    transform: translateY(-1px);
    background: ${props => props.$active ? 'rgba(59, 130, 246, 1)' : 'rgba(255, 255, 255, 0.4)'};
  }
`;

export const MobileTabItem = styled.div<{ $active: boolean }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'rgba(59, 130, 246, 0.9)' : 'rgba(255, 255, 255, 0.3)'};
  color: ${props => props.$active ? 'white' : '#374151'};
  box-shadow: ${props => props.$active ? '0 8px 20px -3px rgba(59, 130, 246, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(15px);
  
  &:hover {
    background: ${props => props.$active ? 'rgba(59, 130, 246, 1)' : 'rgba(255, 255, 255, 0.4)'};
  }
  
  .tab-title {
    font-size: 0.875rem;
    font-weight: 500;
    max-width: 6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .close-button {
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const MobileContent = styled.div`
  padding-bottom: 5rem;
  
  @media (min-width: 769px) {
    display: none;
  }
`;