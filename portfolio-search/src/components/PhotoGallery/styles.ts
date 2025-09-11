import styled from 'styled-components';

export const GalleryContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-family: 'Roboto Slab', serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #4285f4;
    color: white;
    border-color: #4285f4;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const PhotoCount = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 400;
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export const PhotoItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #f8f9fa;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  @media (min-width: 769px) {
    &:hover .overlay {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    
    &:hover {
      transform: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
  
  ${PhotoItem}:hover & {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: var(--aspect-ratio);
    object-fit: cover;
    
    &[data-orientation="landscape"] {
      aspect-ratio: 16/9;
      max-height: 225px;
    }
    
    &[data-orientation="portrait"] {
      aspect-ratio: 4/5;
      max-height: 320px;
    }
    
    &[data-orientation="square"] {
      aspect-ratio: 1/1;
      max-height: 320px;
    }
    
    ${PhotoItem}:hover & {
      transform: none;
    }
  }
`;

export const PhotoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  span {
    color: white;
    font-weight: 500;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.4;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileCaption = styled.div`
  display: none;
  padding: 0.75rem 1rem;
  background: white;
  color: #333;
  font-size: 0.85rem;
  line-height: 1.4;
  font-weight: 500;
  border-top: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    display: block;
  }
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