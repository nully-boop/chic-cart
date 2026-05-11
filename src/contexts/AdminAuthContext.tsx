import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AdminAuthContextValue = {
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  refreshAdminStatus: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminStatus = useCallback(async (activeSession: Session | null) => {
    if (!activeSession) {
      setIsAdmin(false);
      return;
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', activeSession.user.id)
      .maybeSingle();

    if (error) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(!!data);
  }, []);

  const refreshAdminStatus = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session ?? null);
    await checkAdminStatus(data.session ?? null);
  }, [checkAdminStatus]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      await checkAdminStatus(data.session ?? null);
      if (isMounted) {
        setIsLoading(false);
      }
    };

    init();

    const { data: authSubscription } = supabase.auth.onAuthStateChange(async (_, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession ?? null);
      await checkAdminStatus(nextSession ?? null);
    });

    return () => {
      isMounted = false;
      authSubscription.subscription.unsubscribe();
    };
  }, [checkAdminStatus]);

  const value = useMemo(
    () => ({
      session,
      isAdmin,
      isLoading,
      refreshAdminStatus,
      signOut,
    }),
    [session, isAdmin, isLoading, refreshAdminStatus, signOut]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
