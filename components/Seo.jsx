import Head from "next/head";

export const SITE_URL = "https://ushakovdev.github.io/portfolio";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_SITE_TITLE = "Дмитрий Ушаков | Веб-разработчик";
export const DEFAULT_SITE_DESCRIPTION =
  "Дмитрий Ушаков - веб-разработчик с опытом работы с Bitrix, React, Python и PHP. Создаю решения, которые работают.";

export function getCanonicalUrl(path = "/") {
  const pathname = String(path || "/").split(/[?#]/)[0];
  const normalized = pathname === "/" ? "" : pathname.replace(/^\/+|\/+$/g, "");
  return normalized ? `${SITE_URL}/${normalized}/` : `${SITE_URL}/`;
}

export function getAbsoluteImageUrl(image = DEFAULT_OG_IMAGE) {
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

const Seo = ({
  title = DEFAULT_SITE_TITLE,
  description = DEFAULT_SITE_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}) => {
  const canonical = getCanonicalUrl(path);
  const imageUrl = getAbsoluteImageUrl(image);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <link key="canonical" rel="canonical" href={canonical} />

      <meta key="og-type" property="og:type" content={type} />
      <meta key="og-title" property="og:title" content={title} />
      <meta key="og-description" property="og:description" content={description} />
      <meta key="og-url" property="og:url" content={canonical} />
      <meta key="og-image" property="og:image" content={imageUrl} />

      <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter-title" name="twitter:title" content={title} />
      <meta key="twitter-description" name="twitter:description" content={description} />
      <meta key="twitter-image" name="twitter:image" content={imageUrl} />

      {noIndex ? <meta key="robots" name="robots" content="noindex,follow" /> : null}
    </Head>
  );
};

export default Seo;
