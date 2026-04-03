import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Master TOEIC Listening
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Practice dictation with real TOEIC Part 3 &amp; Part 4 audio. Get
        instant character-by-character feedback as you type.
      </p>
      <div className="mt-8 flex gap-4">
        <Button size="lg" asChild>
          <Link href="/lessons">Start Practicing</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/register">Create Account</Link>
        </Button>
      </div>
    </div>
  );
}
