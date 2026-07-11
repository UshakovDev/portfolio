import Link from "next/link";
import {
  HiArrowRight,
  HiArrowTrendingUp,
  HiCheckCircle,
  HiMagnifyingGlass,
  HiWrenchScrewdriver,
} from "react-icons/hi2";

import { services } from "../data/services.mjs";

const serviceIcons = {
  diagnostics: HiMagnifyingGlass,
  integrations: HiWrenchScrewdriver,
  support: HiArrowTrendingUp,
};

const ServiceGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = serviceIcons[service.id];

        return (
          <article
            key={service.id}
            className="flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 hover:bg-white/[0.09] md:p-8"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-2xl text-accent">
              <Icon aria-hidden />
            </div>

            <h2 className="mb-3 text-2xl font-semibold">{service.title}</h2>
            <p className="mb-5 text-white/70">{service.description}</p>

            <ul className="mb-7 flex flex-1 flex-col gap-3 text-sm text-white/70">
              {service.tasks.map((task) => (
                <li key={task} className="flex items-start gap-2">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-lg text-accent" aria-hidden />
                  <span>{task}</span>
                </li>
              ))}
            </ul>

            <Link
              href={service.projectsHref}
              className="inline-flex min-h-11 items-center gap-2 self-start font-medium text-white transition-colors hover:text-accent"
            >
              Посмотреть примеры
              <HiArrowRight aria-hidden />
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default ServiceGrid;
