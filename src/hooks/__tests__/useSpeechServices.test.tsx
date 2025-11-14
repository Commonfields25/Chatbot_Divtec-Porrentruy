// src/hooks/__tests__/useSpeechServices.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useSpeechServices } from '../useSpeechServices';
import { vi } from 'vitest';

// Simuler les API Web Speech
const mockSpeechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  getVoices: vi.fn().mockReturnValue([{ lang: 'fr-FR', name: 'Google français' }]),
};
const mockSpeechRecognition = vi.fn(() => ({ start: vi.fn(), stop: vi.fn() }));
Object.defineProperty(window, 'speechSynthesis', { value: mockSpeechSynthesis, writable: true });
Object.defineProperty(window, 'webkitSpeechRecognition', { value: mockSpeechRecognition, writable: true });
global.SpeechSynthesisUtterance = vi.fn();

describe('useSpeechServices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test de la logique de nettoyage via la fonction `speak`
  it('should clean markdown and HTML from text before speaking', () => {
    const { result } = renderHook(() => useSpeechServices());

    act(() => {
      // Activer d'abord la synthèse vocale (sans vérifier son output ici)
      result.current.toggleSpeech();
      // Vider les appels précédents pour isoler le test de `speak`
      (SpeechSynthesisUtterance as vi.Mock).mockClear();
    });

    act(() => {
      result.current.speak('## Titre **gras** `code` <p>html</p>');
    });

    // Maintenant, vérifier le bon appel
    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('Titre gras code html');
  });

  it('should toggle speech on and off', () => {
    const { result } = renderHook(() => useSpeechServices());

    // Activer
    act(() => {
      result.current.toggleSpeech();
    });
    expect(result.current.isSpeechEnabled).toBe(true);
    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('Synthèse vocale activée.');

    // Désactiver
    act(() => {
      result.current.toggleSpeech();
    });
    expect(result.current.isSpeechEnabled).toBe(false);
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });

  it('should not start listening if recognition is not supported', () => {
    // Cacher temporairement l'API de reconnaissance
    const originalRecognition = window.webkitSpeechRecognition;
    Object.defineProperty(window, 'webkitSpeechRecognition', { value: undefined, writable: true });

    const { result } = renderHook(() => useSpeechServices());

    act(() => {
        result.current.toggleListening();
    });

    expect(result.current.isListening).toBe(false);
    expect(result.current.error).toBe("La reconnaissance vocale n'est pas supportée sur ce navigateur.");

    // Restaurer l'API pour les autres tests
    Object.defineProperty(window, 'webkitSpeechRecognition', { value: originalRecognition, writable: true });
  });
});
