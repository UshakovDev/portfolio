import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import {
  DEFAULT_PROJECT_CATEGORY,
  getAvailableProjectCategories,
  getProjectsByCategory,
  projectCategories,
  projects,
  resolveProjectCategory,
} from "../data/projects.mjs";
import ProjectCard from "./ProjectCard";

const ProjectGallery = () => {
  const router = useRouter();
  const availableCategories = useMemo(() => getAvailableProjectCategories(projects), []);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_PROJECT_CATEGORY);

  useEffect(() => {
    const syncCategoryFromLocation = () => {
      setActiveCategory(resolveProjectCategory(window.location.hash, projects));
    };

    syncCategoryFromLocation();
    window.addEventListener("hashchange", syncCategoryFromLocation);
    window.addEventListener("popstate", syncCategoryFromLocation);

    return () => {
      window.removeEventListener("hashchange", syncCategoryFromLocation);
      window.removeEventListener("popstate", syncCategoryFromLocation);
    };
  }, []);

  const activeProjects = useMemo(
    () => getProjectsByCategory(activeCategory, projects),
    [activeCategory]
  );

  const selectCategory = (categoryId) => {
    if (categoryId === activeCategory) return;

    setActiveCategory(categoryId);
    void router.push(`/work/#${categoryId}`, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const categoryLabel =
    projectCategories.find((category) => category.id === activeCategory)?.label || "Проекты";

  return (
    <section aria-labelledby="projects-heading">
      <div
        className="mb-8 flex flex-wrap gap-3"
        role="group"
        aria-label="Категории проектов"
      >
        {availableCategories.map((category) => {
          const count = getProjectsByCategory(category.id, projects).length;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              aria-controls="project-grid"
              onClick={() => selectCategory(category.id)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors md:px-5 ${
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-white/20 bg-white/[0.04] text-white/75 hover:border-accent hover:text-white"
              }`}
            >
              {category.label} · {count}
            </button>
          );
        })}
      </div>

      <div className="sr-only" aria-live="polite">
        Выбрана категория «{categoryLabel}», проектов: {activeProjects.length}.
      </div>

      <div id="project-grid" className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
        {activeProjects.map((project) => (
          <ProjectCard key={project.id} project={project} categoryLabel={categoryLabel} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGallery;
