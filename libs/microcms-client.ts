import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export const formatRichText = (richText: string) => {
  const $ = load(richText);

  const highlight = (text: string, lang?: string) => {
    if (!lang) return text;
    try {
      return hljs.highlight(text, { language: lang?.replace(/^language-/, "") || "" }).value;
    } catch (e) {
      return hljs.highlightAuto(text).value;
    }
  };

  $("pre code").each((_, elm) => {
    const lang = $(elm).attr("class");
    const res = highlight($(elm).text(), lang);
    $(elm).html(res);
  });

  return $.html();
};
