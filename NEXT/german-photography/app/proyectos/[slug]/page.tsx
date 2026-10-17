
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const supabase = createSupabaseServerClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, category, description, image_url, location, published"
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Error loading project:", error.message);
    throw new Error("Could not load this project.");
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <Link
          href="/"
          className="text-sm text-neutral-400 transition hover:text-white"
        >
          ← Back to portfolio
        </Link>

        <div className="mt-10">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            {project.category}
          </p>

          <h1 className="mt-4 text-4xl font-light tracking-tight md:text-6xl">
            {project.title}
          </h1>

          {project.location && (
            <p className="mt-4 text-neutral-400">
              {project.location}
            </p>
          )}
        </div>

        <div className="mt-10 overflow-hidden rounded-lg">
          <img
            src={project.image_url}
            alt={project.title}
            className="max-h-[75vh] w-full object-cover"
          />
        </div>

        <section className="max-w-3xl py-10">
          <h2 className="text-xl font-medium">About this project</h2>
          <p className="mt-4 leading-8 text-neutral-300">
            {project.description}
          </p>
        </section>

        <Link
          href="/"
          className="inline-block border border-neutral-700 px-5 py-3 text-sm transition hover:bg-white hover:text-black"
        >
          Explore more projects
        </Link>
      </div>
    </main>
  );
}
