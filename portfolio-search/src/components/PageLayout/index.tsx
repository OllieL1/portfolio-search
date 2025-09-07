import React from 'react';
import { GlobalStyle } from '../HomePage/GlobalStyles';
import { PageContainer, PageContent } from './styles';

interface PageLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showBackButton?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children
}) => {

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