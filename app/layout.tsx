import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import cx from "classnames";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Questionnaire demo",
  description:
    "A questionnaire built with Next.js, Ant design, Postgress, Prisma and d3.js",
  openGraph: {
    title: "Questionnaire demo",
    description:
      "A questionnaire built with Next.js, Ant design, Postgress, Prisma and d3.js",
    images: [
      {
        url: "https://questionnaire-demo-six.vercel.app/questionnaire-screenshot.png",
        width: 1094,
        height: 931,
        alt: "A screenshot of the results page",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(inter.className, "min-h-screen")}>
        <ErrorBoundary errorComponent={Error}>
          <AntdRegistry>{children}</AntdRegistry>
        </ErrorBoundary>
      </body>
    </html>
  );
}
