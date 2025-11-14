/**
 * @fileoverview Hook personnalisé `useChat` pour gérer la logique du chatbot.
 * (Commentaires précédents conservés)
 */
import { useState, useEffect } from 'react';
 *
 * Ce hook encapsule toute la logique liée à la gestion de la conversation :
 * - Maintien de l'historique des messages.
 * - Gestion des états de chargement et d'erreur.
 * - Communication avec l'API backend (`/api/chat`) pour obtenir les réponses de l'IA.
 * - Interaction avec d'autres services (recherche dans la base de connaissances, synthèse vocale).
 */

import { useState } from 'react';
import type { ChatMessage } from '../types';
import { useSupabase } from '../contexts/SupabaseContext';

export const useChat = () => {
    const supabase = useSupabase();
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // --- États du Hook ---

    /**
     * @state {ChatMessage[]} messages - L'historique des messages de la conversation.
     * Initialisé avec un message de bienvenue de l'assistant.
     */
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }
    ]);

    /**
     * @state {boolean} loading - Indique si une réponse de l'assistant est en cours de chargement.
     */
    const [loading, setLoading] = useState(false);

    /**
     * @state {string | null} error - Stocke un message d'erreur en cas de problème.
     */
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

    // --- Fonctions du Hook ---

    /**
     * Gère la soumission d'un nouveau message par l'utilisateur.
     *
     * @param {string} query - Le message tapé par l'utilisateur.
     * @param {Function} searchKnowledgeBase - Une fonction pour chercher des informations pertinentes.
     * @param {Function} speak - Une fonction pour vocaliser la réponse de l'assistant.
     */
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

        // 1. Ajouter le message de l'utilisateur et un placeholder pour la réponse
        const userMessage: ChatMessage = { role: 'user', text: currentQuery };
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        setLoading(true);
        setError(null);

        try {
            // 2. Récupérer l'ID utilisateur pour le suivi de la conversation
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session?.user?.id;

            // 3. Enrichir le prompt avec la base de connaissances
            const relevantKnowledge = searchKnowledgeBase(currentQuery);
            const systemInstruction = `Tu es un assistant virtuel pour la DIVTEC...`;

            // 4. Appeler l'API backend
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

            // 5. Mettre à jour le placeholder avec la réponse de l'IA
            const data = await res.json() as { reply?: string; error?: string };
            const modelText = data.reply || data.error || "Je n'ai pas pu obtenir de réponse.";

            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = modelText;
                return newMessages;
            });

            // 6. Vocaliser la réponse
            speak(modelText);

        } catch (err) {
            // 7. Gérer les erreurs
            let errorMessage = "Une erreur inconnue est survenue.";
            if (err instanceof Error) {
                // ... (logique de formatage des erreurs)
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
     * Réinitialise la conversation à son état initial.
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
