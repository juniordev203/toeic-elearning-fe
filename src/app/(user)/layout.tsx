'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserNav } from '@/features/auth/components/UserNav';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <Link href="/" className="text-xl font-bold">
            TOEIC Dictation
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/lessons">Lessons</Link>
            </Button>

            <Separator orientation="vertical" className="h-5" />

            <UserNav />
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2026 TOEIC Dictation MVP
        </div>
      </footer>
    </div>
  );
}
