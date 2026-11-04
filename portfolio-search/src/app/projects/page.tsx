"use client";

import { useAppRouter } from '../../hooks/useAppRouter';
import ProjectsPage from '../../components/ProjectsPage';

export default function Projects() {
  const router = useAppRouter();

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