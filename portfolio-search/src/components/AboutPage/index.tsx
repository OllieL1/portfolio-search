import React from 'react';
import { MapPin, Mail, Linkedin, Github, Calendar, ExternalLink } from 'lucide-react';
import { getContentByType, getProfile } from '../../utils/contentUtils';
import RichText from '../ExperienceCard/RichText';
import {
  AboutContainer,
  MainAboutCard,
  MainContent,
  MainCardContent,
  MainTitle,
  MainSubtitle,
  ContactInfo,
  ContactItem,
  SocialLinks,
  SocialLink,
  SectionTitle,
  PreviewCardsGrid,
  PreviewCard,
  PreviewTitle,
  PreviewText,
  SkillsPreview,
  SkillChip,
  ProfileImage,
  ProfileImageContainer
} from './styles';

interface AboutPageProps {
  onItemClick: (contentId: string) => void;
  onSkillClick?: (skill: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onItemClick, onSkillClick }) => {
  // The main card comes from `profile`; these are the extra "More About Me" cards
  const aboutContent = getContentByType('about')
    .sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
  
  // Helper function to create preview text
  const createPreviewText = (text: string, maxLength: number = 120): string => {
    if (text.length <= maxLength) return text;
    
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 0) {
      return text.slice(0, lastSpace) + '...';
    }
    return truncated + '...';
  };

  const handleSkillClick = (skill: string) => {
    if (onSkillClick) {
      onSkillClick(skill);
    }
  };

  const profile = getProfile();

  const linkIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('linkedin')) return <Linkedin size={16} />;
    if (l.includes('github')) return <Github size={16} />;
    return <ExternalLink size={16} />;
  };

  return (
    <AboutContainer>
      {/* Main About Me Card */}
      <MainAboutCard>
        <MainCardContent>
          <ProfileImageContainer>
            <ProfileImage
              src={`/${profile.image || 'portfolio-pfp.jpg'}`}
              alt={profile.name}
            />
          </ProfileImageContainer>
          
          <MainContent>
            <MainTitle>{profile.name}</MainTitle>
            <MainSubtitle>{profile.subtitle}</MainSubtitle>

            <div style={{ lineHeight: '1.6' }} className="about-intro">
              <RichText text={profile.intro} />
            </div>
            
            <ContactInfo>
              {profile.location && (
                <ContactItem>
                  <MapPin size={18} />
                  {profile.location}
                </ContactItem>
              )}
              {profile.email && (
                <ContactItem>
                  <Mail size={18} />
                  {profile.email}
                </ContactItem>
              )}
              {profile.status && (
                <ContactItem>
                  <Calendar size={18} />
                  {profile.status}
                </ContactItem>
              )}
            </ContactInfo>

            {profile.links.length > 0 && (
              <SocialLinks>
                {profile.links.map(link => (
                  <SocialLink key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                    {linkIcon(link.label)}
                    {link.label}
                  </SocialLink>
                ))}
              </SocialLinks>
            )}
          </MainContent>
        </MainCardContent>
      </MainAboutCard>

      {/* Other About Content from JSON */}
      {aboutContent.length > 0 && (
        <>
          <SectionTitle>More About Me</SectionTitle>
          <PreviewCardsGrid>
            {aboutContent.map((item) => (
              <PreviewCard 
                key={item.id}
                onClick={() => onItemClick(item.id)}
              >
                <PreviewTitle>{item.title}</PreviewTitle>
                <PreviewText>
                  {createPreviewText(item.detail)}
                </PreviewText>
                
                {item.skills && item.skills.length > 0 && (
                  <SkillsPreview>
                    {item.skills.slice(0, 3).map((skill, index) => (
                      <SkillChip 
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSkillClick(skill);
                        }}
                      >
                        {skill}
                      </SkillChip>
                    ))}
                    {item.skills.length > 3 && (
                      <SkillChip>+{item.skills.length - 3} more</SkillChip>
                    )}
                  </SkillsPreview>
                )}
              </PreviewCard>
            ))}
          </PreviewCardsGrid>
        </>
      )}
    </AboutContainer>
  );
};

export default AboutPage;