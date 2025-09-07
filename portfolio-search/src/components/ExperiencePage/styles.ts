import styled from 'styled-components';

export const ExperienceContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ExperienceHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const ExperienceTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ExperienceSubtitle = styled.p`
  font-size: 1.125rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const YearSection = styled.section`
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const YearHeading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #4285f4;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #4285f4;
  position: sticky;
  top: 0;
  background: #f5f5dc;
  z-index: 10;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

export const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const ExperienceCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  height: 280px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-color: #4285f4;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #4285f4;
    border-radius: 4px 0 0 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    height: 240px;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 0.75rem;
  flex-shrink: 0;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  line-height: 1.3;
`;

export const CardCompany = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #4285f4;
  margin-bottom: 0.5rem;
`;

export const CardDateSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const CardDate = styled.div`
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
`;

export const ExternalLinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-family: 'Roboto Slab', serif;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 4px rgba(66, 133, 244, 0.2);
  white-space: nowrap;
  
  &:hover {
    background: #3367d6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .icon {
    transition: transform 0.2s;
  }
  
  &:hover .icon {
    transform: translateX(2px);
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;

export const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 0.75rem;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    -webkit-line-clamp: 3;
    margin-bottom: 0.5rem;
  }
`;

export const CardSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
  
  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const SkillChip = styled.span`
  background: #f0f8ff;
  color: #4285f4;
  border: 1px solid #e6f3ff;
  border-radius: 12px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #4285f4;
    color: white;
    transform: translateY(-1px);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const EmptyStateText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;