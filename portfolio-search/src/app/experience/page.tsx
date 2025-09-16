"use client";

import { useRouter } from 'next/navigation';
import ExperiencePage from '../../components/ExperiencePage';

export default function Experience() {
  const router = useRouter();

  const handleItemClick = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const handleSkillClick = (skill: string) => {
    router.push(`/skills/${encodeURIComponent(skill)}`);
  };

  return (
    <>
      <ExperiencePage 
        onItemClick={handleItemClick} 
        onSkillClick={handleSkillClick}
      />
    </>
  );
}