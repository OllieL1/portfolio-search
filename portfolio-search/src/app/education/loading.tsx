"use client";

import styled from 'styled-components';
import { SkeletonBlock, SkeletonRow } from '../../components/Skeleton/styles';

const Container = styled.div`
  max-width: 1000px;
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
  margin-bottom: 2rem;
  margin-left: 1rem;
`;

export default function EducationLoading() {
  return (
    <Container>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <SkeletonBlock $width="45%" $height="2.5rem" $marginBottom="0.5rem" style={{ margin: '0 auto' }} />
        <SkeletonBlock $width="60%" $height="1rem" style={{ margin: '0 auto' }} />
      </div>

      <div style={{ paddingLeft: '2rem' }}>
        {/* Section header */}
        <SkeletonBlock $width="35%" $height="2rem" $marginBottom="2rem" />

        {[1, 2, 3].map(i => (
          <CardSkeleton key={i}>
            <SkeletonRow $gap="1rem" style={{ marginBottom: '1rem', justifyContent: 'space-between' }}>
              <SkeletonBlock $width="55%" $height="1.2rem" />
              <SkeletonBlock $width="60px" $height="1.5rem" $radius="16px" />
            </SkeletonRow>
            <SkeletonBlock $width="100%" $height="0.85rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="85%" $height="0.85rem" $marginBottom="1rem" />
            <SkeletonRow $gap="0.5rem" style={{ flexWrap: 'wrap' }}>
              <SkeletonBlock $width="50px" $height="1.4rem" $radius="8px" />
              <SkeletonBlock $width="65px" $height="1.4rem" $radius="8px" />
              <SkeletonBlock $width="55px" $height="1.4rem" $radius="8px" />
            </SkeletonRow>
          </CardSkeleton>
        ))}
      </div>
    </Container>
  );
}
