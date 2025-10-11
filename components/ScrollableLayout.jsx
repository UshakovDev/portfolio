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
      className={`h-screen overflow-y-auto bg-site text-white bg-cover bg-no-repeat ${inter.variable} font-inter relative`}
    >
      {/* metadata */}
      <Head>
        <title>Ethan Smith | Portfolio</title>
        <meta
          name="description"
          content="Ethan Smith is a Full-stack web developer with 10+ years of experience."
        />
        <meta
          name="keywords"
          content="react, next, nextjs, html, css, javascript, js, modern-ui, modern-ux, portfolio, framer-motion, 3d-website, particle-effect"
        />
        <meta name="author" content="Sanidhya Kumar Verma" />
        <meta name="theme-color" content="#f13024" />
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
    </main>
  );
};

export default ScrollableLayout;
