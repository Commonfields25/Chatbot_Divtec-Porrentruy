import { createContext, useContext, ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

export const SupabaseProvider = ({ children, value }: { children: ReactNode, value: SupabaseClient }) => {
  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
