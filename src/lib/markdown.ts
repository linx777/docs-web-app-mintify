import fs from "node:fs/promises";
import path from "node:path";

const sectionsDirectory = path.join(process.cwd(), "content", "sections");
const SECTION_ORDER = ["overview", "products", "infrastructure", "protocol", "research"];

export type SectionDoc = {
  title: string;
  slug: string;
  content: string;
  fileName: string;
  order: number;
};

export type SectionGroup = {
  title: string;
  slug: string;
  order: number;
  docs: SectionDoc[];
};

export async function readSectionMarkdown(fileName: string, groupSlug?: string) {
  const normalizedName = fileName.endsWith(".md") ? fileName : `${fileName}.md`;
  const basePath = groupSlug ? path.join(sectionsDirectory, groupSlug) : sectionsDirectory;
  const filePath = path.join(basePath, normalizedName);

  return fs.readFile(filePath, "utf8");
}

export async function loadSectionGroups(): Promise<SectionGroup[]> {
  const sectionDirs = await listSectionDirectories();
  const groups = await Promise.all(
    sectionDirs.map(async ({ dirName, slug, order }) => {
      const docs = await listSectionDocs(dirName, slug);
      return {
        title: humanizeSlug(slug),
        slug,
        order,
        docs,
      };
    }),
  );

  return groups.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

async function listSectionDirectories() {
  const entries = await fs.readdir(sectionsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const slug = entry.name;
      const order = SECTION_ORDER.indexOf(slug);
      return { dirName: entry.name, slug, order: order === -1 ? Number.MAX_SAFE_INTEGER : order };
    })
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

async function listSectionDocs(dirName: string, groupSlug: string): Promise<SectionDoc[]> {
  const dirPath = path.join(sectionsDirectory, dirName);
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const docs = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
      .map(async (entry) => {
        const { slug, order } = parseSlug(entry.name);
        const docSlug = slug.toLowerCase() === "readme" ? groupSlug : slug;
        const content = await readSectionMarkdown(entry.name, groupSlug);
        const title = extractTitle(content) ?? humanizeSlug(docSlug);

        return {
          title,
          slug: docSlug,
          content,
          fileName: entry.name,
          order,
        };
      }),
  );

  return docs.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

function parseSlug(fileName: string): { slug: string; order: number } {
  const base = fileName.replace(/\.md$/i, "");
  const match = base.match(/^(\d+)[-_](.+)$/);

  if (match) {
    return { slug: match[2], order: Number(match[1]) };
  }

  return { slug: base, order: Number.MAX_SAFE_INTEGER };
}

function extractTitle(markdown: string) {
  const heading = markdown.split("\n").find((line) => /^#{1,6}\s+/.test(line));
  return heading ? heading.replace(/^#{1,6}\s+/, "").trim() : undefined;
}

function humanizeSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}
