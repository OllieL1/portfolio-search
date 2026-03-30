"use client";

import styled from 'styled-components';
import { SkeletonBlock, SkeletonRow } from '../../components/Skeleton/styles';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CardSkeleton = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: 1.5rem;
  height: 280px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 240px;
  }
`;

export default function ExperienceLoading() {
  return (
    <Container>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <SkeletonBlock $width="50%" $height="2.5rem" $marginBottom="0.5rem" style={{ margin: '0 auto' }} />
        <SkeletonBlock $width="70%" $height="1rem" style={{ margin: '0 auto' }} />
      </div>

      {/* Year heading */}
      <SkeletonBlock $width="80px" $height="2rem" $marginBottom="1.5rem" />

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[1, 2, 3].map(i => (
          <CardSkeleton key={i}>
            <SkeletonBlock $width="60%" $height="1.25rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="35%" $height="1rem" $marginBottom="0.75rem" />
            <SkeletonBlock $width="25%" $height="0.875rem" $marginBottom="1rem" />
            <SkeletonBlock $width="100%" $height="0.85rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="90%" $height="0.85rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="80%" $height="0.85rem" $marginBottom="auto" />
            <SkeletonRow $gap="0.4rem" style={{ flexWrap: 'wrap' }}>
              <SkeletonBlock $width="60px" $height="1.5rem" $radius="12px" />
              <SkeletonBlock $width="75px" $height="1.5rem" $radius="12px" />
              <SkeletonBlock $width="50px" $height="1.5rem" $radius="12px" />
              <SkeletonBlock $width="65px" $height="1.5rem" $radius="12px" />
            </SkeletonRow>
          </CardSkeleton>
        ))}
      </div>
    </Container>
  );
}
