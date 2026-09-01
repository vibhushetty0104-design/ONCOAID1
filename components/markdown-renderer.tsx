import React from "react";

/**
 * Lightweight, safe, zero-dependency Markdown Parser and Renderer
 * Designed specifically for structured healthcare guidance and clinical notes.
 */

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Parses inline bold, italic, code, and links
function renderInlineFormatting(text: string): React.ReactNode {
  // Regex to split by bold (**text**), italic (*text* or _text_), code (`code`), or quote ("text")
  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|_.*?_|`.*?`)/g);

  return tokens.map((token, index) => {
    if (!token) return null;

    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-white-soft">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (
      (token.startsWith("*") && token.endsWith("*") && token.length >= 2) ||
      (token.startsWith("_") && token.endsWith("_") && token.length >= 2)
    ) {
      return (
        <em key={index} className="italic text-white-soft/85">
          {token.slice(1, -1)}
        </em>
      );
    }

    if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
      return (
        <code
          key={index}
          className="rounded bg-white-soft/12 px-1.5 py-0.5 text-[13px] font-mono text-cyan"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    return token;
  });
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content) return null;

  const blocks = content.split(/\n\n+/);

  return (
    <div className={`space-y-3 leading-relaxed text-white-soft/95 font-sans ${className}`}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading 2: ## Title
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={bIdx} className="text-[20px] font-semibold text-mint mt-4 mb-2 first:mt-0">
              {renderInlineFormatting(trimmed.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        // Heading 3: ### Title
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={bIdx} className="text-[18px] font-semibold text-mint mt-3.5 mb-1.5 first:mt-0">
              {renderInlineFormatting(trimmed.replace(/^###\s+/, ""))}
            </h3>
          );
        }

        // Heading 4: #### Title
        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={bIdx} className="text-[15px] font-medium text-mint-deep mt-3 mb-1 first:mt-0">
              {renderInlineFormatting(trimmed.replace(/^####\s+/, ""))}
            </h4>
          );
        }

        // Horizontal Rule: ---
        if (trimmed === "---" || trimmed === "***") {
          return <hr key={bIdx} className="border-white-soft/10 my-3" />;
        }

        // Blockquote: > Quote
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={bIdx}
              className="border-l-2 border-mint/50 bg-white-soft/5 pl-3.5 py-1 text-[14px] italic text-white-soft/85 my-2 rounded-r-lg"
            >
              {renderInlineFormatting(trimmed.replace(/^>\s+/, ""))}
            </blockquote>
          );
        }

        // Bullet List (- item or * item)
        const lines = trimmed.split("\n");
        const isBulletList = lines.every((l) => /^\s*[-*•]\s+/.test(l));
        if (isBulletList) {
          return (
            <ul key={bIdx} className="space-y-1.5 pl-2 my-2 text-[14.5px]">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^\s*[-*•]\s+/, "");
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="text-mint select-none mt-0.5">•</span>
                    <span>{renderInlineFormatting(cleanLine)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Numbered List (1. item)
        const isNumberedList = lines.every((l) => /^\s*\d+\.\s+/.test(l));
        if (isNumberedList) {
          return (
            <ol key={bIdx} className="space-y-1.5 pl-2 my-2 text-[14.5px]">
              {lines.map((line, lIdx) => {
                const match = line.match(/^\s*(\d+)\.\s+(.*)$/);
                const num = match ? match[1] : String(lIdx + 1);
                const text = match ? match[2] : line;
                return (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="font-semibold text-mint/90 select-none text-[13px] mt-0.5">
                      {num}.
                    </span>
                    <span>{renderInlineFormatting(text)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }

        // Mixed content / Paragraph with potential single-line bullets
        return (
          <div key={bIdx} className="text-[14.5px] leading-relaxed">
            {lines.map((line, lIdx) => {
              if (/^\s*[-*•]\s+/.test(line)) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 my-1 pl-2">
                    <span className="text-mint select-none">•</span>
                    <span>{renderInlineFormatting(line.replace(/^\s*[-*•]\s+/, ""))}</span>
                  </div>
                );
              }

              if (/^\s*\d+\.\s+/.test(line)) {
                const match = line.match(/^\s*(\d+)\.\s+(.*)$/);
                return (
                  <div key={lIdx} className="flex items-start gap-2 my-1 pl-2">
                    <span className="font-semibold text-mint text-[13px]">
                      {match ? match[1] : lIdx + 1}.
                    </span>
                    <span>{renderInlineFormatting(match ? match[2] : line)}</span>
                  </div>
                );
              }

              return (
                <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>
                  {renderInlineFormatting(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
