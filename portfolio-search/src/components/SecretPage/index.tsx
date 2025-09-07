"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Heart, Zap, Target, Users, Code, Lightbulb } from 'lucide-react';
import { GlobalStyle } from '../../components/HomePage/GlobalStyles';
import TabManager from '../../components/TabManager';
import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  TextContent,
  CardsGrid,
  Card,
  CardIcon,
  CardTitle,
  CardHighlight,
  CardDescription,
  PasswordOverlay,
  PasswordDialog,
  PasswordTitle,
  PasswordForm,
  PasswordInputWrapper,
  PasswordInput,
  ShowPasswordButton,
  PasswordButton,
  ErrorMessage
} from './styles';

// Types
interface SellingPoint {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const SecretPage: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requiredPassword = process.env.NEXT_PUBLIC_SECRET_PASSWORD;
  const secretTrigger = process.env.NEXT_PUBLIC_SECRET_TRIGGER;

  useEffect(() => {
    // Check if already authenticated in session
    const authStatus = sessionStorage.getItem('secret-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    setTimeout(() => {
      if (password === requiredPassword) {
        setIsAuthenticated(true);
        sessionStorage.setItem('secret-auth', 'true');
      } else {
        setError('Incorrect access code');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

  const sellingPoints: SellingPoint[] = [
    {
      id: 'technical-excellence',
      icon: <Code size={24} />,
      title: 'Technical Excellence',
      highlight: 'Full-stack expertise with modern technologies',
      description: 'Experienced in React, TypeScript, Python, and cloud technologies. Currently working at JP Morgan on large-scale financial applications, delivering production-ready solutions.'
    },
    {
      id: 'product-mindset',
      icon: <Target size={24} />,
      title: 'Product-Focused Thinking',
      highlight: 'User-centric approach to building solutions',
      description: 'Led university team project that won top award among 400 students. Experience working directly with stakeholders to translate requirements into intuitive user experiences.'
    },
    {
      id: 'rapid-learning',
      icon: <Zap size={24} />,
      title: 'Rapid Adaptability',
      highlight: 'Quick to master new technologies and domains',
      description: 'Transitioned from student to professional environment seamlessly. Helped modernize university course content and adapted to changing requirements in dynamic environments.'
    },
    {
      id: 'collaboration',
      icon: <Users size={24} />,
      title: 'Strong Collaborator',
      highlight: 'Thrives in team environments',
      description: 'Worked with diverse teams across hospitality, academia, and finance. Excellent communication skills and experience mentoring peers through complex technical challenges.'
    },
    {
      id: 'innovation',
      icon: <Lightbulb size={24} />,
      title: 'Creative Problem Solver',
      highlight: 'Builds elegant solutions to complex challenges',
      description: 'Developed AI-powered map generation tool and modernized legacy systems. Approaches problems with fresh perspective and finds efficient, scalable solutions.'
    },
    {
      id: 'passion',
      icon: <Heart size={24} />,
      title: 'Genuine Enthusiasm',
      highlight: 'Passionate about building products people love',
      description: 'Believes in creating tools that genuinely improve people\'s workflows. Excited about the intersection of design, technology, and human productivity.'
    }
  ];

  if (!isAuthenticated) {
    return (
      <>
        <GlobalStyle />
        <PasswordOverlay>
          <PasswordDialog>
            <Lock size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
            <PasswordTitle>Access Required</PasswordTitle>
            <PasswordForm onSubmit={handlePasswordSubmit}>
              <PasswordInputWrapper>
                <PasswordInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access code"
                  required
                />
                <ShowPasswordButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </ShowPasswordButton>
              </PasswordInputWrapper>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <PasswordButton type="submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Access'}
              </PasswordButton>
            </PasswordForm>
          </PasswordDialog>
        </PasswordOverlay>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <TabManager>
        <Container>
          <Content>
            <Header>
              <Title>Notion</Title>
              <Subtitle>Software Engineer Intern Summer 2026 Application</Subtitle>
            </Header>

            <Section>
              <SectionTitle>A Note From Me</SectionTitle>
              <TextContent>
                <p>
                  If you are viewing this page, then I would hope you have only got in via the password on my CV. It is a delight to welcome you to my website. My name is Ollie Livingston and I am applying to the Notion Software Engineer Summer 2026 Internship.
                  You guys probably get this a lot, so I do apologise if this is cliche but working with Notion is undoubtedly by dream role. I have been an avid user of your platform for the last seven years - I was within the first million users. To watch the way you have grown, how the application has improved and the userbase has exploded has been so satisfying.
                </p>
                <p>
                  Please make use of the site to help you inform your hiring choices, it is built to be a search engine - a sort of wikipedia about me. You can find the shortcuts on the Home Page which all have custom built pages to add more detail to my CV. If you are looking for specific skills/info, the global search of all pages is particularly powerful and sorts the results by relevance. 
                  Please do enjoy the site and good luck with your hiring! I'll be hoping to hear from you!
                </p>
              </TextContent>
            </Section>

            <Section>
              <SectionTitle>Why This Opportunity Excites Me</SectionTitle>
              <TextContent>
                <p>
                  Throughout my career, I've been drawn to companies that don't just build software—they craft experiences that fundamentally change how people work and think. The intersection of elegant design and powerful functionality represents everything I'm passionate about in technology.
                </p>
                <p>
                  What captivates me most is the mission of democratizing powerful tools. Having worked in both academic and enterprise environments, I've seen how the right platform can transform scattered thoughts into actionable insights, and fragmented workflows into seamless productivity systems.
                </p>
                <p>
                  The opportunity to contribute to a platform that millions rely on daily to organize their thoughts, collaborate with teams, and build knowledge bases represents the kind of meaningful impact I want to have in my career.
                </p>
              </TextContent>
            </Section>

            <Section>
              <SectionTitle>Why I'm the Right Fit</SectionTitle>
              <TextContent>
                <p>
                  My experience spans the full spectrum of product development—from understanding user needs as a Product Owner, to implementing complex technical solutions, to working directly with stakeholders in fast-paced environments.
                </p>
                <p>
                  At JP Morgan, I've learned to balance innovation with reliability, building user interfaces that handle complex financial data while remaining intuitive. This mirrors the challenge of creating powerful productivity tools that don't overwhelm users with complexity.
                </p>
                <p>
                  My collaborative approach, combined with technical versatility and genuine enthusiasm for creating products that people love, aligns perfectly with building tools that enhance human creativity and productivity.
                </p>
              </TextContent>
            </Section>

            <Section>
              <SectionTitle>What I Bring to the Team</SectionTitle>
              <CardsGrid>
                {sellingPoints.map((point) => (
                  <Card key={point.id}>
                    <CardIcon>{point.icon}</CardIcon>
                    <CardTitle>{point.title}</CardTitle>
                    <CardHighlight>{point.highlight}</CardHighlight>
                    <CardDescription>{point.description}</CardDescription>
                  </Card>
                ))}
              </CardsGrid>
            </Section>
          </Content>
        </Container>
      </TabManager>
    </>
  );
};

export default SecretPage;