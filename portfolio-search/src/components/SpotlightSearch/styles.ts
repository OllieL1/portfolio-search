import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 18vh;
  animation: ${fadeIn} 0.15s ease-out;

  @media (max-width: 768px) {
    padding-top: 8vh;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const SpotlightContainer = styled.div`
  width: 100%;
  max-width: 640px;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  box-shadow:
    var(--shadow-lg),
    0 0 0 1px var(--border-subtle),
    0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: ${slideUp} 0.2s ease-out;

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 12px;
  }
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  gap: 0.75rem;
  border-bottom: 1px solid var(--border-light);
`;

export const SearchIconWrapper = styled.div`
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const SpotlightInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.125rem;
  font-family: inherit;
  color: var(--text-primary);
  outline: none;
  min-width: 0;

  &::placeholder {
    color: var(--text-tertiary);
  }
`;

export const EscHint = styled.button`
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  font-family: inherit;
  color: var(--text-tertiary);
  cursor: pointer;
  flex-shrink: 0;
  letter-spacing: 0.02em;
  transition: all 0.15s;

  &:hover {
    color: var(--text-secondary);
    background: var(--bg-hover);
  }
`;

export const ResultsList = styled.div`
  max-height: 380px;
  overflow-y: auto;
  padding: 0.5rem;

  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 3px;
  }
`;

export const SectionLabel = styled.div`
  padding: 0.5rem 0.75rem 0.25rem;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const ResultItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.08s ease;
  background: ${({ $active }) => ($active ? 'var(--accent-primary)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--text-on-accent)' : 'var(--text-primary)')};

  &:hover {
    background: ${({ $active }) =>
      $active ? 'var(--accent-primary-hover)' : 'var(--bg-hover)'};
  }
`;

export const ResultIcon = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  flex-shrink: 0;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-subtle)'};
  color: ${({ $active }) =>
    $active ? 'var(--text-on-accent)' : 'var(--text-secondary)'};
  transition: all 0.08s ease;
`;

export const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const ResultTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
`;

export const ResultSubtitle = styled.span`
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  opacity: 0.65;
`;

export const ResultAction = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: inherit;
  opacity: 0.5;
`;

export const NoResults = styled.div`
  padding: 2.5rem 1rem;
  text-align: center;
  color: var(--text-tertiary);
  font-size: 0.9rem;
`;

export const FooterHints = styled.div`
  padding: 0.5rem 1rem;
  border-top: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.65rem;
  color: var(--text-tertiary);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FooterHintItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const FooterKbd = styled.kbd`
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-radius: 4px;
  padding: 0.1rem 0.3rem;
  font-size: 0.6rem;
  font-family: inherit;
  color: var(--text-tertiary);
  line-height: 1.2;
`;
