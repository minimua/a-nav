import { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

const lxgw = localFont({
  src: './fonts/LXGWWenKai-Regular.ttf',
  display: 'swap',
  variable: '--font-lxgw',
});

export const metadata: Metadata = {
  title: "一个导航",
  description: "A modern web navigation site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={lxgw.className}>{children}</body>
    </html>
  );
}