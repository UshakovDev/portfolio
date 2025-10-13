import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";

import Header from "./Header";
import Nav from "./Nav";
import TopLeftImg from "./TopLeftImg";

// setup font
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const ScrollableLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('scrollable');
    return () => {
      document.body.classList.remove('scrollable');
    };
  }, []);

  return (
    <main
      className={`h-screen overflow-y-auto overflow-x-hidden bg-site text-white bg-cover bg-no-repeat ${inter.variable} font-inter relative isolate`}
    >
      {/* metadata */}
      <Head>
        <title>Ushakov | Portfolio</title>
        <meta
          name="description"
          content="Дмитрий Ушаков - веб-разработчик с опытом работы с Bitrix, React, Python, PHP. Специализируюсь на создании решений, которые работают."
        />
        <meta
          name="keywords"
          content="веб-разработчик, bitrix, react, python, php, mysql, postgresql, docker, nginx, fullstack, портфолио, разработка сайтов"
        />
        <meta name="author" content="Дмитрий Ушаков" />
        <meta name="theme-color" content="#f13024" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`} />
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
      {/* dynamic spacer equal to bottom nav height on mobile */}
      <div aria-hidden className="xl:hidden" style={{ height: "var(--bottom-bar-height, 112px)" }} />
    </main>
  );
};

export default ScrollableLayout;
