'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface DifficultySelectModalProps {
  lessonId: string;
  lessonTitle: string;
  open: boolean;
  onClose: () => void;
}

const modes = [
  {
    value: 'KEYWORD',
    label: 'Keyword',
    description: 'Fill in the blank keywords. Easiest mode.',
    emoji: '🟢',
  },
  {
    value: 'PHRASE',
    label: 'Phrase',
    description: 'Type whole phrases. Moderate difficulty.',
    emoji: '🟡',
  },
  {
    value: 'FULL_SENTENCE',
    label: 'Full Sentence',
    description: 'Type the entire sentence. Hardest mode.',
    emoji: '🔴',
  },
];

export function DifficultySelectModal({
  lessonId,
  lessonTitle,
  open,
  onClose,
}: DifficultySelectModalProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleStart = () => {
    if (!selected) return;
    router.push(`/dictation/${lessonId}?mode=${selected}`);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Difficulty</DialogTitle>
          <DialogDescription className="truncate">
            {lessonTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {modes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => setSelected(mode.value)}
              className={cn(
                'cursor-pointer w-full flex items-start gap-3 rounded-xl border p-4 text-left transition-all',
                selected === mode.value ? 'border-primary bg-primary/5' : '',
              )}
            >
              <span className="text-xl">{mode.emoji}</span>
              <div>
                <p className="font-medium">{mode.label}</p>
                <p className="text-xs text-muted-foreground">
                  {mode.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleStart} disabled={!selected}>
            Start Dictation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
