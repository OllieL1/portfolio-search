"use client";

import { useRouter } from 'next/navigation';
import { getContentBySkill } from '../../../utils/contentUtils';
import SkillsResults from '../../../components/SkillsResults';
import TabManager from '../../../components/TabManager';
import { GlobalStyle } from '../../../components/HomePage/GlobalStyles';

export default function Skills({ params }: { params: { skill: string } }) {
  const router = useRouter();
  
  // Decode the skill parameter from the URL
  const skill = decodeURIComponent(params.skill);
  
  // Get content items that have this skill
  const results = getContentBySkill(skill);

  const handleResultClick = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const handleBack = () => {
    router.back(); // Use browser back, or router.push('/') for home
  };

  return (
    <>
      <GlobalStyle />
      <TabManager>
        <SkillsResults
          skill={skill}
          results={results}
          onResultClick={handleResultClick}
          onBack={handleBack}
        />
      </TabManager>
    </>
  );
}