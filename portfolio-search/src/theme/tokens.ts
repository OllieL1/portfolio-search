export interface ThemeTokens {
  // Backgrounds
  bgPage: string;
  bgCard: string;
  bgSubtle: string;
  bgHover: string;
  bgInput: string;
  bgTag: string;
  bgTagNeutral: string;
  bgTagGrade: string;
  bgHighlight: string;
  bgSidebar: string;
  bgMobileBar: string;
  bgGlass: string;
  bgGlassHover: string;
  bgGlassBorder: string;

  // Text
  textPrimary: string;
  textHeading: string;
  textSecondary: string;
  textTertiary: string;
  textDetail: string;
  textLink: string;
  textOnAccent: string;

  // Borders
  borderDefault: string;
  borderSubtle: string;
  borderLight: string;

  // Accents
  accentPrimary: string;
  accentPrimaryHover: string;
  accentSecondary: string;
  accentGreen: string;
  accentGreenHover: string;
  accentPurple: string;
  accentRed: string;
  accentRedHover: string;

  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowAccent: string;
  shadowAccentHover: string;

  // Misc
  profileBorder: string;
  timelineDotBorder: string;
  scrollbarThumb: string;
}

export const lightTokens: ThemeTokens = {
  bgPage: '#f5f5dc',
  bgCard: '#ffffff',
  bgSubtle: '#f8f9fa',
  bgHover: '#f9fafb',
  bgInput: '#ffffff',
  bgTag: '#f0f8ff',
  bgTagNeutral: '#f0f2f5',
  bgTagGrade: '#e8f0fe',
  bgHighlight: '#fff3cd',
  bgSidebar: 'rgba(255, 255, 255, 0.95)',
  bgMobileBar: 'rgba(255, 255, 255, 0.2)',
  bgGlass: 'rgba(255, 255, 255, 0.3)',
  bgGlassHover: 'rgba(255, 255, 255, 0.4)',
  bgGlassBorder: 'rgba(255, 255, 255, 0.3)',

  textPrimary: '#333333',
  textHeading: '#202124',
  textSecondary: '#5f6368',
  textTertiary: '#999999',
  textDetail: '#444444',
  textLink: '#1a0dab',
  textOnAccent: '#ffffff',

  borderDefault: '#e0e0e0',
  borderSubtle: '#e5e7eb',
  borderLight: '#f0f0f0',

  accentPrimary: '#4285f4',
  accentPrimaryHover: '#3367d6',
  accentSecondary: '#1a73e8',
  accentGreen: '#34a853',
  accentGreenHover: '#2e7d32',
  accentPurple: '#667eea',
  accentRed: '#be4e4e',
  accentRedHover: '#8f2d2d',

  shadowSm: '0 1px 4px rgba(0, 0, 0, 0.04)',
  shadowMd: '0 2px 12px rgba(0, 0, 0, 0.08)',
  shadowLg: '0 8px 25px rgba(0, 0, 0, 0.1)',
  shadowAccent: '0 4px 15px rgba(59, 130, 246, 0.3)',
  shadowAccentHover: '0 8px 25px rgba(59, 130, 246, 0.4)',

  profileBorder: '#f8f9fa',
  timelineDotBorder: '#ffffff',
  scrollbarThumb: '#cccccc',
};

export const darkTokens: ThemeTokens = {
  bgPage: '#121212',
  bgCard: '#1e1e1e',
  bgSubtle: '#2a2a2a',
  bgHover: '#333333',
  bgInput: '#2a2a2a',
  bgTag: 'rgba(66, 133, 244, 0.15)',
  bgTagNeutral: '#2a2a2a',
  bgTagGrade: 'rgba(26, 115, 232, 0.2)',
  bgHighlight: 'rgba(255, 243, 205, 0.15)',
  bgSidebar: 'rgba(30, 30, 30, 0.95)',
  bgMobileBar: 'rgba(30, 30, 30, 0.4)',
  bgGlass: 'rgba(255, 255, 255, 0.08)',
  bgGlassHover: 'rgba(255, 255, 255, 0.12)',
  bgGlassBorder: 'rgba(255, 255, 255, 0.1)',

  textPrimary: '#e4e4e7',
  textHeading: '#f0f0f0',
  textSecondary: '#a1a1aa',
  textTertiary: '#71717a',
  textDetail: '#b4b4b4',
  textLink: '#93bbfc',
  textOnAccent: '#ffffff',

  borderDefault: '#333333',
  borderSubtle: '#2a2a2a',
  borderLight: '#252525',

  accentPrimary: '#5a9cff',
  accentPrimaryHover: '#4285f4',
  accentSecondary: '#5a9cff',
  accentGreen: '#4caf50',
  accentGreenHover: '#34a853',
  accentPurple: '#8da2f0',
  accentRed: '#e06666',
  accentRedHover: '#be4e4e',

  shadowSm: '0 1px 4px rgba(0, 0, 0, 0.3)',
  shadowMd: '0 2px 12px rgba(0, 0, 0, 0.4)',
  shadowLg: '0 8px 25px rgba(0, 0, 0, 0.5)',
  shadowAccent: '0 4px 15px rgba(90, 156, 255, 0.25)',
  shadowAccentHover: '0 8px 25px rgba(90, 156, 255, 0.35)',

  profileBorder: '#333333',
  timelineDotBorder: '#1e1e1e',
  scrollbarThumb: '#555555',
};

export function generateCSSVariables(tokens: ThemeTokens): string {
  return Object.entries(tokens)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case: bgPage -> bg-page
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `--${cssVar}: ${value};`;
    })
    .join('\n    ');
}
