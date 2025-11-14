/**
 * @fileoverview Fichier de test pour le hook `useChat`.
 * (Commentaires précédents conservés)
 */
import React, { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseProvider } from '../../contexts/SupabaseContext';
import { useChat } from '../useChat';
import { vi } from 'vitest';

// --- Section de Simulation (Mocks) ---

const createSupabaseMock = () => ({
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: { user: { id: 'test-user-id' } } } }),
  },
}) as unknown as SupabaseClient;

const createWrapper = (supabaseClient: SupabaseClient) => {
  return ({ children }: { children: ReactNode }) => (
    <SupabaseProvider value={supabaseClient}>
      {children}
    </SupabaseProvider>
  );
};

global.fetch = vi.fn();

// Simulation simple du localStorage pour les tests
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock pour crypto.randomUUID
global.crypto.randomUUID = vi.fn();


// --- Suite de Tests pour `useChat` ---

describe('useChat Hook', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    (global.fetch as vi.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ reply: 'Mocked response' }),
    });
  });

  it('devrait créer un nouveau sessionId s\'il n\'en existe pas', () => {
    (crypto.randomUUID as vi.Mock).mockReturnValue('new-session-id');
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);

    renderHook(() => useChat(), { wrapper });

    expect(localStorageMock.getItem('chat_session_id')).toBe('new-session-id');
  });

  it('devrait utiliser un sessionId existant depuis le localStorage', () => {
    localStorageMock.setItem('chat_session_id', 'existing-session-id');
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);

    renderHook(() => useChat(), { wrapper });

    expect(localStorageMock.getItem('chat_session_id')).toBe('existing-session-id');
    expect(crypto.randomUUID).not.toHaveBeenCalled();
  });

  it('devrait envoyer le sessionId dans la requête API', async () => {
    localStorageMock.setItem('chat_session_id', 'session-to-send');
    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);
    const { result } = renderHook(() => useChat(), { wrapper });

    await act(async () => {
      await result.current.handleSubmit('Test', () => '', () => {});
    });

    const fetchBody = JSON.parse((global.fetch as vi.Mock).mock.calls[0][1].body);
    expect(fetchBody.sessionId).toBe('session-to-send');
  });

  it('devrait effacer le sessionId et en créer un nouveau après un clear', async () => {
    (crypto.randomUUID as vi.Mock)
      .mockReturnValueOnce('first-session-id')
      .mockReturnValueOnce('second-session-id');

    const supabaseMock = createSupabaseMock();
    const wrapper = createWrapper(supabaseMock);
    const { result } = renderHook(() => useChat(), { wrapper });

    // Vérifier la session initiale
    expect(localStorageMock.getItem('chat_session_id')).toBe('first-session-id');

    // Effacer le chat
    act(() => {
      result.current.clearChat();
    });

    // Vérifier que la session a été supprimée
    expect(localStorageMock.getItem('chat_session_id')).toBeNull();

    // Envoyer un nouveau message pour déclencher la création d'une nouvelle session
    await act(async () => {
      await result.current.handleSubmit('Nouveau message', () => '', () => {});
    });

    // Vérifier que la nouvelle session a été créée
    expect(localStorageMock.getItem('chat_session_id')).toBe('second-session-id');
  });
});
