/**
 * @fileoverview Hook personnalisé `useChat` pour gérer la logique du chatbot.
 * (Commentaires précédents conservés)
 */
import { useState, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { useSupabase } from '../contexts/SupabaseContext';

export const useChat = () => {
    const supabase = useSupabase();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let currentSessionId = localStorage.getItem('chat_session_id');
            if (!currentSessionId) {
                currentSessionId = crypto.randomUUID();
                localStorage.setItem('chat_session_id', currentSessionId);
            }
            setSessionId(currentSessionId);
        }
        setMessages([
            { role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }
        ]);
    }, []);

    const handleSubmit = async (query: string, searchKnowledgeBase: (query: string) => string, speak: (text: string) => void) => {
        const currentQuery = query.trim();
        if (!currentQuery || loading) return;

        // Si la session a été effacée, en générer une nouvelle.
        let currentSessionId = sessionId;
        if (!currentSessionId) {
            currentSessionId = crypto.randomUUID();
            localStorage.setItem('chat_session_id', currentSessionId);
            setSessionId(currentSessionId);
        }

        const userMessage: ChatMessage = { role: 'user', text: currentQuery };
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        setLoading(true);
        setError(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session?.user?.id;
            const relevantKnowledge = searchKnowledgeBase(currentQuery);
            const systemInstruction = `Tu es un assistant virtuel pour la DIVTEC...`;

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: currentQuery,
                    system: systemInstruction,
                    userId: userId,
                    sessionId: currentSessionId,
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
                errorMessage = err.message;
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

    /**
     * Réinitialise la conversation et démarre une nouvelle session.
     */
    const clearChat = () => {
        // Réinitialise les messages à l'écran.
        setMessages([{ role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }]);

        // Supprime l'ancien sessionId pour forcer la création d'une nouvelle session.
        if (typeof window !== 'undefined') {
            localStorage.removeItem('chat_session_id');
        }
        setSessionId(null);
    };

    return {
        messages,
        loading,
        error,
        handleSubmit,
        clearChat,
    };
};
