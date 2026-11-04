"use client";

import { useAppRouter } from '../../hooks/useAppRouter';
import EducationPage from '../../components/EducationPage';

export default function Education() {
  const router = useAppRouter();

  const handleItemClick = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const handleSkillClick = (skill: string) => {
    router.push(`/skills/${encodeURIComponent(skill)}`);
  };

  return (
    <>
      <EducationPage 
        onItemClick={handleItemClick} 
        onSkillClick={handleSkillClick}
      />
    </>
  );
}