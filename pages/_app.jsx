import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../components/Layout";
import ScrollableLayout from "../components/ScrollableLayout";
import Transition from "../components/Transition";
import MediaPlayer from "../components/MediaPlayer";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAbout = router.pathname.startsWith("/about");
  const wantsScrollable = isAbout || Component.useScrollableLayout === true;
  const AppLayout = wantsScrollable ? ScrollableLayout : Layout;

  return (
    <AppLayout>
      <Head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`} />
      </Head>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} className="h-full">
          <Transition />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      {/* Глобальный медиа-плеер */}
      <MediaPlayer />
    </AppLayout>
  );
}

export default MyApp;
