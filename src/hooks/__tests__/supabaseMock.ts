// src/hooks/__tests__/supabaseMock.ts
import { SupabaseClient } from '@supabase/supabase-js';

export const createSupabaseMock = (): Partial<SupabaseClient> => ({
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
      error: null,
    }),
  } as any,
  functions: {
    invoke: vi.fn().mockResolvedValue({
      data: { reply: 'Mocked response' },
      error: null,
    }),
  } as any,
});
