import React, { useState, useEffect } from 'react';
import '../index.css';
import type { AppProps } from 'next/app';
import { createSupabaseClient } from '../utils/supabase';
import { SupabaseProvider } from '../contexts/SupabaseContext';
import type { SupabaseClient } from '@supabase/supabase-js';

function MyApp({ Component, pageProps }: AppProps) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const supabaseClient = createSupabaseClient();
      setSupabase(supabaseClient);

      const handleSignIn = async () => {
        const { data } = await supabaseClient.auth.getSession();
        if (!data.session) {
          await supabaseClient.auth.signInAnonymously();
        }
      };
      handleSignIn();
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h1>Erreur de configuration</h1>
        <p>{error}</p>
        <p>Veuillez vérifier que les variables d&apos;environnement Supabase sont correctement configurées dans votre fichier <code>.env.local</code>.</p>
      </div>
    );
  }

  if (!supabase) {
    return <div>Chargement...</div>;
  }

  return (
    <SupabaseProvider value={supabase}>
      <Component {...pageProps} />
    </SupabaseProvider>
  );
}

export default MyApp;
