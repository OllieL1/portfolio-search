"use client";

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    @keyframes pageEnter {
      from { opacity: 1; transform: none; }
      to { opacity: 1; transform: none; }
    }
  }
`;
