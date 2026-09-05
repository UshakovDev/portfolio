import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import ProjectGallery from "../../components/ProjectGallery";
import Seo from "../../components/Seo";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <>
      <Seo
        title="Проекты и кейсы | Дмитрий Ушаков"
        description="Собственные разработки, самостоятельные заказы и проекты, выполненные Дмитрием Ушаковым в составе команды."
        path="/work/"
      />

      <div className="relative min-h-full overflow-hidden bg-primary/30 pb-16 pt-40 md:pb-24 md:pt-44">
        <Circles />

        <div className="container relative z-10 mx-auto">
          <motion.header
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-10 max-w-3xl"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Опыт и результаты
            </p>
            <h1 id="projects-heading" className="h2">
              Проекты и участие
            </h1>
            <p className="max-w-2xl text-base text-white/70 md:text-lg">
              Здесь отдельно показаны собственные разработки, прямые клиентские задачи и
              проекты, над которыми я работал вместе с командой.
            </p>
          </motion.header>

          <motion.div
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <ProjectGallery />
          </motion.div>
        </div>

        <Bulb />
      </div>
    </>
  );
};

Work.useScrollableLayout = true;

export default Work;
