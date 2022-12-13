import { createContext, useContext, useState, useEffect } from 'react';
import type {
  AuthError,
  AuthResponse,
  SignUpWithPasswordCredentials,
  Session,
} from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';
import { FC } from '@/types/fc';

interface AuthProviderFields {
  signUp?: (
    credentials: SignUpWithPasswordCredentials,
  ) => Promise<AuthResponse>;
  signIn?: (
    credentials: SignUpWithPasswordCredentials,
  ) => Promise<AuthResponse>;
  signOut?: () => Promise<{ error: AuthError | null }>;
  session?: Session | null;
  loading?: boolean;
}

const AuthContext = createContext<AuthProviderFields>({});

export const AuthProvider: FC = (props) => {
  const { children } = props;
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setLoading(false);
      },
    );
    setLoading(false);
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value: AuthProviderFields = {
    signUp: supabase.auth.signUp,
    signIn: supabase.auth.signInWithPassword,
    signOut: supabase.auth.signOut,
    session,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthProviderFields => {
  return useContext(AuthContext);
};

export const authLoader = async () => {
  return supabase.auth.getSession();
};
