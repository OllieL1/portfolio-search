import styled from 'styled-components';

// Main page styles - consistent with site theme
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  background: #f5f5dc; /* Match site background */
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Content = styled.div`
  color: #333;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #4285f4;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #4285f4;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

export const TextContent = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    
    p {
      font-size: 0.9rem;
    }
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const Card = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-color: #4285f4;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #4285f4;
    border-radius: 4px 0 0 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #f0f8ff;
  border: 1px solid #e6f3ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    color: #4285f4;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  line-height: 1.3;
`;

export const CardHighlight = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4285f4;
  margin-bottom: 1rem;
`;

export const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Password protection styles - using site theme
export const PasswordOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f5dc; /* Match site background */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 9999;
`;

export const PasswordDialog = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

export const PasswordTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
`;

export const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  font-family: 'Roboto Slab', serif;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const ShowPasswordButton = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #374151;
    background: rgba(0, 0, 0, 0.05);
  }
  
  &:focus {
    outline: 2px solid #4285f4;
    outline-offset: 2px;
  }
`;

export const PasswordButton = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Roboto Slab', serif;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
  
  &:hover:not(:disabled) {
    background: #3367d6;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(66, 133, 244, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: 2px solid #4285f4;
    outline-offset: 2px;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  padding: 0.75rem;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
`;