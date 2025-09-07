"use client";

import SecretPage from '../../components/SecretPage';
import TabManager from '../../components/TabManager';
import { GlobalStyle } from '../../components/HomePage/GlobalStyles';

export default function Secret() {
  return (
    <>
      <GlobalStyle />
      <TabManager>
        <SecretPage />
      </TabManager>
    </>
  );
}