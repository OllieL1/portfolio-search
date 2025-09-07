import React from 'react';
import { Calendar, Award } from 'lucide-react';
import { getAllContent } from '../../utils/contentUtils';
import {
  Container,
  Header,
  Title,
  Subtitle,
  ProjectsGrid,
  ProjectCard,
  ProjectHeader,
  ProjectInfo,
  ProjectTitle,
  Company,
  DateRange,
  Description,
  SkillsContainer,
  SkillTag,
  MoreSkills,
  AwardBadge,
  EmptyState
} from './styles';

// Props interface
interface ProjectsPageProps {
  onItemClick: (contentId: string) => void;
  onSkillClick: (skill: string) => void;
}

// Helper function to format date range - now handles null startDate
const formatDateRange = (startDate: string | null, endDate: string | null | undefined): string => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };
  
  // Handle case where startDate is null
  if (!startDate) {
    return 'Date Range Not Available';
  }
  
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  
  return `${start} - ${end}`;
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onItemClick, onSkillClick }) => {
  // Get all project content
  const allContent = getAllContent();
  const projects = allContent.filter(item => item.type === 'project');

  // Helper function to render skills with responsive truncation
  const renderSkills = (skills: string[]) => {
    // Determine if we're on mobile using window width (simple approach)
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const limit = isMobile ? 3 : 5;
    
    return (
      <>
        {skills.slice(0, limit).map((skill, index) => (
          <SkillTag 
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onSkillClick(skill);
            }}
          >
            {skill}
          </SkillTag>
        ))}
        {skills.length > limit && (
          <MoreSkills>+{skills.length - limit} more</MoreSkills>
        )}
      </>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Projects</Title>
        <Subtitle>
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </Subtitle>
      </Header>

      {projects.length === 0 ? (
        <EmptyState>
          <p>No projects found.</p>
        </EmptyState>
      ) : (
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              onClick={() => onItemClick(project.id)}
            >
              <ProjectHeader>
                <ProjectInfo>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <Company>{project.company}</Company>
                </ProjectInfo>
                <DateRange>
                  <Calendar size={14} />
                  {formatDateRange(project.startDate, project.endDate)}
                </DateRange>
              </ProjectHeader>

              <Description>{project.detail}</Description>

              {/* Award badge for special achievements */}
              {project.id === 'team-project' && (
                <AwardBadge>
                  <Award size={14} />
                  Team Project Award Winner
                </AwardBadge>
              )}

              {project.skills && project.skills.length > 0 && (
                <SkillsContainer>
                  {renderSkills(project.skills)}
                </SkillsContainer>
              )}
            </ProjectCard>
          ))}
        </ProjectsGrid>
      )}
    </Container>
  );
};

export default ProjectsPage;