import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const BLOG_DIR = path.join(process.cwd(), "blog");

export type ArticleType = "blue" | "green" | "sky" | "white" | "yellow";

export type ArticleContent = {
  slug: string;
  title: string;
  description: string;
  type: ArticleType;
  thumbnail: string | null;
  publishedAt: string;
  body: string;
};

const typeColors: Record<ArticleType, string> = {
  blue: "#3c77ff",
  green: "#42e1ca",
  sky: "#4ae4ff",
  white: "#ffffff",
  yellow: "#ffef84"
};

export function getTypeColor(type: ArticleType): string {
  return typeColors[type];
}

export async function getArticleList(): Promise<ArticleContent[]> {
  const dirs = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  const articles: ArticleContent[] = [];

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;

    try {
      const article = await getArticleBySlug(dir.name);
      articles.push(article);
    } catch {
      // main.md が存在しないディレクトリはスキップ
    }
  }

  return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticleBySlug(slug: string): Promise<ArticleContent> {
  const articleDir = path.join(BLOG_DIR, slug);
  const filePath = path.join(articleDir, "main.md");

  let fileContent: string;
  try {
    fileContent = await fs.readFile(filePath, "utf-8");
  } catch {
    notFound();
  }

  const { data, content } = matter(fileContent);

  if (!data.title || !data.description || !data.type || !data.publishedAt) {
    throw new Error(`Invalid front matter in ${filePath}`);
  }

  let thumbnail: string | null = null;
  if (data.thumbnail) {
    const relativePath = (data.thumbnail as string).replace(/^\.\//, "");
    thumbnail = `/blog/${slug}/${relativePath}`;
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    type: data.type as ArticleType,
    thumbnail,
    publishedAt: data.publishedAt,
    body: content
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const articles = await getArticleList();
  return articles.map((a) => a.slug);
}
