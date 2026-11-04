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
  bgPage: '#fafafa',
  bgCard: '#ffffff',
  bgSubtle: '#f4f4f5',
  bgHover: '#f4f4f5',
  bgInput: '#ffffff',
  bgTag: 'rgba(37, 99, 235, 0.08)',
  bgTagNeutral: '#f4f4f5',
  bgTagGrade: 'rgba(37, 99, 235, 0.1)',
  bgHighlight: '#fef9c3',
  bgSidebar: 'rgba(250, 250, 250, 0.9)',
  bgMobileBar: 'rgba(255, 255, 255, 0.75)',
  bgGlass: 'rgba(255, 255, 255, 0.6)',
  bgGlassHover: 'rgba(255, 255, 255, 0.8)',
  bgGlassBorder: 'rgba(24, 24, 27, 0.08)',

  textPrimary: '#27272a',
  textHeading: '#18181b',
  textSecondary: '#52525b',
  textTertiary: '#a1a1aa',
  textDetail: '#3f3f46',
  textLink: '#2563eb',
  textOnAccent: '#ffffff',

  borderDefault: '#e4e4e7',
  borderSubtle: '#ececee',
  borderLight: '#f4f4f5',

  accentPrimary: '#2563eb',
  accentPrimaryHover: '#1d4ed8',
  accentSecondary: '#2563eb',
  accentGreen: '#16a34a',
  accentGreenHover: '#15803d',
  accentPurple: '#7c3aed',
  accentRed: '#dc2626',
  accentRedHover: '#b91c1c',

  shadowSm: '0 1px 2px rgba(24, 24, 27, 0.04)',
  shadowMd: '0 1px 3px rgba(24, 24, 27, 0.04), 0 4px 12px rgba(24, 24, 27, 0.05)',
  shadowLg: '0 2px 6px rgba(24, 24, 27, 0.04), 0 12px 32px rgba(24, 24, 27, 0.08)',
  shadowAccent: '0 4px 14px rgba(37, 99, 235, 0.22)',
  shadowAccentHover: '0 8px 24px rgba(37, 99, 235, 0.3)',

  profileBorder: '#f4f4f5',
  timelineDotBorder: '#ffffff',
  scrollbarThumb: '#d4d4d8',
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
