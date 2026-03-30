import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

export const SkeletonBlock = styled.div<{
  $width?: string;
  $height?: string;
  $radius?: string;
  $marginBottom?: string;
}>`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '1rem'};
  border-radius: ${props => props.$radius || '6px'};
  margin-bottom: ${props => props.$marginBottom || '0'};
  background: linear-gradient(
    90deg,
    var(--bg-subtle) 0%,
    var(--bg-hover) 40%,
    var(--bg-subtle) 80%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const SkeletonCircle = styled(SkeletonBlock)`
  border-radius: 50%;
  flex-shrink: 0;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SkeletonRow = styled.div<{ $gap?: string }>`
  display: flex;
  gap: ${props => props.$gap || '0.75rem'};
  align-items: center;
`;
