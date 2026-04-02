// Server component — renders a blocking <style> with theme CSS variables.
// This is static HTML, not dependent on JS, so variables are available immediately.

import { lightTokens, darkTokens, generateCSSVariables } from './tokens';

export function ThemeStyle() {
  const css = `
[data-theme="light"] {
  ${generateCSSVariables(lightTokens)}
  color-scheme: light;
}

[data-theme="dark"] {
  ${generateCSSVariables(darkTokens)}
  color-scheme: dark;
}
`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
