import styled from 'styled-components';

export const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  animation: pageEnter 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const MainAboutCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 3rem;
  color: var(--text-primary);
  margin-bottom: 3rem;
  box-shadow: var(--shadow-lg);

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

export const MainCardContent = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    text-align: center;
  }
`;

export const ProfileImageContainer = styled.div`
  flex-shrink: 0;

  @media (max-width: 768px) {
    order: -1;
  }
`;

export const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--profile-border);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

export const MainContent = styled.div`
  flex: 1;
`;

export const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--text-heading);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const MainSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0 0 2rem 0;
  line-height: 1.6;
  font-weight: 500;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    gap: 1rem;
    justify-content: center;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-secondary);

  svg {
    flex-shrink: 0;
    color: var(--accent-secondary);
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--accent-secondary);
  border-radius: 8px;
  color: var(--text-on-accent);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
  }

  &:nth-child(2) {
    background: var(--accent-red);

    &:hover {
      background: var(--accent-red-hover);
      box-shadow: 0 4px 12px rgba(52, 168, 83, 0.3);
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
`;

export const PreviewCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PreviewCard = styled.div`
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-default);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--accent-purple);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }
`;

export const PreviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
`;

export const PreviewText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
`;

export const SkillsPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const SkillChip = styled.span`
  background: var(--bg-tag-neutral);
  color: var(--accent-purple);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--accent-purple);
    color: var(--text-on-accent);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
`;
