import { Metadata } from 'next';
import './globals.css';

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
      <body className="font-['LXGW_WenKai'] antialiased">{children}</body>
    </html>
  );
}