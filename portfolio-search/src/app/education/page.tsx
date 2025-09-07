"use client";

import { useRouter } from 'next/navigation';
import EducationPage from '../../components/EducationPage';
import TabManager from '../../components/TabManager';
import { GlobalStyle } from '../../components/HomePage/GlobalStyles';

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
      <GlobalStyle />
      <TabManager>
        <EducationPage 
          onItemClick={handleItemClick} 
          onSkillClick={handleSkillClick}
        />
      </TabManager>
    </>
  );
}