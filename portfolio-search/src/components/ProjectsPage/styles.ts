import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
  color: #202124;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #5f6368;
  margin: 0.5rem 0 0 0;
`;

export const ProjectsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const ProjectCard = styled.div`
  background: white;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 600px;
  
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-color: #1a73e8;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const ProjectInfo = styled.div`
  flex: 1;
`;

export const ProjectTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #202124;
  margin: 0 0 0.25rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Company = styled.div`
  font-size: 0.9rem;
  color: #5f6368;
  font-weight: 500;
`;

export const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #5f6368;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #3c4043;
  margin: 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const MoreSkills = styled.span`
  background: #f0f8ff;
  color: #4285f4;
  border: 1px solid #e6f3ff;
  border-radius: 12px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  font-style: italic;
`;

export const SkillTag = styled.span`
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

export const AwardBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #b8860b;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.5rem;
  box-shadow: 0 2px 4px rgba(255, 215, 0, 0.2);
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #5f6368;
`;