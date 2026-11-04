import type { Metadata } from 'next';
import { Inter, Roboto_Slab } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '../lib/registry';
import TabManager from '../components/TabManager';
import SpotlightSearch from '../components/SpotlightSearch';
import ShortcutsProvider from '../components/ShortcutsProvider';
import { GlobalStyle } from '../components/HomePage/GlobalStyles';
import { ThemeScript } from '../theme/ThemeScript';
import { ThemeStyle } from '../theme/ThemeStyle';
import { ThemeProvider } from '../theme/ThemeContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const robotoSlab = Roboto_Slab({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

const description =
  'Ollie Livingston - software engineer. Search through my experience, projects and education.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Ollie Livingston', template: '%s · Ollie Livingston' },
  description,
  applicationName: 'Ollie Livingston',
  authors: [{ name: 'Ollie Livingston' }],
  openGraph: {
    type: 'website',
    siteName: 'Ollie Livingston',
    title: 'Ollie Livingston',
    description,
    images: [{ url: '/portfolio-pfp.jpg', alt: 'Ollie Livingston' }],
  },
  twitter: { card: 'summary', title: 'Ollie Livingston', description },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`} suppressHydrationWarning>
      <head>
        <ThemeStyle />
      </head>
      <body>
        <ThemeScript />
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyle />
            <TabManager>
              {children}
            </TabManager>
            <SpotlightSearch />
            <ShortcutsProvider />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
