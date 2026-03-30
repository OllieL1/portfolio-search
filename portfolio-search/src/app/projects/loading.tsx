"use client";

import styled from 'styled-components';
import { SkeletonBlock, SkeletonRow } from '../../components/Skeleton/styles';

const Container = styled.div`
  max-width: 1200px;
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
  padding: 1.5rem;
  width: 100%;
  max-width: 600px;
`;

export default function ProjectsLoading() {
  return (
    <Container>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <SkeletonBlock $width="40%" $height="2.5rem" $marginBottom="0.5rem" style={{ margin: '0 auto' }} />
        <SkeletonBlock $width="55%" $height="1rem" style={{ margin: '0 auto' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {[1, 2, 3, 4].map(i => (
          <CardSkeleton key={i}>
            <SkeletonBlock $width="55%" $height="1.5rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="30%" $height="0.9rem" $marginBottom="1rem" />
            <SkeletonBlock $width="100%" $height="0.85rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="95%" $height="0.85rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="70%" $height="0.85rem" $marginBottom="1rem" />
            <SkeletonRow $gap="0.5rem" style={{ flexWrap: 'wrap' }}>
              <SkeletonBlock $width="55px" $height="1.5rem" $radius="12px" />
              <SkeletonBlock $width="70px" $height="1.5rem" $radius="12px" />
              <SkeletonBlock $width="50px" $height="1.5rem" $radius="12px" />
            </SkeletonRow>
          </CardSkeleton>
        ))}
      </div>
    </Container>
  );
}
