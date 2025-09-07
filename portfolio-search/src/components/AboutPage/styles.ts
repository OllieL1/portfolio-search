import styled from 'styled-components';

export const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const MainAboutCard = styled.div`
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 20px;
  padding: 3rem;
  color: #333;
  margin-bottom: 3rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  
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
  border: 4px solid #f8f9fa;
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
  color: #202124;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const MainSubtitle = styled.p`
  font-size: 1.2rem;
  color: #5f6368;
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
  color: #5f6368;
  
  svg {
    flex-shrink: 0;
    color: #1a73e8;
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
  background: #1a73e8;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1557b0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3); 
  }
  
  &:nth-child(2) {
    background: #be4e4eff;
    
    &:hover {
      background: #8f2d2dff;
      box-shadow: 0 4px 12px rgba(52, 168, 83, 0.3);
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: #333;
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
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e1e5e9;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #667eea;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }
`;

export const PreviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #333;
`;

export const PreviewText = styled.p`
  color: #666;
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
  background: #f0f2f5;
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;