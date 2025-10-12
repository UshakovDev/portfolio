/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Статический экспорт для GitHub Pages
  output: "export",
  // Отключаем оптимизацию изображений (нужна для static export)
  images: { unoptimized: true },
  // Базовый путь и префикс ассетов для GitHub Pages (репозиторий: /portfolio)
  basePath: isProd ? "/portfolio" : "",
  assetPrefix: isProd ? "/portfolio" : "",
  // Надёжнее для GitHub Pages
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/portfolio" : "",
  },
};

module.exports = nextConfig;
