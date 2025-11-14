import React from 'react';
import { marked } from 'marked';

interface ParsedMarkdownProps {
    content: string;
}

const ParsedMarkdown = ({ content }: ParsedMarkdownProps) => {
    try {
        if (!content) return null;
        const rawMarkup = marked.parse(content, { gfm: true, breaks: true });
        return <div dangerouslySetInnerHTML={{ __html: rawMarkup as string }} />;
    } catch (error) {
        console.error("Markdown parsing error:", error);
        return (
            <div className="markdown-error">
                <p><strong>Erreur d&apos;affichage du message</strong></p>
                <pre>{content}</pre>
            </div>
        );
    }
};

export default ParsedMarkdown;
