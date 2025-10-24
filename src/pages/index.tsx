import React, { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import ReactDOM from 'react-dom/client';
//import { GoogleGenAI } from '@google/genai';
import { marked } from 'marked';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KNOWLEDGE_BASE } from '../knowledge';


//const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// --- SVG Icons ---
const SendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
    </svg>
);

const MicIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z" fill="currentColor"/>
    </svg>
);

const SpeakerIcon = ({ active }: { active: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
        { !active && <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" /> }
    </svg>
);

const TrashIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
    </svg>
);

// --- Typing Indicator ---
const TypingIndicator = () => (
    <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
    </div>
);

// --- Data Flow Chart Component ---
const dataFlowData = [
    { time: '10:00', 'Appareil A': 400, 'Appareil B': 240, 'Appareil C': 150 },
    { time: '10:01', 'Appareil A': 380, 'Appareil B': 260, 'Appareil C': 180 },
    { time: '10:02', 'Appareil A': 350, 'Appareil B': 300, 'Appareil C': 220 },
    { time: '10:03', 'Appareil A': 300, 'Appareil B': 280, 'Appareil C': 250 },
    { time: '10:04', 'Appareil A': 270, 'Appareil B': 310, 'Appareil C': 230 },
    { time: '10:05', 'Appareil A': 300, 'Appareil B': 139, 'Appareil C': 280 },
    { time: '10:06', 'Appareil A': 250, 'Appareil B': 180, 'Appareil C': 310 },
    { time: '10:07', 'Appareil A': 220, 'Appareil B': 220, 'Appareil C': 350 },
    { time: '10:08', 'Appareil A': 240, 'Appareil B': 250, 'Appareil C': 330 },
    { time: '10:09', 'Appareil A': 210, 'Appareil B': 450, 'Appareil C': 300 },
    { time: '10:10', 'Appareil A': 200, 'Appareil B': 980, 'Appareil C': 280 },
    { time: '10:11', 'Appareil A': 215, 'Appareil B': 850, 'Appareil C': 260 },
    { time: '10:12', 'Appareil A': 230, 'Appareil B': 700, 'Appareil C': 290 },
    { time: '10:13', 'Appareil A': 255, 'Appareil B': 550, 'Appareil C': 320 },
    { time: '10:14', 'Appareil A': 268, 'Appareil B': 450, 'Appareil C': 350 },
    { time: '10:15', 'Appareil A': 278, 'Appareil B': 390, 'Appareil C': 380 },
    { time: '10:16', 'Appareil A': 260, 'Appareil B': 410, 'Appareil C': 400 },
    { time: '10:17', 'Appareil A': 245, 'Appareil B': 430, 'Appareil C': 420 },
    { time: '10:18', 'Appareil A': 220, 'Appareil B': 450, 'Appareil C': 410 },
    { time: '10:19', 'Appareil A': 199, 'Appareil B': 470, 'Appareil C': 390 },
    { time: '10:20', 'Appareil A': 189, 'Appareil B': 480, 'Appareil C': 380 },
];

const DataFlowChart = () => (
    <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataFlowData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Appareil A" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Appareil B" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Appareil C" stroke="#ffc658" />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

// --- ParsedMarkdown Component ---
const ParsedMarkdown = ({ content }: { content: string }) => {
    try {
        if (!content) return null;
        const rawMarkup = marked.parse(content, { gfm: true, breaks: true });
        return <div dangerouslySetInnerHTML={{ __html: rawMarkup as string }} />;
    } catch (error) {
        console.error("Markdown parsing error:", error);
        return (
            <div className="markdown-error">
                <p><strong>Erreur d'affichage du message</strong></p>
                <pre>{content}</pre>
            </div>
        );
    }
};



// Helper to normalize text for searching (lowercase, remove accents)
const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

// --- Knowledge Base Search ---
const searchKnowledgeBase = (query: string): string => {
    const normalizedQuery = normalizeText(query);
    const queryWords = normalizedQuery.match(/\b(\w{3,})\b/g) || [];
    if (queryWords.length === 0 && normalizedQuery.length < 3) return '';

    const scores = KNOWLEDGE_BASE.map(chunk => {
        let score = 0;
        const normalizedTitle = normalizeText(chunk.title);
        const normalizedContent = normalizeText(chunk.content);
        const normalizedKeywords = chunk.keywords.map(normalizeText);

        // Score based on individual word matches
        queryWords.forEach(word => {
            if (normalizedTitle.includes(word)) {
                score += 5; // High weight for title match
            }
            if (normalizedKeywords.some(kw => kw.includes(word))) {
                score += 3; // Medium weight for keyword match
            }
            if (normalizedContent.includes(word)) {
                score += 1; // Base weight for content match
            }
        });
        
        // Bonus for matching the full query phrase in the title for very specific questions
        if (normalizedTitle.includes(normalizedQuery)) {
            score += 10;
        }

        return { chunk, score };
    });

    const relevantChunks = scores
        .filter(item => item.score > 3) // A threshold that requires at least a title match or multiple other matches
        .sort((a, b) => b.score - a.score)
        .slice(0, 4); // Take top 4 chunks to give more context

    if (relevantChunks.length === 0) {
        return '';
    }
    
    // Format the chunks for the model's context
    return relevantChunks
        .map(item => `Titre: ${item.chunk.title}\nContenu:\n${item.chunk.content}`)
        .join('\n\n---\n\n');
};


// --- Main Chatbot Component ---
const DivtecChatbot = () => {
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
        { role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }
    ]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [pitch, setPitch] = useState(1.0);
    
    const recognitionRef = useRef<any>(null); // Using 'any' for SpeechRecognition to support webkit prefix
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
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
                    setQuery(prev => prev + finalTranscript);
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
    }, []);

    const cleanupTextForSpeech = (text: string): string => {
        return text
            .replace(/#+\s/g, '') // Remove markdown headers
            .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
            .replace(/(\*|_)(.*?)\1/g, '$2') // italics
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // code
            .replace(/\[CHART:DATA_FLOW\]/g, '') // Remove chart placeholder
            .replace(/<[^>]*>?/gm, '') // Remove HTML tags
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
        
        const cleanedText = cleanupTextForSpeech(textToSpeak);
        const sentences: string[] = cleanedText.match(/[^.!?]+[.!?]*/g) || [];
        
        sentences.forEach((s: string) => {
            if(s.trim()) speechQueueRef.current.push(s.trim());
        });

        if (!isSpeakingRef.current) {
            processSpeechQueue();
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const currentQuery = query.trim();
        if (!currentQuery || loading) return;

        speechSynthesis.cancel();
        isSpeakingRef.current = false;
        speechQueueRef.current = [];

        const userMessage = { role: 'user' as const, text: currentQuery };
        
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        setQuery('');
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

            // 2) On récupère { reply }
            const data = await res.json() as { reply?: string; error?: string };
            const modelText = data.reply || data.error || "Je n'ai pas pu obtenir de réponse.";

            // 3) Met à jour l’UI (comme tu le faisais avec fullResponse)
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = modelText;
                return newMessages;
            });

            // 4) TTS si activé
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
    
    const handleToggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else if (recognitionRef.current) {
            setQuery('');
            setError(null);
            recognitionRef.current.start();
            setIsListening(true);
        } else {
            setError("La reconnaissance vocale n'est pas supportée sur ce navigateur.");
        }
    };
    
    const handleClearChat = () => {
        speechSynthesis.cancel();
        isSpeakingRef.current = false;
        speechQueueRef.current = [];
        setMessages([{ role: 'model', text: 'Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?' }]);
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
            speechSynthesis.cancel();
            isSpeakingRef.current = false;
            speechQueueRef.current = [];
            setIsSpeechEnabled(false);
        }
    };

    return (
        <div className="container">
            <header className="header">
                 <div className="header-content">
                    <img src="https://newtec.divtec.ch/storage/2024/09/logo-Newtec-3-2.png" alt="Logo DIVTEC Newtec" className="logo" />
                    <div>
                        <h1 className="title">Assistant DIVTEC</h1>
                        <p className="subtitle">Pôle de formation technique, CEJEF</p>
                    </div>
                </div>
                <div className="header-controls">
                    {isSpeechEnabled && (
                        <div className="pitch-slider-container">
                            <label htmlFor="pitch">Tonalité:</label>
                             <input 
                                id="pitch"
                                type="range" 
                                min="0.5" 
                                max="2" 
                                step="0.1" 
                                value={pitch}
                                onChange={(e) => setPitch(parseFloat(e.target.value))}
                            />
                        </div>
                    )}
                     <button onClick={toggleSpeech} className={`icon-button speaker-button ${isSpeechEnabled ? 'active' : ''}`} title="Activer/Désactiver la synthèse vocale">
                        <SpeakerIcon active={isSpeechEnabled} />
                    </button>
                    <button onClick={handleClearChat} className="icon-button" title="Effacer la conversation">
                        <TrashIcon />
                    </button>
                </div>
            </header>
            <div className="message-list">
                 {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'model-message'}`}>
                        {(() => {
                            if (msg.role === 'user') {
                                return msg.text;
                            }
                            // Model message logic
                            if (loading && index === messages.length - 1 && !msg.text) {
                                return <TypingIndicator />;
                            }
                            if (msg.text.includes('[CHART:DATA_FLOW]')) {
                                const textPart = msg.text.replace('[CHART:DATA_FLOW]', '').trim();
                                return (
                                    <>
                                        {textPart && <ParsedMarkdown content={textPart} />}
                                        <DataFlowChart />
                                    </>
                                );
                            }
                            return <ParsedMarkdown content={msg.text} />;
                        })()}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Posez votre question ici..."
                    className="input"
                    disabled={loading}
                />
                <button type="button" onClick={handleToggleListening} className={`icon-button ${isListening ? 'listening' : ''}`} title="Saisie vocale">
                    <MicIcon />
                </button>
                <button type="submit" className="button" disabled={loading || !query.trim()}>
                    <SendIcon />
                </button>
            </form>
        </div>
    );
};

export default DivtecChatbot;