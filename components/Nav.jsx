import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiEnvelope,
} from "react-icons/hi2";

// nav data
export const navData = [
  { name: "Главная", path: "/", Icon: HiHome },
  { name: "Обо мне", path: "/about", Icon: HiUser },
  { name: "Услуги", path: "/services", Icon: HiRectangleGroup },
  { name: "Проекты", path: "/work", Icon: HiViewColumns },
  {
    name: "Контакты",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

const Nav = () => {
  const pathname = usePathname();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const barRef = useRef(null);

  // Нормализуем текущий путь: убираем basePath и завершающий слэш
  let current = pathname || "/";
  if (base && current.startsWith(base)) current = current.slice(base.length) || "/";
  if (current.length > 1 && current.endsWith("/")) current = current.slice(0, -1);

  const isActive = (path) => {
    if (!path) return false;
    let p = path;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return current === p || (p !== "/" && current.startsWith(`${p}/`));
  };

  // Measure bottom bar height (mobile) and expose as CSS var
  useEffect(() => {
    const updateHeight = () => {
      const height = barRef.current?.getBoundingClientRect?.().height || 0;
      if (typeof window !== "undefined" && document?.documentElement?.style) {
        // Устанавливаем высоту только на мобильных (< 1200px), на десктопе 0
        const isMobile = window.innerWidth < 1200;
        document.documentElement.style.setProperty("--bottom-bar-height", isMobile ? `${height}px` : '0px');
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen text-white">
      <div ref={barRef} className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 bg-white/10 backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full text-white">
        {navData.map((link) => (
          <Link
            className={`${isActive(link.path) ? "text-accent" : ""} group relative flex min-h-11 min-w-11 items-center justify-center transition-all duration-300 hover:text-accent`}
            href={link.path}
            key={link.path}
            aria-label={link.name}
            aria-current={isActive(link.path) ? "page" : undefined}
          >
            {/* tolltip */}
            <div
              role="tooltip"
              className="absolute pr-14 right-0 hidden xl:group-hover:flex"
            >
              <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                <div className="text-[12px] leading-none font-semibold">
                  {link.name}
                </div>

                {/* triangle */}
                <div
                  className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"
                  aria-hidden
                />
              </div>
            </div>

            {/* icon */}
            <div className="text-inherit">
              <link.Icon aria-hidden />
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
