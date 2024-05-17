import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import cx from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Questionnaire demo",
  description:
    "A questionnaire built with Next.js, Ant design, Postgress, Prisma and d3.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(inter.className, "min-h-screen")}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
