import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ArrowUpRight, Briefcase, Code, GraduationCap, User } from 'lucide-react';
import { ContentItem } from '../../types/content';
import { getCoverImage } from '../../utils/contentUtils';

interface FeaturedWorkProps {
  items: ContentItem[];
  onSelect: (id: string) => void;
}

const rise = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  width: 100%;
  max-width: 880px;
  margin-top: 1rem;
`;

const Heading = styled.h2`
  font-family: var(--font-body), sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  text-align: center;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.button<{ $index: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${rise} 0.5s ease-out both;
    animation-delay: ${({ $index }) => 0.1 + $index * 0.08}s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-primary);
  }

  &:hover img {
    transform: scale(1.04);
  }

  &:hover .arrow {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const Cover = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-subtle);

  @media (max-width: 600px) {
    aspect-ratio: 2 / 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
    transition: transform 0.4s ease;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-accent);
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.25), transparent 45%),
    linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-purple) 100%);

  svg {
    opacity: 0.9;
  }
`;

const Body = styled.div`
  padding: 0.85rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Category = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-primary);
`;

const CardTitle = styled.span`
  font-family: var(--font-heading), serif;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-heading);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Company = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const Arrow = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 20, 0.6);
  color: #fff;
  backdrop-filter: blur(6px);
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.25s ease, transform 0.25s ease;

  @media (hover: none) {
    display: none;
  }
`;

const ICONS: Record<string, React.ReactNode> = {
  project: <Code size={40} />,
  experience: <Briefcase size={40} />,
  education: <GraduationCap size={40} />,
  about: <User size={40} />,
};

const FeaturedWork: React.FC<FeaturedWorkProps> = ({ items, onSelect }) => {
  if (items.length === 0) return null;

  return (
    <Section aria-labelledby="featured-heading">
      <Heading id="featured-heading">Featured</Heading>
      <Grid>
        {items.map((item, index) => {
          const cover = getCoverImage(item);
          return (
            <Card key={item.id} $index={index} onClick={() => onSelect(item.id)}>
              <Cover>
                {cover ? (
                  <img src={cover} alt="" loading="lazy" width={480} height={300} />
                ) : (
                  <Placeholder>{ICONS[item.type] ?? <Code size={40} />}</Placeholder>
                )}
                <Arrow className="arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </Arrow>
              </Cover>
              <Body>
                <Category>{item.category}</Category>
                <CardTitle>{item.title}</CardTitle>
                <Company>{item.company}</Company>
              </Body>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
};

export default FeaturedWork;
