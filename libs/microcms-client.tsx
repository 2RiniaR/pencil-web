import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";
import parse, { Element, HTMLReactParserOptions, domToReact, DOMNode } from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";
import styles from "~/components/ArticleBody.module.scss";

export const formatRichText = (richText: string) => {
  const $ = load(richText);

  const highlight = (text: string, lang?: string) => {
    if (!lang) return text;
    try {
      return hljs.highlight(text, { language: lang?.replace(/^language-/, "") || "" }).value;
    } catch {
      return hljs.highlightAuto(text).value;
    }
  };

  $("div").each((_, elm) => {
    const fileName = $(elm).attr("data-filename");
    if (fileName !== undefined) {
      $(elm).addClass(styles.fileRoot);
      $(elm).prepend(`<span class="${styles.filename}">${fileName}</span>`);
    }
  });

  $("pre code").each((_, elm) => {
    const lang = $(elm).attr("class");
    const res = highlight($(elm).text(), lang);
    $(elm).html(res);
  });

  return $.html();
};

// サーバーサイドでHTMLコンテンツをsanitizeしてReact要素に変換
export const parseArticleContent = (content: string) => {
  // HTML前処理: 不要なタグを除去してsanitize
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
      iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen"],
      a: ["href", "target", "rel"],
      video: ["src", "controls", "width", "height"],
      audio: ["src", "controls"],
      source: ["src", "type"]
    },
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "player.vimeo.com"]
  })
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "");

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        // img要素をNext/Imageに変換（クリックハンドラーはクライアント側で追加）
        if (domNode.name === "img") {
          const { src, alt, width, height } = domNode.attribs;

          if (!src) return;

          const imgWidth = width ? parseInt(width, 10) : 800;
          const imgHeight = height ? parseInt(height, 10) : 600;

          return (
            <div className="article-image-wrapper" style={{ cursor: "zoom-in" }}>
              <Image
                src={src}
                alt={alt || ""}
                width={imgWidth}
                height={imgHeight}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          );
        }

        // リンクのtarget="_blank"にrel="noopener noreferrer"を追加
        if (domNode.name === "a" && domNode.attribs.target === "_blank") {
          return (
            <a href={domNode.attribs.href} target="_blank" rel="noopener noreferrer">
              {domToReact(domNode.children as DOMNode[], options)}
            </a>
          );
        }
      }
    }
  };

  return parse(cleanedContent, options);
};
