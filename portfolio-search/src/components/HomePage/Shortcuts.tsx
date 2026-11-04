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
`;

const Separator = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--border-default);

  @media (max-width: 480px) {
    display: none;
  }
`;

const Hotkey = styled.kbd`
  position: absolute;
  top: -0.35rem;
  right: -0.15rem;
  pointer-events: none;
  background: var(--bg-card);
  font-family: inherit;
  font-size: 0.6rem;
  font-weight: 600;
  line-height: 1;
  color: var(--text-tertiary);
  border: 1px solid var(--border-default);
  border-radius: 4px;
  padding: 0.15rem 0.3rem;
  opacity: 0;
  transform: translateY(2px);
  transition: opacity 0.2s ease, transform 0.2s ease;

  @media (hover: none) {
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

    ${Hotkey} {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Shortcuts: React.FC<ShortcutsProps> = ({ shortcuts }) => (
  <Row aria-label="Sections">
    {shortcuts.map((shortcut, index) => (
      <React.Fragment key={shortcut.name}>
        {index > 0 && <Separator aria-hidden="true" />}
        <LinkButton
          onClick={shortcut.action}
          title={shortcut.hotkey ? `${shortcut.name} (${shortcut.hotkey})` : shortcut.name}
        >
          {shortcut.icon}
          {shortcut.name}
          {shortcut.hotkey && <Hotkey aria-hidden="true">{shortcut.hotkey}</Hotkey>}
        </LinkButton>
      </React.Fragment>
    ))}
  </Row>
);

export default Shortcuts;
