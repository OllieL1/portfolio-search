import React from 'react';
import styled from 'styled-components';
import { ExternalLink, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { getProfile } from '../../utils/contentUtils';
import { useTheme } from '../../theme';
import { emit, UI_EVENTS } from '../../lib/uiEvents';

const profile = getProfile();
const linkIcon = (label: string) =>
  label.toLowerCase().includes('linkedin') ? <Linkedin size={14} />
    : label.toLowerCase().includes('github') ? <Github size={14} />
    : <ExternalLink size={14} />;

// GitHub / LinkedIn / Get in touch - sourced from the profile in content.json
export const CONTACT_LINKS = [
  ...[...profile.links]
    // GitHub first, then LinkedIn, then anything else
    .sort((a, b) => (/github/i.test(b.label) ? 1 : 0) - (/github/i.test(a.label) ? 1 : 0))
    .map(link => ({ label: link.label, href: link.url, icon: linkIcon(link.label) })),
  ...(profile.email
    ? [{ label: 'Get in touch', href: `mailto:${profile.email}`, icon: <Mail size={14} /> }]
    : []),
];

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1.5rem;
  border-top: 1px solid var(--border-subtle);

  /* Mobile uses the bottom tab bar + contact icons above the name instead */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const itemStyles = `
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.55rem;
  border-radius: 8px;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--text-heading);
    background: var(--bg-subtle);
  }
`;

const FooterLink = styled.a`
  ${itemStyles}

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

const FooterButton = styled.button`
  ${itemStyles}
`;

const Key = styled.kbd`
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1;
  border: 1px solid var(--border-default);
  border-bottom-width: 2px;
  border-radius: 4px;
  padding: 0.15rem 0.35rem;
`;

const ShortcutsButton = styled(FooterButton)`
  @media (hover: none) {
    display: none;
  }
`;

const HomeFooter: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const themeLabel = theme === 'dark' ? 'Switch to light mode (T)' : 'Switch to dark mode (T)';

  return (
    <Footer>
      <Group>
        {CONTACT_LINKS.map(link => (
          <FooterLink
            key={link.label}
            href={link.href}
            aria-label={link.label}
            {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {link.icon}
            <span>{link.label}</span>
          </FooterLink>
        ))}
      </Group>
      <Group>
        <ShortcutsButton onClick={() => emit(UI_EVENTS.openShortcuts)} title="Keyboard shortcuts (?)">
          <Key>?</Key>
          Shortcuts
        </ShortcutsButton>
        <FooterButton onClick={toggleTheme} title={themeLabel} aria-label={themeLabel}>
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </FooterButton>
      </Group>
    </Footer>
  );
};

export default HomeFooter;
