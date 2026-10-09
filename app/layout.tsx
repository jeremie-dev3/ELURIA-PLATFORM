import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eluria Group | Infrastructure, Engineering & Investment',
  description: 'Explore Eluria Group services, project portfolio, and investment opportunities across Africa.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}