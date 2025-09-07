import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getContentByType } from '../../utils/contentUtils';
import { ContentItem } from '../../types/content';
import {
  ExperienceContainer,
  ExperienceHeader,
  ExperienceTitle,
  ExperienceSubtitle,
  YearSection,
  YearHeading,
  ExperienceList,
  ExperienceCard,
  CardHeader,
  CardTitle,
  CardCompany,
  CardDateSection,
  CardDate,
  ExternalLinkButton,
  CardDescription,
  CardSkills,
  SkillChip,
  EmptyState,
  EmptyStateTitle,
  EmptyStateText
} from './styles';

interface ExperiencePageProps {
  onItemClick: (contentId: string) => void;
  onSkillClick?: (skill: string) => void;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ onItemClick, onSkillClick }) => {
  // Get experience content
  const experiences = getContentByType('experiences');
  
  // Helper function to format date for display
  const formatDateDisplay = (startDate: string, endDate?: string) => {
    const formatDate = (dateStr: string) => {
      const [year, month] = dateStr.split('-');
      if (month) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
      }
      return year;
    };
    
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };
  
  // Parse dates for sorting and grouping
  const parseDate = (dateStr: string) => {
    const [year, month = '12'] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1);
  };
  
  // Group experiences by end year
  const groupExperiencesByYear = () => {
    const currentYear = new Date().getFullYear();
    const yearGroups: { [year: number]: ContentItem[] } = {};
    
    experiences.forEach(exp => {
      // Use end date year, or current year if ongoing
      const endYear = exp.endDate ? parseDate(exp.endDate).getFullYear() : currentYear;
      
      if (!yearGroups[endYear]) {
        yearGroups[endYear] = [];
      }
      yearGroups[endYear].push(exp);
    });
    
    // Sort experiences within each year by end date (most recent first)
    Object.keys(yearGroups).forEach(year => {
      yearGroups[parseInt(year)].sort((a, b) => {
        const endDateA = a.endDate ? parseDate(a.endDate) : new Date();
        const endDateB = b.endDate ? parseDate(b.endDate) : new Date();
        return endDateB.getTime() - endDateA.getTime();
      });
    });
    
    // Return years sorted descending (most recent first)
    const sortedYears = Object.keys(yearGroups)
      .map(year => parseInt(year))
      .sort((a, b) => b - a);
    
    return sortedYears.map(year => ({
      year,
      experiences: yearGroups[year]
    }));
  };
  
  const yearGroups = groupExperiencesByYear();
  
  const handleSkillClick = (skill: string) => {
    if (onSkillClick) {
      onSkillClick(skill);
    } else {
      console.log(`Search for skill: ${skill}`);
    }
  };

  // Helper function to render skills with responsive truncation
  const renderSkills = (skills: string[]) => {
    // Determine if we're on mobile using window width (simple approach)
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const limit = isMobile ? 3 : 5;
    
    return (
      <>
        {skills.slice(0, limit).map((skill, index) => (
          <SkillChip 
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              handleSkillClick(skill);
            }}
          >
            {skill}
          </SkillChip>
        ))}
        {skills.length > limit && (
          <SkillChip>+{skills.length - limit} more</SkillChip>
        )}
      </>
    );
  };
  
  if (experiences.length === 0) {
    return (
      <ExperienceContainer>
        <ExperienceHeader>
          <ExperienceTitle>Professional Experience</ExperienceTitle>
          <ExperienceSubtitle>
            My journey through various roles and positions, showcasing growth and learning experiences.
          </ExperienceSubtitle>
        </ExperienceHeader>
        
        <EmptyState>
          <EmptyStateTitle>No Experience Found</EmptyStateTitle>
          <EmptyStateText>
            Experience entries will appear here once they are added to the content.
          </EmptyStateText>
        </EmptyState>
      </ExperienceContainer>
    );
  }
  
  return (
    <ExperienceContainer>
      <ExperienceHeader>
        <ExperienceTitle>Professional Experience</ExperienceTitle>
        <ExperienceSubtitle>
          My journey through various roles and positions, showcasing growth and learning experiences.
        </ExperienceSubtitle>
      </ExperienceHeader>
      
      {yearGroups.map(({ year, experiences: yearExperiences }) => (
        <YearSection key={year}>
          <YearHeading>{year}</YearHeading>
          
          <ExperienceList>
            {yearExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                onClick={() => onItemClick(experience.id)}
              >
                <CardHeader>
                  <CardTitle>{experience.title}</CardTitle>
                  <CardCompany>{experience.company}</CardCompany>
                  <CardDateSection>
                    <CardDate>
                      {formatDateDisplay(experience.startDate, experience.endDate)}
                    </CardDate>
                    {experience.link && (
                      <ExternalLinkButton
                        href={experience.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {experience.link.label}
                        <ExternalLink size={14} className="icon" />
                      </ExternalLinkButton>
                    )}
                  </CardDateSection>
                </CardHeader>
                
                <CardDescription>{experience.detail}</CardDescription>
                
                <CardSkills>
                  {renderSkills(experience.skills)}
                </CardSkills>
              </ExperienceCard>
            ))}
          </ExperienceList>
        </YearSection>
      ))}
    </ExperienceContainer>
  );
};

export default ExperiencePage;