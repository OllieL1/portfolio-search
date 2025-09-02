import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { GlobalStyle } from '../HomePage/GlobalStyles';
import { PageContainer, PageContent, BackButton } from './styles';

interface PageLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showBackButton?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  onBack, 
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      console.log('Navigate back to home');
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <PageContent>
          {children}
        </PageContent>
      </PageContainer>
    </>
  );
};

export default PageLayout;