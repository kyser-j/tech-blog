import type { Metadata } from 'next';
import TopNav from '@/components/nav/top-nav';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Wayback Software Blog',
  description: 'Build complex software applications in public',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='bg-stone-100'>
        <TopNav />
        <main className='container mx-auto'>{children}</main>
      </body>
    </html>
  );
}
