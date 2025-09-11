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
  ProfileImage,
  ProfileImageContainer
} from './styles';

interface AboutPageProps {
  onItemClick: (contentId: string) => void;
  onSkillClick?: (skill: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onItemClick, onSkillClick }) => {
  // Get about content from JSON for additional sections (excluding main about-me)
  const aboutContent = getContentByType('about')
    .filter(item => item.id !== 'about-me') // Exclude main about-me since we're hardcoding it
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

  // Format the main about content with proper line breaks
  const formatAboutText = (text: string) => {
    return text.split('\\n\\n').map((paragraph, index) => (
      <p key={index} style={{ marginBottom: '1rem' }}>
        {paragraph}
      </p>
    ));
  };

  const mainAboutText = "Hello! I'm delighted you have taken the time to visit my website. My name is Ollie Livingston and I am a 4th year Software Engineering student at the University of Glasgow, Scotland.\\n\\nCurrently, I am completing a year-long placement at JPMorganChase - a huge life change for me, and honestly one I am still getting used to.\\n\\nOutside of the office, I am very into my sport. If I'm not playing one of football, tennis, or badminton, I will likely be in the pub watching them. I am an avid cook - check out the Cooking page for some of my recommendations.\\n\\nI am unfortunately a West Ham fan which has only really resulted in one brief season of joy in my life so far - but I'm sure they've got one or two left in them!\\n\\nIn a brief summary of myself, I always push myself to be outgoing and friendly. I love meeting new people, hearing different perspectives, and exploring the world. Next destination for me is Hong Kong in January!\\n\\nI'm happy for a chat with anyone, work or non-work related - please feel free to reach out at oliverlivingston@iCloud.com or via LinkedIn.";

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
            
            <div style={{ lineHeight: '1.6' }}>
              {formatAboutText(mainAboutText)}
            </div>
            
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