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
  border-bottom: 2px solid var(--border-light);

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
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-family: 'Roboto Slab', serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--accent-primary);
    color: var(--text-on-accent);
    border-color: var(--accent-primary);
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
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const PhotoCount = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
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
  background: var(--bg-subtle);
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
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.85rem;
  line-height: 1.4;
  font-weight: 500;
  border-top: 1px solid var(--border-light);

  @media (max-width: 768px) {
    display: block;
  }
`;
