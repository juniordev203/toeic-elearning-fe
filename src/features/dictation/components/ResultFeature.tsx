'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAttemptDetail } from '../hooks/useAttemptDetail';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { AttemptResponseDto } from '@/api/generated/model';

export function ResultFeature() {
  const params = useParams();
  const attemptId = params.attemptId as string;

  const { data, isLoading, isError } = useAttemptDetail(attemptId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-destructive">
        Failed to load results.
      </div>
    );
  }

  const attempt = data as unknown as AttemptResponseDto & {
    lesson?: {
      title: string;
    };
  };

  if (!attempt) return null;

  const accuracyVariant: 'default' | 'secondary' | 'destructive' =
    attempt.accuracy_percent >= 80
      ? 'default'
      : attempt.accuracy_percent >= 50
        ? 'secondary'
        : 'destructive';

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Results</h1>
        {attempt.lesson?.title && (
          <p className="text-sm text-muted-foreground">
            {attempt.lesson.title}
          </p>
        )}
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="text-center py-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Accuracy
            </p>
            <Badge variant={accuracyVariant} className="mt-2 text-lg px-3 py-1">
              {(attempt.accuracy_percent ?? 0).toFixed(1)}%
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Score
            </p>
            <p className="mt-2 text-2xl font-bold">
              {(attempt.score ?? 0).toFixed(0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Correct
            </p>
            <p className="mt-2 text-2xl font-bold">
              {attempt.correct_sentences}/{attempt.total_sentences}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center py-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Duration
            </p>
            <p className="mt-2 text-2xl font-bold">
              {formatDuration(attempt.duration_seconds)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Overall progress bar */}
      <div className="space-y-1">
        <Progress value={attempt.accuracy_percent} className="h-2" />
        <p className="text-xs text-center text-muted-foreground">
          Overall accuracy: {(attempt.accuracy_percent ?? 0).toFixed(1)}%
        </p>
      </div>

      <Separator />

      {/* Sentence Details */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Sentence Details</h2>
        {attempt.details
          ?.sort(
            (a, b) =>
              (a.sentence?.order_index ?? 0) - (b.sentence?.order_index ?? 0),
          )
          .map((detail, idx) => (
            <Card
              key={detail.sentence_id}
              className={cn(
                detail.is_correct
                  ? 'ring-green-300 dark:ring-green-800'
                  : 'ring-red-300 dark:ring-red-800',
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Sentence {idx + 1}</CardTitle>
                  <Badge
                    variant={detail.is_correct ? 'default' : 'destructive'}
                  >
                    {detail.is_correct ? '✓ Correct' : '✗ Incorrect'} ·{' '}
                    {(detail.similarity_score * 100).toFixed(0)}%
                  </Badge>
                </div>
                {detail.sentence?.content && (
                  <CardDescription>
                    <span className="text-muted-foreground">Original: </span>
                    {detail.sentence.content}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <span className="text-muted-foreground">Your input: </span>
                  {detail.user_input || '(empty)'}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/lessons">Back to Lessons</Link>
        </Button>
      </div>
    </div>
  );
}
