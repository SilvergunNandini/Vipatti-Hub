import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth"
import { LanguageProvider } from "@/lib/language-context"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Vipatti-Hub - Community Emergency Response Platform",
  description:
    "Vipatti-Hub - Connect with your community, find resources, and get critical information during emergencies in India.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress MetaMask and other extension errors
              window.addEventListener('error', function(e) {
                const extensionErrors = [
                  'MetaMask',
                  'ChromeTransport',
                  'connectChrome',
                  'extension not found',
                  'chrome-extension',
                  'moz-extension',
                  'safari-extension'
                ];
                
                const isExtensionError = extensionErrors.some(keyword => 
                  e.message?.toLowerCase().includes(keyword.toLowerCase()) ||
                  e.error?.message?.toLowerCase().includes(keyword.toLowerCase())
                );
                
                if (isExtensionError) {
                  e.preventDefault();
                  e.stopPropagation();
                  console.warn('Browser extension error suppressed:', e.message);
                  return false;
                }
              });
              
              window.addEventListener('unhandledrejection', function(e) {
                const extensionErrors = [
                  'MetaMask',
                  'ChromeTransport',
                  'connectChrome',
                  'extension not found',
                  'chrome-extension',
                  'moz-extension',
                  'safari-extension'
                ];
                
                const isExtensionError = extensionErrors.some(keyword => 
                  e.reason?.message?.toLowerCase().includes(keyword.toLowerCase()) ||
                  String(e.reason)?.toLowerCase().includes(keyword.toLowerCase())
                );
                
                if (isExtensionError) {
                  e.preventDefault();
                  console.warn('Browser extension promise rejection suppressed:', e.reason);
                  return false;
                }
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <AuthProvider>
                <div suppressHydrationWarning className="app-content">
                  {children}
                </div>
                <Toaster />
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
