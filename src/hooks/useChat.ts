import { useState } from 'react';
import type { ChatMessage } from '../types';

export const useChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (query: string, searchKnowledgeBase: (query: string) => string, speak: (text: string) => void) => {
        const currentQuery = query.trim();
        if (!currentQuery || loading) return;

        const userMessage: ChatMessage = { role: 'user', text: currentQuery };
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        setLoading(true);
        setError(null);

        try {
            const relevantKnowledge = searchKnowledgeBase(currentQuery);
            const systemInstruction = `Tu es un assistant virtuel pour la DIVTEC, ... (ton prompt actuel) ...
INFORMATIONS PERTINENTES:
---
${relevantKnowledge || "Aucune information pertinente n'a été trouvée pour cette question."}
---`;

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: currentQuery,
                    system: systemInstruction,
                }),
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`HTTP ${res.status}: ${txt}`);
            }

            const data = await res.json() as { reply?: string; error?: string };
            const modelText = data.reply || data.error || "Je n'ai pas pu obtenir de réponse.";

            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = modelText;
                return newMessages;
            });

            speak(modelText);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue est survenue.";
            setError(`Désolé, une erreur est survenue : ${errorMessage}`);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = `Je suis désolé, une erreur est survenue. Veuillez réessayer plus tard.`;
                return newMessages;
            });
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([{ role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }]);
    };

    return {
        messages,
        loading,
        error,
        handleSubmit,
        clearChat,
    };
};
