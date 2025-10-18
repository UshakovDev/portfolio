import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaReact,
  FaBootstrap,
  FaDocker,
  FaLinux,
  FaWindows,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiDjango,
  SiNginx,
  SiApache,
  SiRedis,
  SiPostgresql,
  SiMysql,
  SiPython,
  SiPhp,
  SiCelery,
  SiGunicorn,
} from "react-icons/si";

// import Avatar from "../../components/Avatar";
// Circles рендерится из ScrollableLayout (фикс iOS blend)
import { fadeIn } from "../../variants";
import BitrixIcon from "../../components/BitrixIcon";

 

//  data
export const aboutData = [
  {
    title: "скилы",
    info: [
      {
        title: "Frontend Development",
        icons: [
          FaHtml5,
          FaCss3,
          FaJs,
          FaReact,
          SiNextdotjs,
          FaBootstrap,
          FaFigma,
        ],
      },
      {
        title: "Backend Development",
        icons: [
          SiPython,
          SiPhp,
          SiDjango,
          SiMysql,
          SiPostgresql,
          SiRedis,
          SiCelery,
          BitrixIcon,
        ],
      },
      {
        title: "DevOps & Infrastructure",
        icons: [
          FaDocker,
          SiNginx,
          SiApache,
          SiGunicorn,
          FaLinux,
          FaWindows,
        ],
      },
    ],
  },
  {
    title: "достижения",
    info: [
      {
        icon: "🧩",
        title: "Pet-проекты",
        text: "Реализовал собственные решения и эксперименты с Bitrix, React и другими технологиями."
      },
      {
        icon: "📘",
        title: "Документация",
        text: "Улучшил внутренние процессы в команде через системное описание проектов и фич."
      },
      {
        icon: "⚙️",
        title: "Развитие",
        text: "Самостоятельно освоил новые фреймворки и инструменты, расширив стек технологий."
      },
    ],
  },
  {
    title: "опыт",
    info: [
      {
        title: "Web-разработчик - СП-ГРУП",
        stage: "2024 - 2025",
      },
      {
        title: "Full Stack разработчик - самообучение",
        stage: "2023 - 2024",
      },
    ],
  },
  {
    title: "сертификаты",
    info: [
      {
        icon: BitrixIcon,
        title: "Разработчик - Bitrix Framework",
        stage: "2024",
        url: "https://drive.google.com/file/d/1yFebpXZf7lqu_tmLFkC0eu9_1qtw7dUh/view?usp=sharing",
      },
      {
        title: "Администратор. Бизнес - Bitrix",
        stage: "2024",
        icon: BitrixIcon,
        url: "https://drive.google.com/file/d/16RJ19GbGnAnfgGPenfNA5Tlj_i2uvkT5/view?usp=sharing",
      },
      {
        title: "Администратор. Модули - Bitrix",
        stage: "2024",
        icon: BitrixIcon,
        url: "https://drive.google.com/file/d/16RJ19GbGnAnfgGPenfNA5Tlj_i2uvkT5/view?usp=sharing",
      },
      {
        title: "Администратор. Базовый - Bitrix",
        stage: "2024",
        icon: BitrixIcon,
        url: "https://drive.google.com/file/d/1xJ4kwjVT-K_zDZdx3b8BEiAUEtW--O14/view?usp=sharing",
      },
      {
        title: "Контент-менеджер - Bitrix",
        stage: "2024",
        icon: BitrixIcon,
        url: "https://drive.google.com/file/d/13WJols4k-6GgK2HOxypfuXdposI0RmhF/view?usp=sharing",
      },
      {
        title: "Introduction to Python - Stepik",
        stage: "2023",
        icon: SiPython,
        url: "https://www.sololearn.com/certificates/CC-UKE2DBF4",
      },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">

      {/* avatar img */}
      {/* <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div> */}

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 xl:mt-10">
        {/* text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Каждая <span className="text-accent">задача</span>
            <br /> это возможность <br /> для роста.
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
          >
            Мой путь начался с самообучения и первых практических проектов.
            Сейчас я Web-разработчик, создающий сайты, 
            боты и сервисы с акцентом на стабильность, удобство и безопасность.
          </motion.p>

          {/* counters */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {/* experience */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={2} duration={10} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Года <br /> опыта.
                </div>
              </div>

              {/* clients */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={20} duration={10} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Участий в проектах.
                </div>
              </div>

              {/* projects */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={250} duration={10} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Выполненных задач.
                </div>
              </div>

              {/* awards */}
              <div className="relative flex-1">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={5} duration={10} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Личных проектов.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* info */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4 pointer-events-auto">
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                className={`${
                  index === itemI &&
                  "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0 pointer-events-auto`}
                onClick={() => setIndex(itemI)}
                // onClick={() => {
                //   console.log('Tab clicked:', item.title, itemI);
                //   setIndex(itemI);
                // }}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-center text-white/60"
              >
                {item.text ? (
                  <div className="flex items-start gap-x-3 text-left">
                    <div className="text-2xl leading-none">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-sm text-white/60 max-w-[520px]">{item.text}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* icon (single) + title + optional stage in one row; make row clickable if url provided */}
                    {item.url && item.icon ? (
                      <a href={item.url} target="_blank" rel="noreferrer noopener" className="block">
                        <div className={`flex items-center gap-x-2 ${item.icon === SiPython ? "xl:ml-[7px]" : ""} ${!item.icon && !item.icons?.length && item.stage ? "flex-wrap md:flex-nowrap" : ""}`}>
                          {item.icon
                            ? (() => {
                                const SingleIcon = item.icon;
                                const isBitrix = SingleIcon === BitrixIcon;
                                const isPython = SingleIcon === SiPython;
                                const adjustClass = isBitrix ? "xl:relative xl:top-[7px]" : "";
                                const sizeClass = isBitrix ? "w-10 h-10" : isPython ? "w-7 h-7" : "w-9 h-9";
                                return (
                                  <div className={`${sizeClass} hidden xl:flex items-center justify-center text-white flex-shrink-0 ${adjustClass}`}>
                                    <SingleIcon className="w-full h-full object-contain" size={24} />
                                  </div>
                                );
                              })()
                            : null}
                          <div className={`font-light mb-0 ${item.icon === SiPython ? "xl:ml-[4px]" : ""} ${!item.icon && !item.icons?.length && item.stage ? "w-full md:w-auto" : ""}`}>{item.title}</div>
                          {item.stage ? (
                            <>
                              <div className={`hidden md:flex ${item.icon === SiPython ? "xl:ml-[4px]" : ""}`}>-</div>
                              <div className={`${item.icon === SiPython ? "xl:ml-[4px]" : ""} ${!item.icon && !item.icons?.length ? "w-full text-center md:w-auto md:text-left" : ""}`}>{item.stage}</div>
                            </>
                          ) : null}
                        </div>
                      </a>
                    ) : (
                      <div className={`flex items-center gap-x-2 ${item.icon === SiPython ? "xl:ml-[7px]" : ""} ${!item.icon && !item.icons?.length && item.stage ? "flex-wrap md:flex-nowrap" : ""}`}>
                        {item.icon
                          ? (() => {
                              const SingleIcon = item.icon;
                              const isBitrix = SingleIcon === BitrixIcon;
                              const isPython = SingleIcon === SiPython;
                              const adjustClass = isBitrix ? "xl:relative xl:top-[7px]" : "";
                              const sizeClass = isBitrix ? "w-10 h-10" : isPython ? "w-7 h-7" : "w-9 h-9";
                              return (
                                <div className={`${sizeClass} hidden xl:flex items-center justify-center text-white flex-shrink-0 ${adjustClass}`}>
                                  <SingleIcon className="w-full h-full object-contain" size={24} />
                                </div>
                              );
                            })()
                          : null}
                        <div className={`font-light mb-0 ${item.icon === SiPython ? "xl:ml-[4px]" : ""} ${!item.icon && !item.icons?.length && item.stage ? "w-full md:w-auto" : ""}`}>{item.title}</div>
                        {item.stage ? (
                          <>
                            <div className={`hidden md:flex ${item.icon === SiPython ? "xl:ml-[4px]" : ""}`}>-</div>
                            <div className={`${item.icon === SiPython ? "xl:ml-[4px]" : ""} ${!item.icon && !item.icons?.length ? "w-full text-center md:w-auto md:text-left" : ""}`}>{item.stage}</div>
                          </>
                        ) : null}
                      </div>
                    )}

                    {/* icons array inline for skills (no single icon) */}
                    {!item.icon && item.icons?.length ? (
                      <div className="flex items-center gap-x-4 ml-3">
                        {item.icons.map((Icon, iconI) => (
                          <div key={iconI} className="text-2xl leading-none text-white flex items-center justify-center">
                            {Icon === BitrixIcon ? (
                              <BitrixIcon className="w-[1.5em] h-[1.5em] object-contain align-middle relative top-[1px]" />
                            ) : (
                              <Icon />
                            )}
                    </div>
                  ))}
                </div>
                    ) : null}
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
