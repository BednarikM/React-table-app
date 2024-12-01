/* React **********************************************************************/
import { useState, useEffect } from "react";

/* Third-party ****************************************************************/
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/* Styles *********************************************************************/
import "../styles/pages/HomePage.scss";

/* Component FNC **************************************************************/
export default function HomePage(): JSX.Element {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        const response = await fetch("/README.md");
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error("Error loading markdown:", error);
      }
    }

    fetchMarkdown();
  }, []);

  /* Jsx **********************************************************************/
  return (
    <>
      <h1 className="page-title">Homepage</h1>
      {markdownContent && (
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markdownContent}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
}
