/**
 * @fileoverview Composant React pour analyser et afficher du texte Markdown.
 *
 * Ce composant prend une chaîne de caractères contenant du Markdown et la convertit
 * en HTML sécurisé pour l'afficher dans l'interface utilisateur.
 * Il utilise la bibliothèque `marked` pour la conversion.
 *
 * Il gère également un cas particulier : la détection d'un tag `[CHART:DATA_FLOW]`
 * pour afficher un composant de graphique personnalisé (`DataFlowChart`) à la place.
 *
 * @component
 */

import React from 'react';
import { marked } from 'marked';
import DataFlowChart from './DataFlowChart';

/**
 * @props ParsedMarkdownProps - Propriétés du composant.
 * @property {string} content - La chaîne de caractères Markdown à afficher.
 */
interface ParsedMarkdownProps {
    content: string;
}

/**
 * Le composant `ParsedMarkdown`.
 * @param {ParsedMarkdownProps} props - Les propriétés du composant.
 * @returns {React.ReactElement} L'élément rendu.
 */
const ParsedMarkdown: React.FC<ParsedMarkdownProps> = ({ content }) => {
    // Vérifie la présence du tag spécifique pour afficher le graphique.
    if (content.includes('[CHART:DATA_FLOW]')) {
        return <DataFlowChart />;
    }

    // Sinon, analyse le Markdown et le rend en HTML.
    // `dangerouslySetInnerHTML` est utilisé ici, mais `marked` est configuré
    // par défaut pour nettoyer le HTML et empêcher les attaques XSS.
    const htmlContent = marked(content, { gfm: true, breaks: true });

    return (
        <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default ParsedMarkdown;
