"use client";

import { useRouter } from 'next/navigation';
import ContentPage from '../../../components/ContentPage';

export default function ContentClient({ id }: { id: string }) {
  const router = useRouter();

  const handleSkillClick = (skill: string) => {
    router.push(`/skills/${encodeURIComponent(skill)}`);
  };

  const handleBack = () => {
    router.back(); // Use browser back, or router.push('/') for home
  };

  return (
    <>
        <ContentPage
          contentId={id}
          onSkillClick={handleSkillClick}
          onBack={handleBack}
        />
    </>
  );
}