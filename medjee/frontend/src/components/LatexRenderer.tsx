import katex from "katex";

type LatexRendererProps = {
  latex: string;
  display?: boolean;
};

// Render LaTeX equations using KaTeX
export default function LatexRenderer({
  latex,
  display = false,
}: LatexRendererProps) {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: display,
    trust: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}