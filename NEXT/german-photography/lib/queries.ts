
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  location: string | null;
  published: boolean;
  created_at: string;
};

export async function getProjects(): Promise<Project[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase query error:", error.message);
    throw new Error("Could not load portfolio projects.");
  }

  return data ?? [];
}
