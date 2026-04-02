import React from 'react';
import styled, { keyframes } from 'styled-components';

// Circle → squircle → diamond-ish rounded shape, with blue shade shifts
const morph = keyframes`
  0% {
    border-radius: 50%;
    transform: rotate(0deg);
    border-color: #4285f4;
    box-shadow: 0 0 8px 2px rgba(66, 133, 244, 0.3);
  }
  33% {
    border-radius: 35% 35% 35% 35%;
    transform: rotate(120deg);
    border-color: #5b9bf5;
    box-shadow: 0 0 8px 2px rgba(91, 155, 245, 0.3);
  }
  66% {
    border-radius: 50% 15% 50% 15%;
    transform: rotate(240deg);
    border-color: #3367d6;
    box-shadow: 0 0 8px 2px rgba(51, 103, 214, 0.3);
  }
  100% {
    border-radius: 50%;
    transform: rotate(360deg);
    border-color: #4285f4;
    box-shadow: 0 0 8px 2px rgba(66, 133, 244, 0.3);
  }
`;

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 2rem;
  padding-top: 1.5em;
  color: var(--text-primary);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const O = styled.span`
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  border: 0.1em solid #4285f4;
  border-radius: 50%;
  vertical-align: baseline;
  margin-right: 0.02em;
  box-shadow: 0 0 8px 2px rgba(66, 133, 244, 0.3);
  animation: ${morph} 5s ease-in-out infinite;
`;

const AnimatedLogo: React.FC = () => (
  <Logo>
    <O />llie Livingston
  </Logo>
);

export default AnimatedLogo;
