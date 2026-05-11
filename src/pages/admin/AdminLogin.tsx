import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { refreshAdminStatus } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    await refreshAdminStatus();
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      setErrorMessage('Unable to complete sign in.');
      setIsSubmitting(false);
      return;
    }

    const { data: adminRecord } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', sessionData.session.user.id)
      .maybeSingle();

    if (!adminRecord) {
      await supabase.auth.signOut();
      setErrorMessage('This account is not authorized for admin access.');
      setIsSubmitting(false);
      return;
    }

    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f6f1eb_0%,#fdfcfb_55%,#ffffff_100%)] px-4 py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-border/70 bg-background/90 p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)]">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Maison</p>
          <h1 className="font-serif text-3xl">Admin Sign In</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use your admin credentials to enter the control room.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@maison.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </p>
          ) : null}

          <Button className="w-full rounded-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
