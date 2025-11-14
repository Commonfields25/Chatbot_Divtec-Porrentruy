/**
 * @fileoverview Fichier de test pour le hook `useChat`.
 *
 * Ce fichier contient une suite de tests unitaires et d'intégration pour le hook `useChat`.
 * L'objectif est de s'assurer que la logique de gestion du chat (envoi de messages,
 * réception de réponses, gestion des états de chargement et d'erreur) fonctionne
 * comme prévu.
 *
 * Pour isoler le hook des dépendances externes (Supabase, API fetch),
 * nous utilisons des simulations (mocks).
 */

import React, { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
// src/hooks/__tests__/useChat.test.tsx
import React, { ReactNode } from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseProvider } from '../../contexts/SupabaseContext';
import { useChat } from '../useChat';
import { vi } from 'vitest';

// --- Section de Simulation (Mocks) ---

/**
 * Crée un client Supabase simulé.
 *
 * Cette fonction retourne un objet qui imite le client Supabase, mais dont les méthodes
 * sont des fonctions de simulation (`vi.fn()`). Cela nous permet de contrôler leur
 * comportement dans les tests (par exemple, simuler une réponse réussie ou une erreur)
 * sans faire de vrais appels réseau.
 *
 * @returns {SupabaseClient} Un objet simulant le client Supabase.
 */
// 1. Créer un client Supabase simulé
const createSupabaseMock = () => ({
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: { user: { id: 'test-user-id' } } } }),
  },
  functions: {
    invoke: vi.fn(),
  },
}) as unknown as SupabaseClient;

/**
 * Crée un composant "wrapper" pour fournir le contexte Supabase.
 *
 * Le hook `useChat` a besoin d'accéder au contexte Supabase pour fonctionner.
 * Ce "wrapper" est un composant React qui enveloppe le hook testé
 * avec le `SupabaseProvider`, lui donnant ainsi accès au client Supabase simulé.
 *
 * @param {SupabaseClient} supabaseClient - Le client Supabase simulé.
 * @returns {Function} Un composant React servant de wrapper.
 */
// 2. Créer un "wrapper" qui fournit le contexte
const createWrapper = (supabaseClient: SupabaseClient) => {
  return ({ children }: { children: ReactNode }) => (
    <SupabaseProvider value={supabaseClient}>
      {children}
    </SupabaseProvider>
  );
};

// Simulation globale pour l'API `fetch` du navigateur.
global.fetch = vi.fn();

// --- Suite de Tests pour `useChat` ---

describe('useChat Hook', () => {

  // Réinitialise toutes les simulations avant chaque test pour garantir l'isolation.
// Mock global pour fetch
global.fetch = vi.fn();

describe('useChat', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Teste l'état initial du hook.
   * Scénario : Quand le chat est initialisé, il doit contenir un message de bienvenue.
   */
  it('devrait s\'initialiser avec un message de bienvenue', () => {
  it('should initialize with a welcome message', () => {
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);
    const { result } = renderHook(() => useChat(), { wrapper });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe('model');
  });

  /**
   * Teste le scénario "heureux" (happy path).
   * Scénario : Un utilisateur envoie un message et reçoit une réponse réussie de l'API.
   */
  it('devrait envoyer un message et recevoir une réponse avec succès', async () => {
  it('should send a message and receive a successful response', async () => {
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);
    const { result } = renderHook(() => useChat(), { wrapper });

    // Simuler une réponse réussie de l'API fetch.
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'Voici votre réponse.' }),
    });

    // Simuler l'action de l'utilisateur qui envoie un message.
    await act(async () => {
      await result.current.handleSubmit('Ma question', () => '', () => {});
    });

    // Vérifier que l'état du chat a été mis à jour correctement.
    expect(result.current.loading).toBe(false);
    expect(result.current.messages).toHaveLength(3); // Bienvenue + User + Réponse
    expect(result.current.loading).toBe(false);
    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toBe('Voici votre réponse.');
    expect(result.current.error).toBeNull();
  });

  /**
   * Teste la gestion des erreurs réseau.
   * Scénario : L'appel à l'API échoue, et le hook doit gérer l'erreur proprement.
   */
  it('devrait gérer une erreur réseau correctement', async () => {
  it('should handle a network error gracefully', async () => {
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);
    const { result } = renderHook(() => useChat(), { wrapper });

    // Simuler une erreur réseau.
    (fetch as vi.Mock).mockRejectedValue(new Error('Network error'));

    // Simuler l'envoi d'un message qui va échouer.
    // Configurer le mock fetch pour simuler une erreur réseau
    (fetch as vi.Mock).mockRejectedValue(new Error('Network error'));

    await act(async () => {
      await result.current.handleSubmit('Question qui va échouer', () => '', () => {});
    });

    // Vérifier que l'état d'erreur est correctement mis à jour.
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toContain('Désolé, une erreur est survenue : Network error');
    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toContain('Je suis désolé, une erreur est survenue.');
  });
});
