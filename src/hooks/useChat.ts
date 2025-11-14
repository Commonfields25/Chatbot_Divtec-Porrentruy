import { useState, useEffect } from 'react';
import type { ChatMessage } from '../types';

export const useChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    // Étape 1 : générer ou récupérer une clé de session persistante (localStorage)
    useEffect(() => {
        let id = localStorage.getItem('sessionId');
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem('sessionId', id);
        }
        setSessionId(id);
    }, []);

    // ⚡ Étape 2 : fonction d’envoi d’un message
    const handleSubmit = async (
        query: string,
        searchKnowledgeBase: (query: string) => string,
        speak: (text: string) => void
    ) => {
        const currentQuery = query.trim();
        if (!currentQuery || loading || !sessionId) return;

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

            //  Étape 3 : on envoie aussi le sessionId à ton API Next.js
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: currentQuery,
                    system: systemInstruction,
                    sessionId, //  on envoie la clé de session ici
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
            let errorMessage = "Une erreur inconnue est survenue.";
            if (err instanceof Error) {
                if (err.message.includes('HTTP 404')) {
                    errorMessage = "L'API de chat est introuvable. Veuillez vérifier la configuration.";
                } else if (err.message.startsWith('HTTP')) {
                    errorMessage = `Erreur de communication avec le serveur (${err.message}).`;
                } else {
                    errorMessage = err.message;
                }
            }
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

    //  Étape 4 : réinitialiser le chat (si tu veux une nouvelle session)
    const clearChat = (resetSession = false) => {
        setMessages([{ role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }]);
        if (resetSession) {
            const newId = crypto.randomUUID();
            localStorage.setItem('sessionId', newId);
            setSessionId(newId);
        }
    };

    return {
        messages,
        loading,
        error,
        handleSubmit,
        clearChat,
        sessionId, // exposé au besoin
    };
};
