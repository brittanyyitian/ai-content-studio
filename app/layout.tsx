import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "潮汐内容台",
    template: "%s · 潮汐内容台",
  },
  description: "AI 内容团队的选题、审核、发布与复盘工作台",
  openGraph: {
    title: "潮汐内容台",
    description: "把全球 AI 热点变成可审核、可追溯、可复盘的内容",
    images: [{ url: "/og.png", width: 1730, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "潮汐内容台",
    description: "AI 内容团队的选题、审核、发布与复盘工作台",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
