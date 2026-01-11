import { marked } from "marked";
import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";
import parse, { Element, HTMLReactParserOptions, domToReact, DOMNode } from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";
import { processEmbeds, hasTwitterEmbed } from "./embed";
import styles from "~/components/ArticleBody.module.scss";

const formatMarkdownHtml = (html: string) => {
  const $ = load(html);

  const parseLanguageClass = (lang?: string): { language: string; filename: string | null } => {
    if (!lang) return { language: "", filename: null };

    // "language-typescript:route.tsx" -> { language: "typescript", filename: "route.tsx" }
    const cleaned = lang.replace(/^language-/, "");
    if (cleaned.includes(":")) {
      const [language, filename] = cleaned.split(":");
      return { language, filename };
    }
    return { language: cleaned, filename: null };
  };

  const highlight = (text: string, language: string) => {
    if (!language) return text;

    try {
      return hljs.highlight(text, { language }).value;
    } catch {
      return hljs.highlightAuto(text).value;
    }
  };

  $("pre code").each((_, elm) => {
    const langClass = $(elm).attr("class");
    const { language, filename } = parseLanguageClass(langClass);
    const highlighted = highlight($(elm).text(), language);
    $(elm).html(highlighted);

    // ファイル名がある場合、preの前にファイル名要素を追加
    if (filename) {
      const $pre = $(elm).parent("pre");
      $pre.wrap(`<div class="${styles.fileRoot}"></div>`);
      $pre.before(`<span class="${styles.filename}">${filename}</span>`);
    }
  });

  return $.html();
};

const parseMarkdownContent = (content: string) => {
  const cleanedContent = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "iframe",
      "figure",
      "figcaption",
      "picture",
      "source",
      "video",
      "audio"
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id", "style", "data-*"],
      img: ["src", "alt", "width", "height", "loading"],
      iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen", "title"],
      a: ["href", "target", "rel"],
      video: ["src", "controls", "width", "height"],
      audio: ["src", "controls"],
      source: ["src", "type"],
      blockquote: ["class", "data-*"]
    },
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"]
  })
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "");

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        if (domNode.name === "img") {
          const { src, alt, width, height, class: className } = domNode.attribs;

          if (!src) return;

          // リンクカードの画像は外部URLのためそのまま表示
          if (className === "link-card-image") {
            return;
          }

          const imgWidth = width ? parseInt(width, 10) : 800;
          const imgHeight = height ? parseInt(height, 10) : 600;

          return (
            <span className="article-image-wrapper" style={{ display: "block", cursor: "zoom-in" }}>
              <Image
                src={src}
                alt={alt || ""}
                width={imgWidth}
                height={imgHeight}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: "100%", height: "auto" }}
              />
            </span>
          );
        }

        if (domNode.name === "a") {
          const href = domNode.attribs.href;
          const isExternal = href?.startsWith("http");
          return (
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </a>
          );
        }
      }
    }
  };

  return parse(cleanedContent, options);
};

export type RenderMarkdownResult = {
  content: React.ReactNode;
  hasTwitterEmbed: boolean;
};

export async function renderMarkdown(markdown: string, slug: string): Promise<RenderMarkdownResult> {
  const processedMarkdown = markdown.replace(/!\[([^\]]*)\]\(\.\/([^)]+)\)/g, (_, alt, relativePath) => {
    return `![${alt}](/blog/${slug}/${relativePath})`;
  });

  const html = await marked(processedMarkdown);
  const formattedHtml = formatMarkdownHtml(html);
  const embedProcessedHtml = await processEmbeds(formattedHtml);

  return {
    content: parseMarkdownContent(embedProcessedHtml),
    hasTwitterEmbed: hasTwitterEmbed(embedProcessedHtml)
  };
}
