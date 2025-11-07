import React, { useState, useEffect } from 'react';
import '../index.css';
import type { AppProps } from 'next/app';
import { createSupabaseClient } from '../utils/supabase';
import { SupabaseProvider } from '../contexts/SupabaseContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createSupabaseClient());

  useEffect(() => {
    const handleSignIn = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        await supabase.auth.signInAnonymously();
      }
    };

    handleSignIn();
  }, [supabase]);

  return (
    <SupabaseProvider value={supabase}>
      <Component {...pageProps} />
    </SupabaseProvider>
  );
}

export default MyApp;
