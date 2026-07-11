import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../components/Layout";
import ScrollableLayout from "../components/ScrollableLayout";
import Transition from "../components/Transition";
import MediaPlayer from "../components/MediaPlayer";
import Seo, {
  DEFAULT_OG_IMAGE,
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_TITLE,
  SITE_URL,
} from "../components/Seo";

import "../styles/globals.css";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Дмитрий Ушаков",
  jobTitle: "Веб-разработчик",
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
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
  const pageKey = (router.asPath || router.route).split(/[?#]/)[0];

  return (
    <MotionConfig reducedMotion="user">
      {/* Глобальный медиа-плеер - вынесен вне AppLayout, чтобы не пересоздавался при смене лейаута */}
      <MediaPlayer />

      <AppLayout>
        <Seo
          title={DEFAULT_SITE_TITLE}
          description={DEFAULT_SITE_DESCRIPTION}
          path={pageKey}
        />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`} />
          <meta name="author" content="Дмитрий Ушаков" />
          <meta name="theme-color" content="#f13024" />
          <meta key="og-site-name" property="og:site_name" content="Дмитрий Ушаков — Портфолио" />
          <meta key="og-locale" property="og:locale" content="ru_RU" />

          {/* Структурированные данные */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </Head>
        <AnimatePresence mode="wait">
          <motion.div key={pageKey} className="h-full">
            <Transition />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </AppLayout>
    </MotionConfig>
  );
}

export default MyApp;
