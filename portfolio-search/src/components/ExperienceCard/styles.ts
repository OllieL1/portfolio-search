import styled from 'styled-components';

export const CardContainer = styled.article`
  margin-bottom: 2rem;
`;

export const CardHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

export const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Company = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: #4285f4;
  margin-bottom: 0.5rem;
`;

export const DateRange = styled.div`
  font-size: 0.95rem;
  color: #666;
  font-weight: 400;
  flex: 1;
`;

export const DetailSection = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

export const DetailText = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #444;
  margin-bottom: 1.5rem;
`;

export const SkillsSection = styled.section`
  margin-top: 2rem;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const SkillTag = styled.button`
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-family: 'Roboto Slab', serif;
  font-size: 0.875rem;
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

export const LinkSection = styled.section`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f0f0f0;
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