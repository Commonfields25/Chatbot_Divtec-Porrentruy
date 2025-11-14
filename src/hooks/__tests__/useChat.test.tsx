// src/hooks/__tests__/useChat.test.tsx
import React, { ReactNode } from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseProvider } from '../../contexts/SupabaseContext';
import { useChat } from '../useChat';
import { vi } from 'vitest';

// 1. Créer un client Supabase simulé
const createSupabaseMock = () => ({
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: { user: { id: 'test-user-id' } } } }),
  },
  functions: {
    invoke: vi.fn(),
  },
}) as unknown as SupabaseClient;

// 2. Créer un "wrapper" qui fournit le contexte
const createWrapper = (supabaseClient: SupabaseClient) => {
  return ({ children }: { children: ReactNode }) => (
    <SupabaseProvider value={supabaseClient}>
      {children}
    </SupabaseProvider>
  );
};

// Mock global pour fetch
global.fetch = vi.fn();

describe('useChat', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with a welcome message', () => {
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);
    const { result } = renderHook(() => useChat(), { wrapper });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe('model');
  });

  it('should send a message and receive a successful response', async () => {
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);
    const { result } = renderHook(() => useChat(), { wrapper });

    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'Voici votre réponse.' }),
    });

    await act(async () => {
      await result.current.handleSubmit('Ma question', () => '', () => {});
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toBe('Voici votre réponse.');
    expect(result.current.error).toBeNull();
  });

  it('should handle a network error gracefully', async () => {
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);
    const { result } = renderHook(() => useChat(), { wrapper });

    // Configurer le mock fetch pour simuler une erreur réseau
    (fetch as vi.Mock).mockRejectedValue(new Error('Network error'));

    await act(async () => {
      await result.current.handleSubmit('Question qui va échouer', () => '', () => {});
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toContain('Désolé, une erreur est survenue : Network error');
    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toContain('Je suis désolé, une erreur est survenue.');
  });
});
