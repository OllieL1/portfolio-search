import React from 'react';
import { MapPin, Mail, Linkedin, Github, Calendar } from 'lucide-react';
import { getContentByType } from '../../utils/contentUtils';
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
  EmptyState,
  ProfileImage,
  ProfileImageContainer
} from './styles';

interface AboutPageProps {
  onItemClick: (contentId: string) => void;
  onSkillClick?: (skill: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onItemClick, onSkillClick }) => {
  // Get about content, sorted by relevance
  const aboutContent = getContentByType('about').sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
  
  // Find the main "About Me" content (highest relevance)
  const mainAbout = aboutContent.find(item => item.id === 'about-me') || aboutContent[0];
  
  // Get other about content for preview cards
  const otherAboutContent = aboutContent.filter(item => item.id !== mainAbout?.id);
  
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

  if (!mainAbout) {
    return (
      <AboutContainer>
        <EmptyState>
          <h2>About content not found</h2>
          <p>About me information will appear here once added.</p>
        </EmptyState>
      </AboutContainer>
    );
  }

  return (
    <AboutContainer>
      {/* Main About Me Card */}
      <MainAboutCard>
        <MainCardContent>
          <ProfileImageContainer>
            <ProfileImage 
              src="/portfolio-pfp.jpg" 
              alt="Ollie Livingston" 
            />
          </ProfileImageContainer>
          
          <MainContent>
            <MainTitle>Ollie Livingston</MainTitle>
            <MainSubtitle>
              4th Year Software Engineering Student & Industrial Placement Software Engineer
            </MainSubtitle>
            
            <div>{mainAbout.detail}</div>
            
            <ContactInfo>
              <ContactItem>
                <MapPin size={18} />
                Glasgow, Scotland
              </ContactItem>
              <ContactItem>
                <Mail size={18} />
                oliverlivingston@icloud.com
              </ContactItem>
              <ContactItem>
                <Calendar size={18} />
                Available for Summer 2026 opportunities
              </ContactItem>
            </ContactInfo>
            
            <SocialLinks>
              <SocialLink href="https://linkedin.com/in/ollie-wl" target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} />
                LinkedIn
              </SocialLink>
              <SocialLink href="https://github.com/OllieL1" target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                GitHub
              </SocialLink>
            </SocialLinks>
          </MainContent>
        </MainCardContent>
      </MainAboutCard>

      {/* Other About Content */}
      {otherAboutContent.length > 0 && (
        <>
          <SectionTitle>More About Me</SectionTitle>
          <PreviewCardsGrid>
            {otherAboutContent.map((item) => (
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