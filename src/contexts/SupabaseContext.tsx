/**
 * @fileoverview Contexte React pour le client Supabase.
 *
 * Ce fichier a un rôle crucial : il crée un "contexte" React qui détient
 * l'instance unique du client Supabase.
 *
 * L'objectif est de rendre ce client accessible à n'importe quel composant ou hook
 * de l'application sans avoir à le passer manuellement à travers les `props`
 * (ce qui serait très lourd). C'est le principe du "Provider Pattern".
 *
 * 1. `SupabaseContext` : L'objet de contexte lui-même.
 * 2. `SupabaseProvider` : Un composant qui doit envelopper l'application. Il prend
 *    le client Supabase en `value` et le rend disponible à tous ses enfants.
 * 3. `useSupabase` : Un hook personnalisé qui permet aux composants/hooks d'accéder
 *    facilement au client Supabase fourni par le `Provider`. S'il est utilisé en
 *    dehors d'un `SupabaseProvider`, il lève une erreur pour éviter les bugs.
 */

import { createContext, useContext, ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

// Crée le contexte avec `undefined` comme valeur par défaut.
const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

/**
 * Le composant Provider qui distribue le client Supabase.
 * @param {object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les composants enfants qui auront accès au contexte.
 * @param {SupabaseClient} props.value - L'instance du client Supabase à fournir.
 */
export const SupabaseProvider = ({ children, value }: { children: ReactNode, value: SupabaseClient }) => {
  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};

/**
 * Hook pour consommer le contexte Supabase.
 * @returns {SupabaseClient} L'instance du client Supabase.
 * @throws {Error} Si le hook est utilisé en dehors d'un `SupabaseProvider`.
 */
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
