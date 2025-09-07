"use client";

import { useRouter } from 'next/navigation';
import ProjectsPage from '../../components/ProjectsPage';
import TabManager from '../../components/TabManager';
import { GlobalStyle } from '../../components/HomePage/GlobalStyles';

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
      <GlobalStyle />
      <TabManager>
        <ProjectsPage 
          onItemClick={handleItemClick} 
          onSkillClick={handleSkillClick}
        />
      </TabManager>
    </>
  );
}