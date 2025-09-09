"use client";

import React, { useState, useEffect } from 'react';
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
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

interface PageContent {
  title: string;
  subtitle: string;
  noteTitle: string;
  noteParagraph1: string;
  noteParagraph2: string;
  excitementTitle: string;
  excitementParagraph1: string;
  excitementParagraph2: string;
  excitementParagraph3: string;
  fitTitle: string;
  fitParagraph1: string;
  fitParagraph2: string;
  fitParagraph3: string;
  teamTitle: string;
  sellingPoints: SellingPoint[];
}

const SecretPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<PageContent | null>(null);

  const requiredPassword = process.env.NEXT_PUBLIC_SECRET_PASSWORD;

  // Function to get icon component from string
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Code': <Code size={24} />,
      'Target': <Target size={24} />,
      'Zap': <Zap size={24} />,
      'Users': <Users size={24} />,
      'Lightbulb': <Lightbulb size={24} />,
      'Heart': <Heart size={24} />
    };
    return iconMap[iconName] || <Code size={24} />;
  };

  // Function to load content from environment variables
  const loadContent = async (): Promise<PageContent> => {
    // Make an API call to get the content from server-side environment variables
    const response = await fetch('/api/secret-content');
    if (!response.ok) {
      throw new Error('Failed to load content');
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // Check if already authenticated in session
    const authStatus = sessionStorage.getItem('secret-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      // Load content when authenticated
      loadContent().then(setContent).catch(console.error);
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
        // Load content after successful authentication
        loadContent().then(setContent).catch(console.error);
      } else {
        setError('Incorrect access code');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

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

  if (!content) {
    return (
      <>
        <GlobalStyle />
        <TabManager>
          <Container>
            <Content>
              <p>Loading...</p>
            </Content>
          </Container>
        </TabManager>
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
              <Title>{content.title}</Title>
              <Subtitle>{content.subtitle}</Subtitle>
            </Header>

            <Section>
              <SectionTitle>{content.noteTitle}</SectionTitle>
              <TextContent>
                <p>{content.noteParagraph1}</p>
                <p>{content.noteParagraph2}</p>
              </TextContent>
            </Section>

            <Section>
              <SectionTitle>{content.excitementTitle}</SectionTitle>
              <TextContent>
                <p>{content.excitementParagraph1}</p>
                <p>{content.excitementParagraph2}</p>
                <p>{content.excitementParagraph3}</p>
              </TextContent>
            </Section>

            <Section>
              <SectionTitle>{content.fitTitle}</SectionTitle>
              <TextContent>
                <p>{content.fitParagraph1}</p>
                <p>{content.fitParagraph2}</p>
                <p>{content.fitParagraph3}</p>
              </TextContent>
            </Section>

            <Section>
              <SectionTitle>{content.teamTitle}</SectionTitle>
              <CardsGrid>
                {content.sellingPoints.map((point) => (
                  <Card key={point.id}>
                    <CardIcon>{getIconComponent(point.icon)}</CardIcon>
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