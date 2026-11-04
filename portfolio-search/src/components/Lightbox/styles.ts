import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${fadeIn} 0.2s ease-out;
  }
`;

export const LightboxOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
`;

export const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1001;
`;

export const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  user-select: none;
  -webkit-user-drag: none;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const LightboxCaption = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
  padding: 0 2rem;
  line-height: 1.5;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    top: -60px;
    right: 10px;
    width: 44px;
    height: 44px;
  }
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

export const PrevButton = styled(NavigationButton)`
  left: -70px;

  @media (max-width: 768px) {
    left: 10px;
  }
`;

export const NextButton = styled(NavigationButton)`
  right: -70px;

  @media (max-width: 768px) {
    right: 10px;
  }
`;

export const LightboxCounter = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  margin-top: 0.4rem;
  font-variant-numeric: tabular-nums;
`;
