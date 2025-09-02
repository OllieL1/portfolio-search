import React from 'react';
import styled, { keyframes } from 'styled-components';

// Gentle pulsing glow animation
const gentlePulse = keyframes`
  0% {
    border-color: #4285f4;
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4);
  }
  50% {
    border-color: #5a9cff;
    box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.1);
  }
  100% {
    border-color: #4285f4;
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4);
  }
`;

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const AnimatedO = styled.span`
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  border: 0.1em solid #4285f4;
  border-radius: 50%;
  position: relative;
  vertical-align: baseline;
  margin-right: 0.02em;
  animation: ${gentlePulse} 3s ease-in-out infinite;
  animation-delay: 1s;
`;

const AnimatedLogo: React.FC = () => (
  <Logo>
    <AnimatedO />llie Livingston
  </Logo>
);

export default AnimatedLogo;