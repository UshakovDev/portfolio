import { motion } from "framer-motion";

import Seo from "../../components/Seo";
import { fadeIn } from "../../variants";

const Testimonials = () => {
  return (
    <>
      <Seo
        title="Отзывы - раздел готовится | Дмитрий Ушаков"
        description="Раздел подтверждённых отзывов о работе Дмитрия Ушакова находится в подготовке."
        path="/testimonials/"
        noIndex
      />

      <div className="min-h-full bg-primary/30 px-4 pb-20 pt-40 text-center md:pt-48">
        <motion.section
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-sm md:p-12"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Отзывы
          </p>
          <h1 className="mb-5 text-3xl font-semibold md:text-5xl">Раздел готовится</h1>
          <p className="text-base text-white/70 md:text-lg">
            Здесь будут опубликованы только подтверждённые отзывы с разрешения авторов.
          </p>
        </motion.section>
      </div>
    </>
  );
};

Testimonials.useScrollableLayout = true;

export default Testimonials;
