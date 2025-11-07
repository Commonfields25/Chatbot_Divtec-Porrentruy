import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DivtecChatbot from '@/pages/index';
import { SupabaseProvider } from '../contexts/SupabaseContext';
import type { SupabaseClient } from '@supabase/supabase-js';

// Mock Supabase client
const createMockSupabase = () => ({
  auth: {
    getSession: vi.fn().mockResolvedValue({
      data: {
        session: {
          user: { id: 'test-user-id' },
        },
      },
    }),
  },
});

describe('DivtecChatbot', () => {
  it('renders the initial welcome message', () => {
    const mockSupabase = createMockSupabase();
    render(
      <SupabaseProvider value={mockSupabase as unknown as SupabaseClient}>
        <DivtecChatbot />
      </SupabaseProvider>
    );
    const welcomeMessage = screen.getByText(/Bonjour ! Comment puis-je vous aider concernant la DIVTEC ?/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
