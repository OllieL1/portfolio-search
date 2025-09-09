"use client";

import React, { useState, useEffect } from 'react';
import { ExternalLink, GraduationCap, School } from 'lucide-react';
import { getAllContent } from '../../utils/contentUtils';
import { useWindow, useIsClient } from '../../hooks/useWindow'; // Import the custom hooks
import {
  Container,
  Header,
  TimelineContainer,
  TimelineLine,
  Section,
  SectionHeader,
  YearSection,
  TimelineItem,
  TimelineDot,
  CourseCard,
  CourseHeader,
  CourseTitle,
  GradeTag,
  CourseDescription,
  SkillsContainer,
  SkillTag,
  ExternalLinkContainer,
  EmptyYearMessage
} from './styles';

interface EducationItem {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  dateRange: string;
  detail: string;
  skills: string[];
  link?: {
    url: string;
    label: string;
  };
  relevance: number;
  type: string;
  category: string;
}

interface YearSection {
  key: string;
  title: string;
  courses: EducationItem[];
}

interface EducationPageProps {
  onItemClick: (contentId: string) => void;
  onSkillClick: (skill: string) => void;
}

const EducationPage: React.FC<EducationPageProps> = ({ onItemClick, onSkillClick }) => {
  const [activeSection, setActiveSection] = useState<string>('university');
  const [educationData, setEducationData] = useState<EducationItem[]>([]);
  
  // Use custom hooks for window detection
  const { isMobile } = useWindow();
  const isClient = useIsClient();

  useEffect(() => {
    const allContent = getAllContent();
    const education = allContent.filter(item => item.category === 'Education') as EducationItem[];
    setEducationData(education);
  }, []);

  useEffect(() => {
    // Only add scroll listener on client side
    if (!isClient) return;

    const handleScroll = () => {
      const sections = ['university', 'highschool'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Helper function to determine which year a course belongs to
  const getCourseYear = (startDate: string, endDate: string): string | null => {
    if (!startDate) return null;
    
    const start = new Date(startDate);
    const cutoffDate = new Date('2022-08-01');
    
    // If start date is before August 2022, it's high school
    if (start < cutoffDate) {
      return 'highschool';
    }
    
    const end = endDate ? new Date(endDate) : new Date();
    
    // University year periods (Sep to May)
    const yearPeriods = [
      { key: 'first', start: new Date('2022-09-01'), end: new Date('2023-05-31') },
      { key: 'second', start: new Date('2023-09-01'), end: new Date('2024-05-31') },
      { key: 'third', start: new Date('2024-09-01'), end: new Date('2025-05-31') },
      { key: 'fourth', start: new Date('2025-09-01'), end: new Date('2026-05-31') },
      { key: 'fifth', start: new Date('2026-09-01'), end: new Date('2027-05-31') }
    ];
    
    // Check if the course falls within any year period
    for (const period of yearPeriods) {
      if ((start >= period.start && start <= period.end) || 
          (end >= period.start && end <= period.end) ||
          (start <= period.start && end >= period.end)) {
        return period.key;
      }
    }
    
    return null;
  };

  // Helper function to get displayed skills (max 3 on mobile)
  const getDisplayedSkills = (skills: string[]): { displayed: string[], hasMore: boolean } => {
    if (isMobile && skills.length > 3) {
      return {
        displayed: skills.slice(0, 3),
        hasMore: true
      };
    }
    return {
      displayed: skills,
      hasMore: false
    };
  };

  // Year sections in descending order (5th year first)
  const yearSections: YearSection[] = [
    { key: 'fifth', title: 'Fifth Year (Sep 2026 - May 2027)', courses: [] },
    { key: 'fourth', title: 'Fourth Year (Sep 2025 - May 2026)', courses: [] },
    { key: 'third', title: 'Third Year (Sep 2024 - May 2025)', courses: [] },
    { key: 'second', title: 'Second Year (Sep 2023 - May 2024)', courses: [] },
    { key: 'first', title: 'First Year (Sep 2022 - May 2023)', courses: [] }
  ];

  // Separate high school courses
  const highSchoolCourses: EducationItem[] = [];

  // Dynamically sort education data into year sections
  educationData.forEach((course: EducationItem) => {
    const courseYear = getCourseYear(course.startDate, course.endDate);
    if (courseYear === 'highschool') {
      highSchoolCourses.push(course);
    } else if (courseYear) {
      const yearSection = yearSections.find(section => section.key === courseYear);
      if (yearSection) {
        yearSection.courses.push(course);
      }
    }
  });

  // Sort courses within each year by relevance (highest first)
  yearSections.forEach(section => {
    section.courses.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
  });

  // Sort high school courses chronologically (most recent first)
  highSchoolCourses.sort((a, b) => {
    const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
    const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
    return dateB - dateA;
  });

  // Function to render empty year message with special case for 4th year
  const renderEmptyYearMessage = (yearKey: string) => {
    if (yearKey === 'fourth') {
      return (
        <EmptyYearMessage onClick={() => onItemClick('jp-morgan')} style={{ cursor: 'pointer' }}>
          <p>
            This is my <strong>Placement Year</strong> at JP Morgan Chase. 
            <br />
            <span style={{ color: '#1a73e8', textDecoration: 'underline' }}>
              Click here to learn more about my Software Engineer Industrial Placement →
            </span>
          </p>
        </EmptyYearMessage>
      );
    }
    
    return (
      <EmptyYearMessage>
        <p>No courses recorded for this year yet</p>
      </EmptyYearMessage>
    );
  };

  // Function to render course card
  const renderCourseCard = (course: EducationItem, sectionColor: string) => {
    const { displayed: displayedSkills, hasMore } = getDisplayedSkills(course.skills);
    
    return (
      <TimelineItem key={course.id}>
        <TimelineDot $color={sectionColor} />
        <CourseCard onClick={() => onItemClick(course.id)}>
          <CourseHeader>
            <CourseTitle>{course.title}</CourseTitle>
            <GradeTag>{course.dateRange}</GradeTag>
          </CourseHeader>
          
          {/* Only show description on desktop */}
          {!isMobile && (
            <CourseDescription>{course.detail}</CourseDescription>
          )}
          
          <SkillsContainer>
            {displayedSkills.map((skill: string) => (
              <SkillTag 
                key={skill} 
                onClick={(e) => {
                  e.stopPropagation();
                  onSkillClick(skill);
                }}
              >
                {skill}
              </SkillTag>
            ))}
            {hasMore && (
              <SkillTag style={{ 
                background: '#f1f3f4', 
                color: '#5f6368',
                cursor: 'default'
              }}>
                +{course.skills.length - 3} more
              </SkillTag>
            )}
          </SkillsContainer>
          
          {/* Only show external link on desktop */}
          {!isMobile && course.link && (
            <ExternalLinkContainer>
              <a 
                href={course.link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                {course.link.label}
              </a>
            </ExternalLinkContainer>
          )}
        </CourseCard>
      </TimelineItem>
    );
  };

  // Show loading during SSR
  if (!isClient) {
    return (
      <Container>
        <Header>
          <h1>Education</h1>
          <p>Loading...</p>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Education</h1>
        <p>My academic journey through university and beyond</p>
      </Header>

      <TimelineContainer>
        <TimelineLine />
        
        <Section id="university" $isActive={activeSection === 'university'}>
          <SectionHeader $color={activeSection === 'university' ? '#1a73e8' : '#5f6368'}>
            <GraduationCap size={28} className="icon" />
            <h2>University of Glasgow</h2>
          </SectionHeader>
          
          {yearSections.map((yearSection: YearSection) => (
            <YearSection key={yearSection.key}>
              <h3>{yearSection.title}</h3>
              {yearSection.courses.length > 0 ? (
                yearSection.courses.map((course: EducationItem) => 
                  renderCourseCard(course, activeSection === 'university' ? '#1a73e8' : '#5f6368')
                )
              ) : (
                renderEmptyYearMessage(yearSection.key)
              )}
            </YearSection>
          ))}
        </Section>

        <Section id="highschool" $isActive={activeSection === 'highschool'}>
          <SectionHeader $color={activeSection === 'highschool' ? '#34a853' : '#5f6368'}>
            <School size={28} className="icon" />
            <h2>High School</h2>
          </SectionHeader>
          
          {highSchoolCourses.length > 0 ? (
            highSchoolCourses.map((course: EducationItem) => 
              renderCourseCard(course, activeSection === 'highschool' ? '#34a853' : '#5f6368')
            )
          ) : (
            <EmptyYearMessage>
              <p>High school achievements and qualifications will be added here</p>
            </EmptyYearMessage>
          )}
        </Section>
      </TimelineContainer>
    </Container>
  );
};

export default EducationPage;