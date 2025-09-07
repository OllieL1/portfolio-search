import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  CardContainer,
  CardHeader,
  HeaderBottom,
  Title,
  Company,
  DateRange,
  DetailSection,
  SectionTitle,
  DetailText,
  SkillsSection,
  SkillsContainer,
  SkillTag,
  ExternalLinkButton
} from './styles';

interface ExperienceCardProps {
  title: string;
  company: string;
  dateRange: string;
  detail: string;
  skills: string[];
  link?: {
    url: string;
    label: string;
  };
  onSkillClick?: (skill: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  dateRange,
  detail,
  skills,
  link,
  onSkillClick
}) => {
  const handleSkillClick = (skill: string) => {
    if (onSkillClick) {
      onSkillClick(skill);
    } else {
      console.log(`Search for skill: ${skill}`);
    }
  };

  return (
    <CardContainer>
      <CardHeader>
        <Title>{title}</Title>
        <Company>{company}</Company>
        <HeaderBottom>
          <DateRange>{dateRange}</DateRange>
          {link && (
            <ExternalLinkButton
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <ExternalLink size={14} className="icon" />
            </ExternalLinkButton>
          )}
        </HeaderBottom>
      </CardHeader>

      <DetailSection>
        <SectionTitle>About the Role</SectionTitle>
        <DetailText>{detail}</DetailText>
      </DetailSection>

      <SkillsSection>
        <SectionTitle>Skills Gained</SectionTitle>
        <SkillsContainer>
          {skills.map((skill, index) => (
            <SkillTag 
              key={index} 
              onClick={() => handleSkillClick(skill)}
            >
              {skill}
            </SkillTag>
          ))}
        </SkillsContainer>
      </SkillsSection>
    </CardContainer>
  );
};

export default ExperienceCard;