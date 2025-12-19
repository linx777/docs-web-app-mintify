import HomePage from "@/components/home-page";
import { loadSectionGroups } from "@/lib/markdown";

export default async function Home() {
  const sections = await loadSectionGroups();

  return <HomePage sections={sections} />;
}
