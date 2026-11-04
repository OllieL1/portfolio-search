// Tiny window-event bus so unrelated components (footer, sidebar, shortcuts,
// progress bar) can talk without threading props or context through the tree.

export const UI_EVENTS = {
  openShortcuts: 'ui:open-shortcuts',
  openSearch: 'ui:open-search',
  toggleSidebar: 'ui:toggle-sidebar',
  navStart: 'ui:nav-start',
} as const;

type UIEvent = (typeof UI_EVENTS)[keyof typeof UI_EVENTS];

export const emit = (event: UIEvent) => {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(event));
};

export const listen = (event: UIEvent, handler: () => void) => {
  window.addEventListener(event, handler);
  return () => window.removeEventListener(event, handler);
};
