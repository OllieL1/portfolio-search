"use client";

import { useRouter } from 'next/navigation';
import AboutPage from '../../components/AboutPage';

export default function About() {
  const router = useRouter();

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