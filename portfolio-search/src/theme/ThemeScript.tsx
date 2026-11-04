// Server component - renders a blocking <script> to prevent a flash of the wrong theme.
// Runs before React hydrates and sets data-theme on <html> from the system preference.

export function ThemeScript() {
  const script = `
(function() {
  try {
    document.documentElement.dataset.theme =
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
