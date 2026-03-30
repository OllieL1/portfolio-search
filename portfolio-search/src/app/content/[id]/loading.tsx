"use client";

import { PageContainer, PageContent } from '../../../components/PageLayout/styles';
import { SkeletonBlock, SkeletonRow } from '../../../components/Skeleton/styles';

export default function ContentLoading() {
  return (
    <PageContainer>
      <PageContent>
        {/* Title */}
        <SkeletonBlock $width="75%" $height="2rem" $marginBottom="0.75rem" />
        {/* Company */}
        <SkeletonBlock $width="40%" $height="1.25rem" $marginBottom="0.5rem" />
        {/* Date + buttons row */}
        <SkeletonRow $gap="1rem" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border-light)' }}>
          <SkeletonBlock $width="30%" $height="1rem" />
          <SkeletonBlock $width="120px" $height="2rem" $radius="6px" />
        </SkeletonRow>

        {/* Section title */}
        <SkeletonBlock $width="35%" $height="1.25rem" $marginBottom="1rem" />
        {/* Detail text lines */}
        <SkeletonBlock $width="100%" $height="0.9rem" $marginBottom="0.75rem" />
        <SkeletonBlock $width="100%" $height="0.9rem" $marginBottom="0.75rem" />
        <SkeletonBlock $width="95%" $height="0.9rem" $marginBottom="0.75rem" />
        <SkeletonBlock $width="100%" $height="0.9rem" $marginBottom="0.75rem" />
        <SkeletonBlock $width="88%" $height="0.9rem" $marginBottom="0.75rem" />
        <SkeletonBlock $width="70%" $height="0.9rem" $marginBottom="2rem" />

        {/* Skills section title */}
        <SkeletonBlock $width="30%" $height="1.25rem" $marginBottom="1rem" />
        {/* Skill tags */}
        <SkeletonRow $gap="0.75rem" style={{ flexWrap: 'wrap' }}>
          <SkeletonBlock $width="80px" $height="2rem" $radius="20px" />
          <SkeletonBlock $width="100px" $height="2rem" $radius="20px" />
          <SkeletonBlock $width="70px" $height="2rem" $radius="20px" />
          <SkeletonBlock $width="90px" $height="2rem" $radius="20px" />
          <SkeletonBlock $width="110px" $height="2rem" $radius="20px" />
          <SkeletonBlock $width="75px" $height="2rem" $radius="20px" />
        </SkeletonRow>
      </PageContent>
    </PageContainer>
  );
}
