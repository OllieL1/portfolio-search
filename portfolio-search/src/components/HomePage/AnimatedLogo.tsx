import React from 'react';
import styled, { keyframes } from 'styled-components';

// Morphing geometric shapes animation
const geometricMorph = keyframes`
  0% {
    border-radius: 50%;
    border-color: #4285f4;
    transform: scale(1) rotate(0deg);
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.7);
  }
  50% {
    border-radius: 50%;
    border-color: #4285f4;
    transform: scale(1) rotate(0deg);
    box-shadow: 0 0 15px 3px rgba(66, 133, 244, 0.4);
  }
  65% {
    border-radius: 50% 50% 50% 0%;
    border-color: #1a73e8;
    transform: scale(1.05) rotate(135deg);
    box-shadow: 0 0 20px 5px rgba(26, 115, 232, 0.3);
  }
  80% {
    border-radius: 10%;
    border-color: #5a9cff;
    transform: scale(0.95) rotate(180deg);
    box-shadow: 0 0 25px 8px rgba(90, 156, 255, 0.2);
  }
  90% {
    border-radius: 25%;
    border-color: #0d47a1;
    transform: scale(1.02) rotate(270deg);
    box-shadow: 0 0 20px 5px rgba(13, 71, 161, 0.3);
  }
  100% {
    border-radius: 50%;
    border-color: #4285f4;
    transform: scale(1) rotate(360deg);
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.7);
  }
`;

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const AnimatedO = styled.span`
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  border: 0.1em solid #4285f4;
  position: relative;
  vertical-align: baseline;
  margin-right: 0.02em;
  animation: ${geometricMorph} 6s ease-in-out infinite;
  
  &:hover {
    animation-duration: 3s;
  }
`;

const AnimatedLogo: React.FC = () => (
  <Logo>
    <AnimatedO />llie Livingston
  </Logo>
);

export default AnimatedLogo;