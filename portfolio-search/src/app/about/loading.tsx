"use client";

import styled from 'styled-components';
import { SkeletonBlock, SkeletonCircle, SkeletonRow } from '../../components/Skeleton/styles';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const PreviewCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: 1.5rem;
`;

export default function AboutLoading() {
  return (
    <Container>
      <MainCard>
        <SkeletonRow $gap="3rem" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <SkeletonBlock $width="60%" $height="3rem" $marginBottom="1rem" />
            <SkeletonBlock $width="80%" $height="1rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="70%" $height="1rem" $marginBottom="2rem" />
            <SkeletonRow $gap="2rem" style={{ marginBottom: '1.5rem' }}>
              <SkeletonBlock $width="120px" $height="1rem" />
              <SkeletonBlock $width="140px" $height="1rem" />
            </SkeletonRow>
            <SkeletonRow $gap="1rem">
              <SkeletonBlock $width="120px" $height="2.5rem" $radius="8px" />
              <SkeletonBlock $width="110px" $height="2.5rem" $radius="8px" />
            </SkeletonRow>
          </div>
          <SkeletonCircle $width="180px" $height="180px" />
        </SkeletonRow>
      </MainCard>

      <SkeletonBlock $width="30%" $height="1.8rem" $marginBottom="1.5rem" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {[1, 2, 3].map(i => (
          <PreviewCard key={i}>
            <SkeletonBlock $width="50%" $height="1.1rem" $marginBottom="0.75rem" />
            <SkeletonBlock $width="100%" $height="0.85rem" $marginBottom="0.5rem" />
            <SkeletonBlock $width="85%" $height="0.85rem" $marginBottom="1rem" />
            <SkeletonRow $gap="0.5rem">
              <SkeletonBlock $width="55px" $height="1.4rem" $radius="20px" />
              <SkeletonBlock $width="70px" $height="1.4rem" $radius="20px" />
              <SkeletonBlock $width="60px" $height="1.4rem" $radius="20px" />
            </SkeletonRow>
          </PreviewCard>
        ))}
      </div>
    </Container>
  );
}
