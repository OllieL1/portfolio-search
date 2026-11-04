"use client";

import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X } from 'lucide-react';

interface ShortcutsModalProps {
  onClose: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(9, 9, 11, 0.35);
  backdrop-filter: blur(6px);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${fadeIn} 0.18s ease-out;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  padding: 1.25rem 1.25rem 1rem;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${popIn} 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  font-family: var(--font-body), sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-heading);
`;

const CloseButton = styled.button`
  display: flex;
  padding: 0.35rem;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--text-heading);
    background: var(--bg-subtle);
  }
`;

const Group = styled.section`
  & + & {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-subtle);
  }
`;

const GroupTitle = styled.h3`
  font-family: var(--font-body), sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 0.35rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);

  small {
    display: block;
    font-size: 0.75rem;
    color: var(--text-tertiary);
  }
`;

const Keys = styled.span`
  display: inline-flex;
  gap: 0.25rem;
  flex-shrink: 0;
`;

const Kbd = styled.kbd`
  min-width: 1.6rem;
  text-align: center;
  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1;
  color: var(--text-primary);
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 0.3rem 0.45rem;
`;

interface Shortcut {
  keys: string[];
  label: string;
  note?: string;
}

const Modal: React.FC<ShortcutsModalProps> = ({ onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        // Only one focusable control - keep focus inside the dialog
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const groups: { title: string; items: Shortcut[] }[] = [
    {
      title: 'Navigation',
      items: [
        { keys: ['H'], label: 'Home' },
        { keys: ['1'], label: 'Projects' },
        { keys: ['2'], label: 'Experience' },
        { keys: ['3'], label: 'Education' },
        { keys: ['4'], label: 'About' },
      ],
    },
    {
      title: 'Interface',
      items: [
        { keys: ['S'], label: 'Pin / unpin sidebar', note: 'Available once the sidebar is showing' },
        { keys: ['T'], label: 'Toggle light / dark theme' },
        { keys: ['?'], label: 'Show these shortcuts' },
        { keys: ['Esc'], label: 'Close dialogs' },
      ],
    },
    {
      title: 'Search',
      items: [{ keys: [isMac ? '⌘' : 'Ctrl', 'K'], label: 'Search anywhere' }],
    },
  ];

  return (
    <Backdrop onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <Card role="dialog" aria-modal="true" aria-labelledby="shortcuts-title">
        <Header>
          <Title id="shortcuts-title">Keyboard shortcuts</Title>
          <CloseButton ref={closeRef} onClick={onClose} aria-label="Close">
            <X size={16} />
          </CloseButton>
        </Header>
        {groups.map(group => (
          <Group key={group.title}>
            <GroupTitle>{group.title}</GroupTitle>
            {group.items.map(item => (
              <Row key={item.label}>
                <span>
                  {item.label}
                  {item.note && <small>{item.note}</small>}
                </span>
                <Keys>
                  {item.keys.map(k => <Kbd key={k}>{k}</Kbd>)}
                </Keys>
              </Row>
            ))}
          </Group>
        ))}
      </Card>
    </Backdrop>
  );
};

export default Modal;
