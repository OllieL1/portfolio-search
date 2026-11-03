import React, { useState } from 'react';
import { ExternalLink, Camera } from 'lucide-react';
import PhotoGallery from '../PhotoGallery';
import ScreenshotShowcase from '../ScreenshotShowcase';
import RichText from './RichText';
import {
  CardContainer,
  CardHeader,
  HeaderBottom,
  ActionRow,
  Title,
  Company,
  DateRange,
  DetailSection,
  SectionTitle,
  DetailText,
  VideoSection,
  VideoPlayer,
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
  screenshots?: PhotoGalleryItem[];
  video?: string;
  contentId?: string;
  type?: string;
  onSkillClick?: (skill: string) => void;
}

const SECTION_LABELS: Record<string, { detail: string; skills: string }> = {
  experience: { detail: 'About the Role', skills: 'Skills Gained' },
  project: { detail: 'Overview', skills: 'Built With' },
  education: { detail: 'About the Course', skills: 'Skills Gained' },
  about: { detail: 'About', skills: 'Related Skills' },
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  dateRange,
  detail,
  skills,
  link,
  photos,
  screenshots,
  video,
  contentId,
  type,
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

  const labels = SECTION_LABELS[type ?? ''] ?? SECTION_LABELS.experience;

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
          <ActionRow>
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
          </ActionRow>
        </HeaderBottom>
      </CardHeader>

      <DetailSection>
        <SectionTitle>{labels.detail}</SectionTitle>
        <DetailText><RichText text={detail} /></DetailText>
      </DetailSection>

      {screenshots && screenshots.length > 0 && contentId && (
        <VideoSection>
          <SectionTitle>Screenshots</SectionTitle>
          <ScreenshotShowcase screenshots={screenshots} contentId={contentId} />
        </VideoSection>
      )}

      {video && (
        <VideoSection>
          <SectionTitle>Demo</SectionTitle>
          <VideoPlayer
            controls
            playsInline
            preload="metadata"
            src={`/content/videos/${video}`}
          />
        </VideoSection>
      )}

      <SkillsSection>
        <SectionTitle>{labels.skills}</SectionTitle>
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