import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'HomeSync',
  description: 'A modern smart home automation app offering seamless control and energy usage monitoring.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
