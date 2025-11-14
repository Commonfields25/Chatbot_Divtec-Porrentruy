/**
 * @fileoverview Fichier de test pour le hook `useSpeechServices`.
 *
 * Ce fichier teste le hook responsable de la synthèse vocale (parler) et de la
 * reconnaissance vocale (écouter).
 *
 * Les API du navigateur correspondantes (`SpeechSynthesis` et `SpeechRecognition`)
 * n'existent pas dans l'environnement de test Node.js (JSDOM). Par conséquent,
 * une partie cruciale de ce fichier est la simulation (mock) de ces API
 * pour vérifier que notre hook les appelle correctement.
 */

// src/hooks/__tests__/useSpeechServices.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useSpeechServices } from '../useSpeechServices';
import { vi } from 'vitest';

// --- Section de Simulation (Mocks) des API Web Speech ---

// Simule l'API de synthèse vocale du navigateur.
const mockSpeechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  getVoices: vi.fn().mockReturnValue([{ lang: 'fr-FR', name: 'Google français' }]),
};

// Simule l'API de reconnaissance vocale du navigateur.
const mockSpeechRecognition = vi.fn(() => ({
  start: vi.fn(),
  stop: vi.fn(),
}));

// Attache les simulations à l'objet `window` global pour que le hook puisse les utiliser.
Object.defineProperty(window, 'speechSynthesis', { value: mockSpeechSynthesis, writable: true });
Object.defineProperty(window, 'webkitSpeechRecognition', { value: mockSpeechRecognition, writable: true });

// Simule le constructeur `SpeechSynthesisUtterance` pour vérifier le texte à vocaliser.
global.SpeechSynthesisUtterance = vi.fn();

// --- Suite de Tests pour `useSpeechServices` ---

describe('useSpeechServices Hook', () => {

  // Réinitialise les mocks avant chaque test.
const mockSpeechRecognition = vi.fn(() => ({ start: vi.fn(), stop: vi.fn() }));
Object.defineProperty(window, 'speechSynthesis', { value: mockSpeechSynthesis, writable: true });
Object.defineProperty(window, 'webkitSpeechRecognition', { value: mockSpeechRecognition, writable: true });

// Simule le constructeur `SpeechSynthesisUtterance` pour vérifier le texte à vocaliser.
global.SpeechSynthesisUtterance = vi.fn();

// --- Suite de Tests pour `useSpeechServices` ---

describe('useSpeechServices Hook', () => {

  // Réinitialise les mocks avant chaque test.
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Teste la fonction interne de nettoyage de texte.
   * Scénario : Quand on demande au hook de parler, il doit d'abord nettoyer le texte
   * de tout code Markdown ou HTML pour que la prononciation soit naturelle.
   */
  it('devrait nettoyer le Markdown et le HTML du texte avant la vocalisation', () => {
    const { result } = renderHook(() => useSpeechServices());

    act(() => {
      // On active d'abord la synthèse vocale.
      result.current.toggleSpeech();
      // On efface les appels de mock précédents pour isoler le test de `speak`.
  // Test de la logique de nettoyage via la fonction `speak`
  it('should clean markdown and HTML from text before speaking', () => {
    const { result } = renderHook(() => useSpeechServices());

    act(() => {
      // On active d'abord la synthèse vocale.
      result.current.toggleSpeech();
      // On efface les appels de mock précédents pour isoler le test de `speak`.
      (SpeechSynthesisUtterance as vi.Mock).mockClear();
    });

    act(() => {
      // On demande au hook de dire une phrase contenant du Markdown et du HTML.
      result.current.speak('## Titre **gras** `code` <p>html</p>');
    });

    // On vérifie que le texte passé à l'API de synthèse est bien la version nettoyée.
    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('Titre gras code html');
  });

  /**
   * Teste l'activation et la désactivation de la synthèse vocale.
   * Scénario : L'utilisateur peut activer ou désactiver la synthèse vocale.
   */
  it('devrait activer et désactiver la synthèse vocale', () => {
    const { result } = renderHook(() => useSpeechServices());

    // 1. Activer
      result.current.speak('## Titre **gras** `code` <p>html</p>');
    });

    // On vérifie que le texte passé à l'API de synthèse est bien la version nettoyée.
    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('Titre gras code html');
  });

  /**
   * Teste l'activation et la désactivation de la synthèse vocale.
   * Scénario : L'utilisateur peut activer ou désactiver la synthèse vocale.
   */
  it('devrait activer et désactiver la synthèse vocale', () => {
    const { result } = renderHook(() => useSpeechServices());

    // 1. Activer
    act(() => {
      result.current.toggleSpeech();
    });
    expect(result.current.isSpeechEnabled).toBe(true);
    // Vérifie que le message de confirmation est bien dit.
    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('Synthèse vocale activée.');

    // 2. Désactiver
    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('Synthèse vocale activée.');

    // 2. Désactiver
    act(() => {
      result.current.toggleSpeech();
    });
    expect(result.current.isSpeechEnabled).toBe(false);
    // Vérifie que toute parole en cours est bien annulée.
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });

  /**
   * Teste la gestion d'erreur quand le navigateur ne supporte pas la reconnaissance vocale.
   * Scénario : Si l'API `SpeechRecognition` n'est pas disponible, le hook doit
   * mettre à jour son état d'erreur.
   */
  it('ne devrait pas démarrer l\'écoute si la reconnaissance vocale n\'est pas supportée', () => {
    // On cache temporairement l'API de reconnaissance vocale.
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });

  /**
   * Teste la gestion d'erreur quand le navigateur ne supporte pas la reconnaissance vocale.
   * Scénario : Si l'API `SpeechRecognition` n'est pas disponible, le hook doit
   * mettre à jour son état d'erreur.
   */
  it('ne devrait pas démarrer l\'écoute si la reconnaissance vocale n\'est pas supportée', () => {
    // On cache temporairement l'API de reconnaissance vocale.
    const originalRecognition = window.webkitSpeechRecognition;
    Object.defineProperty(window, 'webkitSpeechRecognition', { value: undefined, writable: true });

    const { result } = renderHook(() => useSpeechServices());

    act(() => {
        result.current.toggleListening();
    });

    // Vérifier que l'écoute n'est pas activée et qu'un message d'erreur est défini.
    expect(result.current.isListening).toBe(false);
    expect(result.current.error).toBe("La reconnaissance vocale n'est pas supportée sur ce navigateur.");

    // Restaurer l'API pour ne pas affecter les autres tests.
    expect(result.current.isListening).toBe(false);
    expect(result.current.error).toBe("La reconnaissance vocale n'est pas supportée sur ce navigateur.");

    // Restaurer l'API pour ne pas affecter les autres tests.
    Object.defineProperty(window, 'webkitSpeechRecognition', { value: originalRecognition, writable: true });
  });
});
