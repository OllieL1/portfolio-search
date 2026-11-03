import { Inter, Roboto_Slab } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '../lib/registry';
import TabManager from '../components/TabManager';
import SpotlightSearch from '../components/SpotlightSearch';
import { GlobalStyle } from '../components/HomePage/GlobalStyles';
import { ThemeScript } from '../theme/ThemeScript';
import { ThemeStyle } from '../theme/ThemeStyle';
import { ThemeProvider } from '../theme/ThemeContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const robotoSlab = Roboto_Slab({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`} suppressHydrationWarning>
      <head>
        <ThemeStyle />
        <title>Ollie Livingston</title>
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
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
