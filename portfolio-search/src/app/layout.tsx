import StyledComponentsRegistry from '../lib/registry';
import TabManager from '../components/TabManager';
import { GlobalStyle } from '../components/HomePage/GlobalStyles';
import { ThemeScript } from '../theme/ThemeScript';
import { ThemeProvider } from '../theme/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet" />
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
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
