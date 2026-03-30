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
`;

export default function SearchLoading() {
  return (
    <Container>
      {/* Back button */}
      <SkeletonBlock $width="100px" $height="2.5rem" $radius="8px" $marginBottom="2rem" />

      {/* Header */}
      <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border-light)' }}>
        <SkeletonBlock $width="55%" $height="1.75rem" $marginBottom="0.5rem" />
        <SkeletonBlock $width="25%" $height="0.95rem" />
      </div>

      {/* Result cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[1, 2, 3].map(i => (
          <CardSkeleton key={i}>
            <SkeletonBlock $width="50%" $height="1.25rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="30%" $height="1rem" $marginBottom="0.75rem" />
            <SkeletonBlock $width="100%" $height="0.85rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="90%" $height="0.85rem" $marginBottom="1rem" />
            <SkeletonRow $gap="0.5rem" style={{ flexWrap: 'wrap' }}>
              <SkeletonBlock $width="60px" $height="1.5rem" $radius="16px" />
              <SkeletonBlock $width="75px" $height="1.5rem" $radius="16px" />
              <SkeletonBlock $width="55px" $height="1.5rem" $radius="16px" />
            </SkeletonRow>
          </CardSkeleton>
        ))}
      </div>
    </Container>
  );
}
