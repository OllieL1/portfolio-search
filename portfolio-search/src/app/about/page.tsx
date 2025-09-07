"use client";

import { useRouter } from 'next/navigation';
import AboutPage from '../../components/AboutPage';
import TabManager from '../../components/TabManager';
import { GlobalStyle } from '../../components/HomePage/GlobalStyles';

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
      <GlobalStyle />
      <TabManager>
        <AboutPage 
          onItemClick={handleItemClick} 
          onSkillClick={handleSkillClick}
        />
      </TabManager>
    </>
  );
}