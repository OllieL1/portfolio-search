"use client";

import styled from 'styled-components';
import { SkeletonBlock, SkeletonRow } from '../../../components/Skeleton/styles';

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
  border-radius: 8px;
  padding: 1.25rem;
`;

export default function SkillsLoading() {
  return (
    <Container>
      {/* Back button */}
      <SkeletonBlock $width="100px" $height="2.5rem" $radius="8px" $marginBottom="2rem" />

      {/* Header */}
      <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border-light)' }}>
        <SkeletonBlock $width="50%" $height="1.75rem" $marginBottom="0.5rem" />
        <SkeletonBlock $width="20%" $height="0.95rem" />
      </div>

      {/* Result cards */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {[1, 2, 3, 4].map(i => (
          <CardSkeleton key={i}>
            <SkeletonRow $gap="1rem" style={{ marginBottom: '0.5rem', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <SkeletonBlock $width="45%" $height="1.125rem" $marginBottom="0.25rem" />
                <SkeletonBlock $width="30%" $height="0.9rem" />
              </div>
              <SkeletonBlock $width="50px" $height="1.5rem" $radius="12px" />
            </SkeletonRow>
            <SkeletonBlock $width="100%" $height="0.8rem" $marginBottom="0.4rem" />
            <SkeletonBlock $width="85%" $height="0.8rem" />
          </CardSkeleton>
        ))}
      </div>
    </Container>
  );
}
