"use client";

import { useRouter } from 'next/navigation';
import ProjectsPage from '../../components/ProjectsPage';

export default function Projects() {
  const router = useRouter();

  const handleItemClick = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const handleSkillClick = (skill: string) => {
    router.push(`/skills/${encodeURIComponent(skill)}`);
  };

  return (
    <>
        <ProjectsPage 
          onItemClick={handleItemClick} 
          onSkillClick={handleSkillClick}
        />
    </>
  );
}