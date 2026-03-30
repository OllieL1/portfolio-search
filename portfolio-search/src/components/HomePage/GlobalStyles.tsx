"use client";

import { createGlobalStyle } from 'styled-components';
import { lightTokens, darkTokens, generateCSSVariables } from '../../theme';

export const GlobalStyle = createGlobalStyle`
  [data-theme="light"] {
    ${generateCSSVariables(lightTokens)}
    color-scheme: light;
  }

  [data-theme="dark"] {
    ${generateCSSVariables(darkTokens)}
    color-scheme: dark;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto Slab', serif;
    background-color: var(--bg-page);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

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
