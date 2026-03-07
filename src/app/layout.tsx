import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google"; // Dùng font Google xịn hơn
import "./globals.css";

// Font cho tiêu đề (Serif) - Sang trọng
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"], // Quan trọng: Thêm vietnamese
  display: "swap",
});

// Font cho nội dung (Sans) - Hiện đại, dễ đọc
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"], // Quan trọng: Thêm vietnamese
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nhật Ký Hành Trình",
  description: "Một trang web kể chuyện du lịch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
