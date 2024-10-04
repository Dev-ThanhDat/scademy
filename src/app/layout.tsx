import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.scss';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
});

export const metadata: Metadata = {
  title: {
    template: 'Scademy | %s',
    default: 'Scademy'
  },
  description:
    'This is a project to design an ELearing page on the Frontend side, using server actions.',
  openGraph: {
    url: 'https://scademy.ptd-dev.click/',
    siteName: 'Scademy',
    images: [
      {
        url: 'https://res.cloudinary.com/dzdycjg8q/image/upload/v1728364398/Scademy/scademy_hqjgt6.jpg',
        width: 1911,
        height: 877
      }
    ],
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang='vi'
        suppressHydrationWarning
      >
        <body className={`${manrope.variable}`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
