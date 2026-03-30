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
  background: var(--bg-sidebar);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-subtle);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-secondary);

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: var(--accent-primary);
    transform: scale(1.1);
  }
`;

// Desktop Sidebar Styles
export const SidebarContainer = styled.div<{ $open: boolean; $pinned: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: var(--bg-sidebar);
  backdrop-filter: blur(16px);
  border-right: 1px solid var(--border-subtle);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
  width: ${props => props.$open ? '320px' : '0px'};
  overflow-x: hidden;

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
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SearchInput = styled.input<{ $open: boolean }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.5rem;
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
`;

export const HomeButton = styled.button`
  flex-shrink: 0;
  padding: 0.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.5rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }
`;

export const PinButton = styled.button<{ $pinned: boolean }>`
  flex-shrink: 0;
  padding: 0.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.5rem;
  background: ${props => props.$pinned ? 'var(--accent-primary)' : 'var(--bg-card)'};
  color: ${props => props.$pinned ? 'var(--text-on-accent)' : 'var(--text-secondary)'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.$pinned ? 'var(--accent-primary-hover)' : 'var(--bg-hover)'};
    color: ${props => props.$pinned ? 'var(--text-on-accent)' : 'var(--text-primary)'};
  }
`;

export const ThemeToggle = styled.button`
  flex-shrink: 0;
  padding: 0.5rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.5rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
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
  background: ${props => props.$active ? 'var(--accent-primary)' : 'transparent'};
  color: ${props => props.$active ? 'var(--text-on-accent)' : 'var(--text-primary)'};

  &:hover {
    background: ${props => {
      if (!props.$clickable) return 'transparent';
      return props.$active ? 'var(--accent-primary-hover)' : 'var(--bg-hover)';
    }};
  }

  .section-title {
    font-weight: 600;
    transition: opacity 0.2s ease;
    opacity: ${props => props.$open ? 1 : 0};
  }

  .chevron {
    margin-left: auto;
    color: ${props => props.$active ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-tertiary)'};
    transition: all 0.2s ease;
    opacity: ${props => props.$open ? 1 : 0};
  }

  &:hover .chevron {
    color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
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
  background: ${props => props.$active ? 'var(--accent-primary)' : 'transparent'};
  color: ${props => props.$active ? 'var(--text-on-accent)' : 'var(--text-primary)'};
  box-shadow: ${props => props.$active ? '0 4px 12px -2px rgba(59, 130, 246, 0.25)' : 'none'};

  &:hover {
    background: ${props => props.$active ? 'var(--accent-primary-hover)' : 'var(--bg-hover)'};
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
      background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'var(--border-subtle)'};
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
export const MobileTabsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-mobile-bar);
  backdrop-filter: blur(30px);
  border-top: 1px solid var(--bg-glass-border);
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
  border: 1px solid var(--bg-glass-border);
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'rgba(59, 130, 246, 0.9)' : 'var(--bg-glass)'};
  color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
  box-shadow: ${props => props.$active ? '0 8px 20px -3px rgba(59, 130, 246, 0.4)' : 'var(--shadow-md)'};
  backdrop-filter: blur(15px);

  &:hover {
    transform: translateY(-1px);
    background: ${props => props.$active ? 'rgba(59, 130, 246, 1)' : 'var(--bg-glass-hover)'};
  }
`;

export const MobileThemeToggle = styled.button`
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--bg-glass-border);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--bg-glass);
  color: var(--text-primary);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(15px);

  &:hover {
    transform: translateY(-1px);
    background: var(--bg-glass-hover);
  }
`;

export const MobileTabItem = styled.div<{ $active: boolean }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: 1px solid var(--bg-glass-border);
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'rgba(59, 130, 246, 0.9)' : 'var(--bg-glass)'};
  color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
  box-shadow: ${props => props.$active ? '0 8px 20px -3px rgba(59, 130, 246, 0.4)' : 'var(--shadow-md)'};
  backdrop-filter: blur(15px);

  &:hover {
    background: ${props => props.$active ? 'rgba(59, 130, 246, 1)' : 'var(--bg-glass-hover)'};
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
