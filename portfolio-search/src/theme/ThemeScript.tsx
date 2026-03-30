// Server component — renders a blocking <script> to prevent FOUC.
// This runs before React hydrates, setting data-theme on <html> immediately.

export function ThemeScript() {
  const script = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' || stored === 'light' ? stored : null;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
