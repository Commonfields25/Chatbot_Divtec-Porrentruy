import { useState, useEffect, useRef } from 'react';

export const useSpeechServices = () => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [pitch, setPitch] = useState(1.0);
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<any>(null);
    const speechQueueRef = useRef<string[]>([]);
    const isSpeakingRef = useRef(false);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                const frVoices = availableVoices.filter(v => v.lang === 'fr-FR');
                const preferredVoice =
                    frVoices.find(v => v.name.toLowerCase().includes('thomas')) ||
                    frVoices.find(v => v.name.toLowerCase().includes('daniel')) ||
                    frVoices.find(v => v.name.toLowerCase().includes('sébastien')) ||
                    frVoices.find(v => v.name.includes('Google')) ||
                    frVoices[0];
                setSelectedVoice(preferredVoice || null);
            }
        };
        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
        return () => {
            speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const cleanupTextForSpeech = (text: string): string => {
        return text
            .replace(/#+\s/g, '')
            .replace(/(\*\*|__)(.*?)\1/g, '$2')
            .replace(/(\*|_)(.*?)\1/g, '$2')
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
            .replace(/\[CHART:DATA_FLOW\]/g, '')
            .replace(/<[^>]*>?/gm, '')
            .trim();
    };

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
            utterance.rate = 1.0;
            utterance.pitch = pitch;
            utterance.onend = () => {
                isSpeakingRef.current = false;
                processSpeechQueue();
            };
            speechSynthesis.speak(utterance);
        } else {
             isSpeakingRef.current = false;
        }
    };

    const speak = (textToSpeak: string) => {
        if (!isSpeechEnabled || !textToSpeak.trim()) return;

        speechSynthesis.cancel();
        isSpeakingRef.current = false;
        speechQueueRef.current = [];

        const cleanedText = cleanupTextForSpeech(textToSpeak);
        const sentences = cleanedText.match(/[^.!?]+[.!?]*/g) || [];

        sentences.forEach(s => {
            if(s && s.trim()) speechQueueRef.current.push(s.trim());
        });

        if (!isSpeakingRef.current) {
            processSpeechQueue();
        }
    };

    const cancelSpeech = () => {
        speechSynthesis.cancel();
        isSpeakingRef.current = false;
        speechQueueRef.current = [];
    };

    const toggleSpeech = () => {
        if (!isSpeechEnabled) {
            setIsSpeechEnabled(true);
            const confirmation = new SpeechSynthesisUtterance("Synthèse vocale activée.");
            if (selectedVoice) {
                confirmation.voice = selectedVoice;
            }
            confirmation.lang = 'fr-FR';
            confirmation.pitch = pitch;
            speechSynthesis.speak(confirmation);
        } else {
            cancelSpeech();
            setIsSpeechEnabled(false);
        }
    };

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
                if (event.error === 'no-speech') {
                    setError("Aucun son n'a été détecté. Veuillez réessayer.");
                } else if (event.error === 'not-allowed') {
                    setError("L'accès au microphone a été refusé. Veuillez l'autoriser dans les paramètres de votre navigateur.");
                } else {
                    setError(`Erreur de reconnaissance vocale : ${event.error}`);
                }
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };
        }
    };

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
