import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const navItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Analytics', to: '/admin/analytics' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Create Product', to: '/admin/products/new' },
];

export function AdminLayout() {
  const { session, signOut } = useAdminAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f6f1eb_0%,#fdfcfb_55%,#ffffff_100%)] text-foreground">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-3xl border border-border/70 bg-background/80 p-5 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.5)] backdrop-blur">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Maison</p>
            <h1 className="font-serif text-2xl">Admin Studio</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `block rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="space-y-6">
          <header className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-background/80 px-6 py-4 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.5)] backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Admin</p>
              <h2 className="font-serif text-2xl">Control Room</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{session?.user.email}</span>
              <Button variant="outline" size="sm" className="rounded-full" onClick={signOut}>
                Sign out
              </Button>
            </div>
          </header>

          <div className="rounded-3xl border border-border/70 bg-background/90 p-6 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.45)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
