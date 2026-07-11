import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiArrowTopRightOnSquare } from "react-icons/hi2";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const ProjectCard = ({ project, categoryLabel }) => {
  const primaryHref = project.caseSlug
    ? `/work/${project.caseSlug}/`
    : project.repositoryUrl || project.projectUrl;
  const primaryIsExternal = !project.caseSlug && Boolean(primaryHref);
  const secondaryHref = project.caseSlug
    ? project.projectUrl || project.repositoryUrl
    : project.repositoryUrl && project.projectUrl
      ? project.projectUrl
      : null;
  const secondaryLabel = secondaryHref === project.repositoryUrl ? "Репозиторий" : "Открыть сайт";

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="relative aspect-video overflow-hidden bg-primary/60">
        <Image
          src={`${base}${project.image}`}
          alt={`Превью проекта ${project.title}`}
          width={1280}
          height={720}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-accent/15 px-3 py-1 text-accent">{categoryLabel}</span>
          {project.isPlaceholder ? (
            <span className="rounded-full bg-amber-400/15 px-3 py-1 text-amber-200">
              Демонстрационные данные
            </span>
          ) : null}
          {project.contentStatus === "draft" ? (
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/70">
              Черновик описания
            </span>
          ) : null}
        </div>

        <h2 className="mb-3 break-words text-2xl font-semibold">{project.title}</h2>
        <p className="mb-5 text-white/70">{project.summary}</p>

        <dl className="mb-5 space-y-4 text-sm">
          <div>
            <dt className="mb-1 font-semibold text-white">Моя роль</dt>
            <dd className="text-white/65">{project.role}</dd>
          </div>
          <div>
            <dt className="mb-1 font-semibold text-white">Результат</dt>
            <dd className="text-white/65">{project.result}</dd>
          </div>
        </dl>

        <div className="mb-6 flex flex-wrap gap-2" aria-label="Технологии проекта">
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-white/10 bg-primary/40 px-2.5 py-1 text-xs text-white/75"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          {primaryHref ? (
            <Link
              href={primaryHref}
              target={primaryIsExternal ? "_blank" : undefined}
              rel={primaryIsExternal ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-white transition-colors hover:bg-accent/80"
            >
              Подробнее
              {primaryIsExternal ? <HiArrowTopRightOnSquare aria-hidden /> : <HiArrowRight aria-hidden />}
            </Link>
          ) : null}

          {secondaryHref ? (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-accent hover:text-accent"
            >
              {secondaryLabel}
              <HiArrowTopRightOnSquare aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
