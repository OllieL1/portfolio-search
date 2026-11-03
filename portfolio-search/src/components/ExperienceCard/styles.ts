import styled from 'styled-components';

export const CardContainer = styled.article`
  margin-bottom: 2rem;
`;

export const CardHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-default);
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-heading);
  margin-bottom: 0.75rem;
  line-height: 1.2;
  text-wrap: balance;
`;

export const Company = styled.h2`
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--accent-secondary);
  background: var(--bg-tag);
  border-radius: 999px;
  padding: 0.3rem 0.8rem;
  margin-bottom: 1rem;
`;

export const DateRange = styled.div`
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 400;
  flex: 1;
`;

export const DetailSection = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

export const DetailText = styled.div`
  font-size: 1.02rem;
  line-height: 1.75;
  color: var(--text-detail);
  max-width: 70ch;

  p + p,
  p + ol,
  p + ul,
  ol + p,
  ul + p {
    margin-top: 1.1em;
  }

  ol,
  ul {
    margin-top: 0.6em;
    padding-left: 1.4em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  li::marker {
    color: var(--accent-primary);
    font-weight: 700;
  }
`;

export const VideoSection = styled.section`
  margin-bottom: 2rem;
`;

export const VideoPlayer = styled.video`
  width: 100%;
  max-width: 720px;
  border-radius: 8px;
  border: 1px solid var(--border-default);
  display: block;
  background: #000;

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 6px;
  }
`;

export const SkillsSection = styled.section`
  margin-top: 2rem;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const SkillTag = styled.button`
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--accent-primary);
    color: var(--text-on-accent);
    border-color: var(--accent-primary);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
`;

export const LinkSection = styled.section`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
`;

export const ExternalLinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-primary);
  color: var(--text-on-accent);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 4px rgba(66, 133, 244, 0.2);
  white-space: nowrap;

  &:hover {
    background: var(--accent-primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    transition: transform 0.2s;
  }

  &:hover .icon {
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;

export const PhotoGalleryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-green);
  color: var(--text-on-accent);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 4px rgba(52, 168, 83, 0.2);
  white-space: nowrap;

  &:hover {
    background: var(--accent-green-hover);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(52, 168, 83, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    transition: transform 0.2s;
  }

  &:hover .icon {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;
