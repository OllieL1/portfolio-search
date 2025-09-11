import React from 'react';
import { getContentById } from '../../utils/contentUtils';
import PageLayout from '../PageLayout';
import ExperienceCard from '../ExperienceCard';

interface ContentPageProps {
  contentId: string;
  onBack?: () => void;
  onSkillClick?: (skill: string) => void;
}

// Helper function to format date range
const formatDateRange = (startDate: string | null, endDate: string | null | undefined): string => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Handle case where startDate is null
  if (!startDate) {
    return '';
  }

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
};

const ContentPage: React.FC<ContentPageProps> = ({
  contentId,
  onBack,
  onSkillClick
}) => {
  const content = getContentById(contentId);

  if (!content) {
    return (
      <PageLayout onBack={onBack}>
        <div>Content not found</div>
      </PageLayout>
    );
  }

  const handleSkillClick = (skill: string) => {
    if (onSkillClick) {
      onSkillClick(skill);
    } else {
      console.log(`Navigate to search results for: ${skill}`);
      // TODO: Navigate to search results page filtered by this skill
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      console.log('Navigate back to home or previous page');
      // TODO: Implement navigation back
    }
  };

  // Determine what to display for date range
  const getDisplayDateRange = () => {
    // If dateRange property exists and is not null/empty, use it as a label
    if (content.dateRange && content.dateRange.trim() !== '') {
      return content.dateRange;
    }
    // Otherwise, format the startDate and endDate
    return formatDateRange(content.startDate, content.endDate);
  };

  const displayDateRange = getDisplayDateRange();

  return (
    <PageLayout onBack={handleBack}>
      <ExperienceCard
        title={content.title}
        company={content.company}
        dateRange={displayDateRange || ''} // Pass empty string instead of undefined
        detail={content.detail}
        skills={content.skills}
        link={content.link}
        photos={content.photos}
        contentId={contentId}
        onSkillClick={handleSkillClick}
      />
    </PageLayout>
  );
};

export default ContentPage;