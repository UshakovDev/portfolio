import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const workSlides = {
  slides: [
    {
      images: [
        {
          title: "ushakov.cookie",
          path: "/ushakov.cookie.png",
          link: "https://github.com/UshakovDev/ushakov.cookie",
          description: "Личный проект",
        },
        {
          title: "ushakov.telegram",
          path: "/ushakov.telegram.png",
          link: "https://github.com/UshakovDev/ushakov.telegram",
          description: "Личный проект",
        },
        {
          title: "Anonymous-Telegram-chatbot",
          path: "/Anonymous-Telegram-chatbot.png",
          link: "https://github.com/UshakovDev/Anonymous-Telegram-chatbot",
          description: "Личный проект",
        },
        {
          title: "youtube-proxy",
          path: "/youtube-proxy.png",
          link: "https://github.com/UshakovDev/youtube-proxy",
          description: "Личный проект",
        },
      ],
    },
    {
      images: [
        {
          title: "arsenal-rent.ru",
          path: "/arsenal-rent.ru.png",
          link: "https://arsenal-rent.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "asyastroy.ru",
          path: "/asyastroy.ru.png",
          link: "https://asyastroy.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "faw28.ru",
          path: "/faw28.ru.png",
          link: "https://faw28.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "snab28.ru",
          path: "/snab28.ru.png",
          link: "https://snab28.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
      ],
    },
    {
      images: [
        {
          title: "xn--28-jlcdu4bn.xn--p1ai",
          path: "/xn--28-jlcdu4bn.xn--p1ai.png",
          link: "https://xn--28-jlcdu4bn.xn--p1ai",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "endoscopia28.ru",
          path: "/endoscopia28.ru.png",
          link: "https://endoscopia28.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "tvoyaapteka.ru",
          path: "/tvoyaapteka.ru.png",
          link: "https://www.tvoyaapteka.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "mmill.ru",
          path: "/mmill.ru.png",
          link: "https://mmill.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
      ],
    },
    {
      images: [
        {
          title: "shtormauto.ru",
          path: "/shtormauto.ru.png",
          link: "https://shtormauto.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "domobuvi.shop",
          path: "/domobuvi.shop.png",
          link: "https://domobuvi.shop",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "berloga28.ru",
          path: "/berloga28.ru.png",
          link: "https://berloga28.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
        {
          title: "realvita.ru",
          path: "/realvita.ru.png",
          link: "https://realvita.ru",
          description: "Коммерческий проект (работал в команде SP-ArtGroup)",
        },
      ],
    },
  ],
};

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="h-[280px] sm:h-[480px]"
    >
      {workSlides.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {slide.images.map((image, imageI) => (
              <div
                className="relative rounded-lg overflow-hidden flex items-center justify-center group"
                key={imageI}
              >
                <div className="flex items-center justify-center relative overflow-hidden group">
                  {/* image */}
                  <Image
                    src={image.path}
                    alt={image.title}
                    width={500}
                    height={300}
                  />

                  {/* overlay gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700"
                    aria-hidden
                  />

                  {/* overlay content: description + icon */}
                  <div className="absolute inset-0 left-0 w-full flex items-center justify-center translate-y-[60%] group-hover:translate-y-0 transition-all duration-300">
                    <Link
                      href={image.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center gap-x-2 text-[13px] tracking-[0.2em] text-center px-3"
                    >
                      {/* description */}
                      <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-100 whitespace-pre-line">
                        {(image.description || "").replace(" (", "\n(")}
                      </div>
                      {/* icon */}
                      <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                        <BsArrowRight aria-hidden />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
