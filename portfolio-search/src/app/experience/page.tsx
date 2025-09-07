"use client";

import { useRouter } from 'next/navigation';
import ExperiencePage from '../../components/ExperiencePage';
import TabManager from '../../components/TabManager';
import { GlobalStyle } from '../../components/HomePage/GlobalStyles';

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
      <GlobalStyle />
      <TabManager>
        <ExperiencePage 
          onItemClick={handleItemClick} 
          onSkillClick={handleSkillClick}
        />
      </TabManager>
    </>
  );
}