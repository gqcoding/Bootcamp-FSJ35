export const instant = false;
import Link from "next/link";
import { getProjects } from "@/lib/queries";

const categories = [
  { slug: "weddings", label: "Weddings" },
  { slug: "portraits", label: "Portraits" },
  { slug: "urban", label: "Urban" },
  { slug: "landscape", label: "Landscape" },
  { slug: "commercial", label: "Commercial" },
];

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-6 md:px-12">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.25em]"
        >
          GQ. STUDIO
        </Link>

        <nav className="flex gap-5 text-xs text-neutral-300 md:gap-8 md:text-sm">
          <a href="#work" className="transition hover:text-white">
            Work
          </a>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
          <a href="mailto:hello@example.com" className="transition hover:text-white">
            Contact
          </a>
        </nav>
      </header>

      <section className="px-6 py-24 md:px-12 md:py-36">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-neutral-400">
          Photographer / El Salvador
        </p>

        <h1 className="max-w-5xl text-6xl font-light leading-[1.05] tracking-tight md:text-8xl lg:text-9xl">
          Stories told
          <br />
          through <span className="italic text-neutral-400">light.</span>
        </h1>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-7 text-neutral-400">
            A visual exploration of people, places and meaningful moments.
            Photography with intention, emotion and a timeless perspective.
          </p>

          <a
            href="#work"
            className="w-fit border-b border-white pb-2 text-sm transition hover:text-neutral-400"
          >
            Explore selected work ↘
          </a>
        </div>
      </section>

      <section id="work" className="px-6 pb-24 md:px-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Portfolio / 2026
            </p>
            <h2 className="text-3xl font-light md:text-5xl">
              Selected work
            </h2>
          </div>

          <span className="text-sm text-neutral-500">
            {projects.length} projects
          </span>
        </div>

        {projects.length === 0 ? (
          <p className="py-12 text-neutral-400">
            No published projects yet.
          </p>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={index % 3 === 1 ? "lg:mt-16" : ""}
              >
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden bg-neutral-900">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      loading={index < 3 ? "eager" : "lazy"}
                      className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4 pt-5">
                    <div>
                      <h3 className="text-xl font-light transition group-hover:text-neutral-300">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                        {project.category}
                      </p>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        id="about"
        className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32"
      >
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-neutral-500">
          Behind the lens
        </p>

        <h2 className="max-w-4xl text-4xl font-light leading-tight md:text-6xl">
          Every frame has a story.
          <span className="text-neutral-500">
            {" "}My job is to make it last.
          </span>
        </h2>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:px-12">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
          Explore by category
        </p>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="border border-white/20 px-5 py-3 text-sm transition hover:bg-white hover:text-black"
            >
              {category.label} ↗
            </Link>
          ))}
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-white/10 px-6 py-8 text-sm text-neutral-500 md:flex-row md:justify-between md:px-12">
        <p>© {new Date().getFullYear()} GQ Studio</p>
        <p>Photography with intention.</p>
      </footer>
    </main>
  );
}
