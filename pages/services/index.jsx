import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import Seo from "../../components/Seo";
import ServiceGrid from "../../components/ServiceGrid";
import { serviceProcess } from "../../data/services.mjs";
import { fadeIn } from "../../variants";

const Services = () => {
  return (
    <>
      <Seo
        title="Услуги веб-разработчика | Дмитрий Ушаков"
        description="Диагностика сайтов, доработки и интеграции, техническая поддержка и постепенное развитие существующих веб-проектов."
        path="/services/"
      />

      <div className="relative min-h-full overflow-hidden bg-primary/30 pb-16 pt-40 md:pb-24 md:pt-44">
        <Circles />

        <div className="container relative z-10 mx-auto">
          <motion.header
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Услуги
            </p>
            <h1 className="h2">Чем могу помочь</h1>
            <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
              Подключаюсь к отдельным задачам и небольшим проектам: разбираюсь в текущем
              решении, согласовываю понятный объём работ и довожу изменения до проверки.
            </p>
          </motion.header>

          <motion.div
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <ServiceGrid />
          </motion.div>

          <section className="mx-auto mt-16 max-w-5xl md:mt-24" aria-labelledby="process-heading">
            <div className="mb-8 text-center">
              <h2 id="process-heading" className="text-3xl font-semibold md:text-4xl">
                Как строится работа
              </h2>
              <p className="mt-3 text-white/65">
                Без сложных пакетов и формальных обещаний до знакомства с задачей.
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {serviceProcess.map((step, index) => (
                <li
                  key={step.id}
                  className="rounded-2xl border border-white/10 bg-primary/45 p-5"
                >
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold">
                    {index + 1}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-white/65">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mx-auto mt-16 max-w-3xl rounded-3xl border border-accent/30 bg-accent/10 p-7 text-center md:mt-24 md:p-10">
            <h2 className="mb-3 text-2xl font-semibold md:text-3xl">Есть задача для обсуждения?</h2>
            <p className="mb-6 text-white/70">
              Рассматриваю отдельные задачи и небольшие проекты. Сроки и формат работы
              определяю после обсуждения.
            </p>
            <Link
              href="/contact/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent/80"
            >
              Обсудить задачу
              <HiArrowRight aria-hidden />
            </Link>
          </section>
        </div>

        <Bulb />
      </div>
    </>
  );
};

Services.useScrollableLayout = true;

export default Services;
