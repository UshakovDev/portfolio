import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../components/Layout";
import ScrollableLayout from "../components/ScrollableLayout";
import Transition from "../components/Transition";
import MediaPlayer from "../components/MediaPlayer";

import "../styles/globals.css";

// Абсолютный адрес продакшн-сайта (для Open Graph / canonical / JSON-LD)
const SITE_URL = "https://ushakovdev.github.io/portfolio";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const SITE_TITLE = "Дмитрий Ушаков | Веб-разработчик";
const SITE_DESCRIPTION =
  "Дмитрий Ушаков — веб-разработчик с опытом работы с Bitrix, React, Python, PHP. Создаю решения, которые работают.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Дмитрий Ушаков",
  jobTitle: "Веб-разработчик",
  url: SITE_URL,
  image: OG_IMAGE,
  sameAs: [
    "https://github.com/UshakovDev",
    "https://t.me/user_four",
    "https://www.instagram.com/ushakovdima96",
  ],
  knowsAbout: ["Bitrix", "React", "Next.js", "Python", "PHP", "MySQL", "PostgreSQL", "Docker"],
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAbout = router.pathname.startsWith("/about");
  const wantsScrollable = isAbout || Component.useScrollableLayout === true;
  const AppLayout = wantsScrollable ? ScrollableLayout : Layout;

  return (
    <MotionConfig reducedMotion="user">
      {/* Глобальный медиа-плеер - вынесен вне AppLayout, чтобы не пересоздавался при смене лейаута */}
      <MediaPlayer />

      <AppLayout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`} />

          {/* Open Graph (дефолты; страницы переопределяют title/description) */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Дмитрий Ушаков — Портфолио" />
          <meta property="og:title" content={SITE_TITLE} />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          <meta property="og:url" content={SITE_URL} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:locale" content="ru_RU" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={SITE_TITLE} />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
          <meta name="twitter:image" content={OG_IMAGE} />

          <link rel="canonical" href={`${SITE_URL}/`} />

          {/* Структурированные данные */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </Head>
        <AnimatePresence mode="wait">
          <motion.div key={router.route} className="h-full">
            <Transition />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </AppLayout>
    </MotionConfig>
  );
}

export default MyApp;
