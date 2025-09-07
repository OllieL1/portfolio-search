"use client";

import { useRouter } from 'next/navigation';
import SecretPage from '../../components/SecretPage';
import TabManager from '../../components/TabManager';
import { GlobalStyle } from '../../components/HomePage/GlobalStyles';

export default function Secret() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <GlobalStyle />
      <TabManager>
        <SecretPage onNavigation={handleNavigation} />
      </TabManager>
    </>
  );
}