import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight, HiCheckCircle } from "react-icons/hi2";

import Seo from "../../components/Seo";
import { getCaseProjects, getProjectBySlug } from "../../data/projects.mjs";
import { fadeIn } from "../../variants";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const CasePage = ({ project }) => {
  const description = project.isPlaceholder
    ? `Демонстрационный кейс: ${project.summary}`
    : project.summary;

  return (
    <>
      <Seo
        title={`${project.title} | Кейс Дмитрия Ушакова`}
        description={description}
        path={`/work/${project.caseSlug}/`}
        image={project.image}
        type="article"
        noIndex={!project.published || project.isPlaceholder}
      />

      <article className="min-h-full bg-primary/30 pb-16 pt-40 md:pb-24 md:pt-44">
        <div className="container mx-auto max-w-5xl">
          <Link
            href="/work/#direct"
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-white/70 transition-colors hover:text-accent"
          >
            <HiArrowLeft aria-hidden />
            К самостоятельным заказам
          </Link>

          <motion.header
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-10"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
                Самостоятельный заказ
              </span>
              {project.isPlaceholder ? (
                <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-medium text-amber-200">
                  Тестовые данные — заменить перед публикацией
                </span>
              ) : null}
            </div>

            <h1 className="h2 max-w-4xl">{project.title}</h1>
            <p className="max-w-3xl text-base text-white/70 md:text-lg">{project.summary}</p>
          </motion.header>

          <div className="mb-12 overflow-hidden rounded-3xl border border-white/10 bg-primary/40">
            <Image
              src={`${base}${project.image}`}
              alt={`Превью кейса ${project.title}`}
              width={1280}
              height={720}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CaseSection title="О проекте или сфере клиента" content={project.case.about} />
            <CaseSection title="Исходная проблема" content={project.case.problem} />
            <CaseSection title="Что требовалось сделать" content={project.case.task} />
            <CaseSection title="Моя ответственность" content={project.case.responsibility} />
            <CaseSection title="Реализованное решение" content={project.case.solution} />
            <CaseSection title="Подтверждённый результат" content={project.case.result} />

            <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:col-span-2">
              <h2 className="mb-4 text-2xl font-semibold">Сложности и ограничения</h2>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {project.case.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-2 text-white/70">
                    <HiCheckCircle className="mt-1 shrink-0 text-accent" aria-hidden />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:col-span-2">
              <h2 className="mb-4 text-2xl font-semibold">Использованные технологии</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-white/10 bg-primary/50 px-3 py-2 text-sm text-white/75"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:col-span-2">
              <h2 className="mb-3 text-2xl font-semibold">Отзыв клиента</h2>
              {project.case.testimonial ? (
                <blockquote className="text-lg text-white/75">
                  «{project.case.testimonial}»
                </blockquote>
              ) : (
                <p className="text-white/65">
                  Отзыв не опубликован. Здесь появится только подтверждённый текст с разрешения
                  автора.
                </p>
              )}
            </section>
          </div>

          <section className="mt-12 rounded-3xl border border-accent/30 bg-accent/10 p-7 text-center md:p-10">
            <h2 className="mb-3 text-2xl font-semibold md:text-3xl">
              Нужно обсудить похожую задачу?
            </h2>
            <p className="mb-6 text-white/70">
              Опишите исходную ситуацию и желаемый результат — я уточню детали и предложу
              следующий шаг.
            </p>
            <Link
              href="/contact/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent/80"
            >
              Обсудить похожую задачу
              <HiArrowRight aria-hidden />
            </Link>
          </section>
        </div>
      </article>
    </>
  );
};

const CaseSection = ({ title, content }) => (
  <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
    <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
    <p className="text-white/70">{content}</p>
  </section>
);

export function getStaticPaths() {
  return {
    paths: getCaseProjects().map((project) => ({ params: { slug: project.caseSlug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { notFound: true };
  }

  return { props: { project } };
}

CasePage.useScrollableLayout = true;

export default CasePage;
