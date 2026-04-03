'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { useIsClient } from '@/hooks/use-is-client';

export const UserNav = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const isClient = useIsClient();

  // Prevent hydration mismatch by not rendering anything during SSR
  if (!isClient) return null;

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {user?.display_name || user?.email}
        </span>
        <Button variant="outline" size="sm" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
};
