import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noreferrer" className="markdown-link" />
          ),
          pre: ({ ...props }) => <pre {...props} className="markdown-pre" />,
          code: ({
            inline,
            className: codeClassName,
            ...props
          }: { inline?: boolean; className?: string } & React.HTMLAttributes<HTMLElement>) =>
            inline ? (
              <code {...props} className={cn("markdown-code-inline", codeClassName)} />
            ) : (
              <code {...props} className={cn("markdown-code-block", codeClassName)} />
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
