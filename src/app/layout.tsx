import './globals.css';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Provider from '@/context/AuthContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '900', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
});

export const metadata = {
  title: 'Бессмертный полк | Админ',
  description: 'Бессмертный полк',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>
        <main className="h-screen w-screen">
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </main>
      </body>
    </html>
  );
}
