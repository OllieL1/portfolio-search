import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #5f6368;
    margin-top: 0.5rem;
  }
`;

export const TimelineContainer = styled.div`
  position: relative;
  padding-left: 2rem;
  
  @media (max-width: 768px) {
    padding-left: 1rem;
  }
`;

export const TimelineLine = styled.div`
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #1a73e8 0%, #34a853 100%);
  border-radius: 2px;
  
  @media (max-width: 768px) {
    left: 10px;
    width: 2px;
  }
`;

export const Section = styled.div<{ $isActive: boolean }>`
  margin-bottom: 4rem;
  transition: all 0.3s ease;
  opacity: ${props => props.$isActive ? 1 : 0.7};
  transform: ${props => props.$isActive ? 'translateX(0)' : 'translateX(-5px)'};
`;

export const SectionHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 2rem;
    font-weight: 400;
    color: ${props => props.$color};
    margin: 0;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  .icon {
    color: ${props => props.$color};
  }
`;

export const YearSection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    color: #202124;
    margin-bottom: 1rem;
    padding-left: 2rem;
    
    @media (max-width: 768px) {
      padding-left: 1rem;
      font-size: 1.2rem;
    }
  }
`;

export const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

export const TimelineDot = styled.div<{ $color: string }>`
  position: absolute;
  left: -26px;
  top: 1rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  border: 3px solid white;
  box-shadow: 0 0 0 3px ${props => props.$color}20;
  z-index: 2;
  
  @media (max-width: 768px) {
    left: -21px;
    width: 10px;
    height: 10px;
  }
`;

export const CourseCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8eaed;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const CourseHeader = styled.div`
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

export const CourseTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 500;
  color: #202124;
  margin: 0;
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const GradeTag = styled.span`
  background: #e8f0fe;
  color: #1a73e8;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const CourseDescription = styled.p`
  color: #5f6368;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
`;

export const SkillTag = styled.span`
  background: #f8f9fa;
  color: #5f6368;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e8f0fe;
    color: #1a73e8;
  }
`;

export const ExternalLinkContainer = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #1a73e8;
    text-decoration: none;
    font-size: 0.875rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const EmptyYearMessage = styled.div`
  margin-left: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #e0e0e0;
  
  p {
    color: #5f6368;
    font-style: italic;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    margin-left: 1rem;
    padding: 1rem;
  }
`;