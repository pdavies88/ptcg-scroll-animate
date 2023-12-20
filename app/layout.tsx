import type { Metadata } from 'next';
import { Open_Sans, Roboto_Mono } from 'next/font/google';

import './globals.css';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Pokemon TCG Showcase',
  description: 'Your favorite Pokemon, all in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${openSans.variable} ${robotoMono.variable} font-sans`}
    >
      <body>
        <main className='max-w-7xl mx-auto bg-red-950 relative'>
          <Navigation />
          <Hero />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
