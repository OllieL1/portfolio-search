"use client";

import { useRouter } from 'next/navigation';
import EducationPage from '../../components/EducationPage';

export default function Education() {
  const router = useRouter();

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