"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExperiencePage from '../../components/ExperiencePage';

export default function Experience() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/content/placeholder');
    router.prefetch('/skills/placeholder');
  }, [router]);

  const handleItemClick = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  const handleSkillClick = (skill: string) => {
    router.push(`/skills/${encodeURIComponent(skill)}`);
  };

  return (
    <>
      <ExperiencePage
        onItemClick={handleItemClick}
        onSkillClick={handleSkillClick}
      />
    </>
  );
}