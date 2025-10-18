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
    // Сохраняем исходные классы body и аккуратно добавляем scrollable
    const original = document.body.className;
    if (!document.body.classList.contains('scrollable')) {
      document.body.classList.add('scrollable');
    }
    return () => {
      // Восстанавливаем исходные классы при размонтировании лейаута
      document.body.className = original;
    };
  }, []);

  return (
    <>
      {/* Вынесенные фиксированные элементы вне прокручиваемого контейнера */}
      <TopLeftImg />
      <Nav />

      <main
        className={`h-screen overflow-y-auto overflow-x-hidden bg-site text-white bg-cover bg-no-repeat ${inter.variable} font-inter relative`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* metadata — оставляем управление в _app.jsx */}

        <Header sticky />

        {/* main content */}
        {children}
        {/* dynamic spacer equal to bottom nav height on mobile */}
        <div aria-hidden className="xl:hidden" style={{ height: "var(--bottom-bar-height, 112px)" }} />
      </main>
    </>
  );
};

export default ScrollableLayout;
