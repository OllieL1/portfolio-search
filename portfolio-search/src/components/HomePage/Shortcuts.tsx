import React from 'react';
import styled from 'styled-components';

interface ShortcutItem {
  name: string;
  icon: React.ReactNode;
  hotkey?: string;
  action: () => void;
}

interface ShortcutsProps {
  shortcuts: ShortcutItem[];
}

const Row = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.25rem 0.5rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: center;
    justify-items: start;
    column-gap: 2.75rem;
    row-gap: 0.75rem;
    margin-top: 0.25rem;
  }
`;

const Separator = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--border-default);

  @media (max-width: 768px) {
    display: none;
  }
`;

const LinkButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.6rem;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: var(--text-secondary);
  transition: color 0.2s ease;

  svg {
    color: var(--text-tertiary);
    transition: color 0.2s ease;
  }

  /* Underline that slides in from the left */
  &::after {
    content: '';
    position: absolute;
    left: 0.6rem;
    right: 0.6rem;
    bottom: 0.25rem;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover,
  &:focus-visible {
    color: var(--text-heading);

    svg {
      color: var(--accent-primary);
    }

    &::after {
      transform: scaleX(1);
    }
  }
`;

const Shortcuts: React.FC<ShortcutsProps> = ({ shortcuts }) => (
  <Row aria-label="Sections">
    {shortcuts.map((shortcut, index) => (
      <React.Fragment key={shortcut.name}>
        {index > 0 && <Separator aria-hidden="true" />}
        <LinkButton onClick={shortcut.action}>
          {shortcut.icon}
          {shortcut.name}
        </LinkButton>
      </React.Fragment>
    ))}
  </Row>
);

export default Shortcuts;
