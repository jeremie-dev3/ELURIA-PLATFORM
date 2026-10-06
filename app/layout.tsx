import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eluria Investor Relations',
  description: 'Explore verified industrial and infrastructure investment projects.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}