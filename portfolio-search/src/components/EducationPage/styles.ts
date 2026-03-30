import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  animation: pageEnter 0.3s ease-out;

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
    color: var(--text-primary);
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
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
  background: linear-gradient(180deg, var(--accent-secondary) 0%, var(--accent-green) 100%);
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
    color: var(--text-heading);
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
  border: 3px solid var(--timeline-dot-border);
  box-shadow: 0 0 0 3px ${props => props.$color}20;
  z-index: 2;

  @media (max-width: 768px) {
    left: -21px;
    width: 10px;
    height: 10px;
  }
`;

export const CourseCard = styled.div`
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-default);
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
  color: var(--text-heading);
  margin: 0;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const GradeTag = styled.span`
  background: var(--bg-tag-grade);
  color: var(--accent-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const CourseDescription = styled.p`
  color: var(--text-secondary);
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
  background: var(--bg-subtle);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-tag-grade);
    color: var(--accent-secondary);
  }
`;

export const ExternalLinkContainer = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--accent-secondary);
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
  background: var(--bg-subtle);
  border-radius: 8px;
  border-left: 4px solid var(--border-default);

  p {
    color: var(--text-secondary);
    font-style: italic;
    margin: 0;
  }

  @media (max-width: 768px) {
    margin-left: 1rem;
    padding: 1rem;
  }
`;
