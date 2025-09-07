"use client";

import { use } from 'react';
import { useRouter } from 'next/navigation';
import ContentPage from '../../../components/ContentPage';
import TabManager from '../../../components/TabManager';
import { GlobalStyle } from '../../../components/HomePage/GlobalStyles';

export default function Content({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const handleSkillClick = (skill: string) => {
    router.push(`/skills/${encodeURIComponent(skill)}`);
  };

  const handleBack = () => {
    router.back(); // Use browser back, or router.push('/') for home
  };

  return (
    <>
      <GlobalStyle />
      <TabManager>
        <ContentPage
          contentId={id}
          onSkillClick={handleSkillClick}
          onBack={handleBack}
        />
      </TabManager>
    </>
  );
}