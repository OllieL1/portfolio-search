import React from 'react';
import styled from 'styled-components';

// Types
interface ShortcutItem {
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

interface ShortcutsProps {
  shortcuts: ShortcutItem[];
}

// Styled components
const ShortcutsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 320px;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    max-width: 280px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 200px;
  }
`;

const ShortcutButton = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1rem 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.75rem;
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 80px;
  height: 80px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  justify-self: center;
  
  &:hover {
    background: #fafafa;
    border-color: #4285f4;
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.12);
    transform: translateY(-2px);
    
    .shortcut-icon {
      color: #4285f4;
      transform: scale(1.15);
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    width: 72px;
    height: 72px;
    padding: 0.75rem 0.5rem;
    font-size: 0.7rem;
    gap: 0.5rem;
  }
`;

const ShortcutIcon = styled.div`
  color: #666;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Component
const Shortcuts: React.FC<ShortcutsProps> = ({ shortcuts }) => (
  <ShortcutsContainer>
    {shortcuts.map((shortcut, index) => (
      <ShortcutButton key={index} onClick={shortcut.action}>
        <ShortcutIcon className="shortcut-icon">
          {shortcut.icon}
        </ShortcutIcon>
        {shortcut.name}
      </ShortcutButton>
    ))}
  </ShortcutsContainer>
);

export default Shortcuts;