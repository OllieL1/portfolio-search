import React from 'react';
import { getContentById } from '../../utils/contentUtils';
import PageLayout from '../PageLayout';
import ExperienceCard from '../ExperienceCard'; 

interface ContentPageProps {
  contentId: string;
  onBack?: () => void;
  onSkillClick?: (skill: string) => void;
}

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

  return (
    <PageLayout onBack={handleBack}>
      <ExperienceCard
        title={content.title}
        company={content.company}
        dateRange={content.dateRange || ''} // Provide empty string as fallback
        detail={content.detail}
        skills={content.skills}
        link={content.link}
        onSkillClick={handleSkillClick}
      />
    </PageLayout>
  );
};

export default ContentPage;