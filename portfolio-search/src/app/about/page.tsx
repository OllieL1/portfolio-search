"use client";

import { useAppRouter } from '../../hooks/useAppRouter';
import AboutPage from '../../components/AboutPage';

export default function About() {
  const router = useAppRouter();

  const handleItemClick = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const handleSkillClick = (skill: string) => {
    router.push(`/skills/${encodeURIComponent(skill)}`);
  };

  return (
    <>
        <AboutPage 
          onItemClick={handleItemClick} 
          onSkillClick={handleSkillClick}
        />
    </>
  );
}