/**
 * @fileoverview Composant React affichant un indicateur de saisie animé.
 *
 * Ce composant est une simple animation CSS composée de trois points qui
 * apparaissent et disparaissent en séquence, simulant l'action de quelqu'un
 * qui est en train d'écrire ("typing...").
 *
 * Il est utilisé pour améliorer l'expérience utilisateur en montrant visuellement
 * que l'assistant IA est en train de "réfléchir" ou de "taper" sa réponse.
 *
 * @component
 */

import React from 'react';

/**
 * Le composant `TypingIndicator`.
 * @returns {React.ReactElement} L'animation de saisie.
 */
const TypingIndicator: React.FC = () => {
    return (
        <div className="flex items-center space-x-2">
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
        </div>
    );
};

export default TypingIndicator;
