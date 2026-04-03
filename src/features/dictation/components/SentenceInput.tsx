'use client';

import { useDictationEngine } from '../hooks/useDictationEngine';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SentenceInputProps {
  originalText: string;
  userInput: string;
  onInputChange: (value: string) => void;
  sentenceIndex: number;
  totalSentences: number;
}

export function SentenceInput({
  originalText,
  userInput,
  onInputChange,
  sentenceIndex,
  totalSentences,
}: SentenceInputProps) {
  const { charResults, accuracy, typedChars, totalChars } = useDictationEngine(
    userInput,
    originalText,
  );

  const progressPercent = totalChars > 0 ? (typedChars / totalChars) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Sentence {sentenceIndex + 1} / {totalSentences}
          </span>
          <span>
            {typedChars}/{totalChars} chars &middot;{' '}
            {typedChars > 0 ? `${accuracy.toFixed(0)}% accuracy` : '—'}
          </span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      {/* Real-time character feedback display */}
      <div className="rounded-xl border bg-muted/30 p-4 font-mono text-lg leading-relaxed">
        {charResults.map((result, i) => (
          <span
            key={`${sentenceIndex}-${i}`}
            className={cn(
              result.isCorrect === null
                ? 'text-muted-foreground/30'
                : result.isCorrect
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-destructive animate-pulse',
            )}
          >
            {result.char}
          </span>
        ))}
      </div>

      {/* Typing input */}
      <Textarea
        value={userInput}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Listen and type here..."
        rows={3}
        autoFocus
        className="font-mono text-base resize-none"
      />
    </div>
  );
}
