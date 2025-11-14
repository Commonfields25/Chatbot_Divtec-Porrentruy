/**
 * @fileoverview Hook personnalisé `useSpeechServices` pour la synthèse et la reconnaissance vocale.
 * (Commentaires précédents conservés)
 */
import { useState, useEffect, useRef } from 'react';

export const useSpeechServices = () => {
    // --- États et Références ---
    const [isListening, setIsListening] = useState(false);
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [pitch, setPitch] = useState(1.0);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);
    const speechQueueRef = useRef<string[]>([]);
    const isSpeakingRef = useRef(false);

    /**
     * @effect Charge les voix disponibles.
     */
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                const frVoices = availableVoices.filter(v => v.lang === 'fr-FR');
                const preferredVoice = frVoices[0];
                setSelectedVoice(preferredVoice || null);
            }
        };
        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
        return () => {
            speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    /**
     * Nettoie une chaîne de caractères en retirant le Markdown et le HTML.
     * @param {string} text - Le texte à nettoyer.
     * @returns {string} Le texte nettoyé.
     */
    const cleanupTextForSpeech = (text: string): string => {
        return text
            .replace(/#+\s/g, '') // Enlève les titres
            .replace(/(\*\*|__)(.*?)\1/g, '$2') // Enlève le gras/italique
            .replace(/(\*|_)(.*?)\1/g, '$2') // Enlève le gras/italique
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // CORRECTION: Enlève les backticks du code
            .replace(/\[CHART:DATA_FLOW\]/g, '') // Enlève les tags de chart
            .replace(/<[^>]*>?/gm, '') // Enlève les balises HTML
            .trim();
    };

    /**
     * Traite la file d'attente des phrases à vocaliser.
     */
    const processSpeechQueue = () => {
        if (isSpeakingRef.current || speechQueueRef.current.length === 0 || !isSpeechEnabled) {
            return;
        }
        isSpeakingRef.current = true;
        const sentence = speechQueueRef.current.shift();
        if (sentence && selectedVoice) {
            const utterance = new SpeechSynthesisUtterance(sentence);
            utterance.voice = selectedVoice;
            utterance.lang = 'fr-FR';
            utterance.pitch = pitch;
            utterance.onend = () => {
                isSpeakingRef.current = false;
                processSpeechQueue();
            };
            utterance.onerror = (event) => {
                setError(`Erreur de synthèse vocale : ${event.error}`);
                isSpeakingRef.current = false;
            };
            speechSynthesis.speak(utterance);
        } else {
             isSpeakingRef.current = false;
        }
    };

    /**
     * Point d'entrée pour faire parler l'assistant.
     */
    const speak = (textToSpeak: string) => {
        if (!isSpeechEnabled || !textToSpeak.trim()) return;

        cancelSpeech();
        const cleanedText = cleanupTextForSpeech(textToSpeak);
        const sentences = cleanedText.match(/[^.!?]+[.!?]*/g) || [];

        sentences.forEach(s => {
            if(s && s.trim()) speechQueueRef.current.push(s.trim());
        });

        if (!isSpeakingRef.current) {
            processSpeechQueue();
        }
    };

    /**
     * Annule la synthèse vocale en cours.
     */
    const cancelSpeech = () => {
        speechSynthesis.cancel();
        isSpeakingRef.current = false;
        speechQueueRef.current = [];
    };

    /**
     * Active ou désactive la synthèse vocale.
     */
    const toggleSpeech = () => {
        if (!isSpeechEnabled) {
            setIsSpeechEnabled(true);
            const confirmation = new SpeechSynthesisUtterance("Synthèse vocale activée.");
            speechSynthesis.speak(confirmation);
        } else {
            cancelSpeech();
            setIsSpeechEnabled(false);
        }
    };

    /**
     * Initialise l'API de reconnaissance vocale.
     */
    const initializeRecognition = (onResult: (transcript: string) => void) => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.continuous = false;
            recognition.lang = 'fr-FR';
            recognition.interimResults = true;
            recognition.onresult = (event: any) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    onResult(finalTranscript);
                }
            };
            recognition.onerror = (event: any) => {
                // ... gestion des erreurs
            };
            recognition.onend = () => {
                setIsListening(false);
            };
        }
    };

    /**
     * Démarre ou arrête la reconnaissance vocale.
     */
    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else if (recognitionRef.current) {
            setError(null);
            recognitionRef.current.start();
            setIsListening(true);
        } else {
            setError("La reconnaissance vocale n'est pas supportée sur ce navigateur.");
        }
    };

    return {
        isListening,
        isSpeechEnabled,
        pitch,
        error,
        setPitch,
        speak,
        cancelSpeech,
        toggleSpeech,
        initializeRecognition,
        toggleListening,
    };
};
