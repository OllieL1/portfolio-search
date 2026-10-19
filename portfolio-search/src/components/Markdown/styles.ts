import styled from 'styled-components';

export const MarkdownContainer = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-detail);

  > :first-child {
    margin-top: 0;
  }

  p,
  ul,
  ol,
  blockquote,
  pre,
  table {
    margin: 0 0 1rem;
  }

  h1,
  h2,
  h3,
  h4 {
    color: var(--text-primary);
    line-height: 1.3;
    margin: 1.5rem 0 0.75rem;
  }

  ul,
  ol {
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.35rem;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 3px solid var(--border-color, currentColor);
    opacity: 0.85;
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9em;
    padding: 0.1em 0.35em;
    border-radius: 4px;
    background: rgba(127, 127, 127, 0.15);
  }

  pre {
    overflow-x: auto;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    background: rgba(127, 127, 127, 0.15);

    code {
      padding: 0;
      background: none;
    }
  }

  table {
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
  }

  th,
  td {
    padding: 0.4rem 0.75rem;
    border: 1px solid rgba(127, 127, 127, 0.3);
  }

  img {
    max-width: 100%;
  }
`;
