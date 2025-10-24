import React, { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import Image from 'next/image';
import { KNOWLEDGE_BASE } from '../knowledge';
import { SendIcon, MicIcon, SpeakerIcon, TrashIcon } from '../components/Icons';
import TypingIndicator from '../components/TypingIndicator';
import DataFlowChart from '../components/DataFlowChart';
import ParsedMarkdown from '../components/ParsedMarkdown';

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



import { useSpeechServices } from '../hooks/useSpeechServices';

import { useChat } from '../hooks/useChat';

// --- Main Chatbot Component ---
const DivtecChatbot = () => {
    const [query, setQuery] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const {
        messages,
        loading,
        error: chatError,
        handleSubmit: handleChatSubmit,
        clearChat,
    } = useChat();

    const {
        isListening,
        isSpeechEnabled,
        pitch,
        error: speechError,
        setPitch,
        speak,
        cancelSpeech,
        toggleSpeech,
        initializeRecognition,
        toggleListening,
    } = useSpeechServices();

    useEffect(() => {
        initializeRecognition((transcript) => {
            setQuery(prev => prev + transcript);
        });
    }, [initializeRecognition]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        cancelSpeech();
        handleChatSubmit(query, searchKnowledgeBase, speak);
        setQuery('');
    };

    const handleClearChat = () => {
        cancelSpeech();
        clearChat();
    };

    const handleToggleListening = () => {
        setQuery('');
        toggleListening();
    }

    return (
        <div className="container">
            <header className="header">
                 <div className="header-content">
                    <Image src="https://newtec.divtec.ch/storage/2024/09/logo-Newtec-3-2.png" alt="Logo DIVTEC Newtec" className="logo" width={150} height={50} />
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
            {(chatError || speechError) && <div className="error">{chatError || speechError}</div>}
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