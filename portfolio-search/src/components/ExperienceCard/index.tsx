import React, { useState } from 'react';
import { ExternalLink, Camera } from 'lucide-react';
import PhotoGallery from '../PhotoGallery';
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
  ExternalLinkButton,
  PhotoGalleryButton
} from './styles';

interface PhotoGalleryItem {
  caption: string;
  filename: string;
}

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
  photos?: PhotoGalleryItem[];
  contentId?: string;
  onSkillClick?: (skill: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  dateRange,
  detail,
  skills,
  link,
  photos,
  contentId,
  onSkillClick
}) => {
  const [showGallery, setShowGallery] = useState(false);

  const handleSkillClick = (skill: string) => {
    if (onSkillClick) {
      onSkillClick(skill);
    } else {
      console.log(`Search for skill: ${skill}`);
    }
  };

  // Function to render text with line breaks
  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleOpenGallery = () => {
    setShowGallery(true);
  };

  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  if (showGallery && photos && contentId) {
    return (
      <PhotoGallery
        photos={photos}
        contentId={contentId}
        title={title}
        onBack={handleCloseGallery}
      />
    );
  }

  return (
    <CardContainer>
      <CardHeader>
        <Title>{title}</Title>
        <Company>{company}</Company>
        <HeaderBottom>
          {dateRange && <DateRange>{dateRange}</DateRange>}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {photos && photos.length > 0 && (
              <PhotoGalleryButton onClick={handleOpenGallery}>
                <Camera size={14} className="icon" />
                View Photos ({photos.length})
              </PhotoGalleryButton>
            )}
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
          </div>
        </HeaderBottom>
      </CardHeader>

      <DetailSection>
        <SectionTitle>About the Role</SectionTitle>
        <DetailText>{renderTextWithLineBreaks(detail)}</DetailText>
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