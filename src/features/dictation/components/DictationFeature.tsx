'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useLessonDetail } from '@/features/lessons/hooks/useLessonDetail';
import { useDictationStore } from '../store/useDictationStore';
import { useSubmitAttempt } from '../hooks/useSubmitAttempt';
import { AudioPlayer } from './AudioPlayer';
import { SentenceInput } from './SentenceInput';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Sentence {
  id: string;
  order_index: number;
  content: string;
  start_time: number;
  end_time: number;
  keywords: string[];
  phrases: string[];
}

interface LessonData {
  id: string;
  title: string;
  audio_url: string;
  sentences: Sentence[];
}

export function DictationFeature() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const lessonId = params.lessonId as string;
  const mode = searchParams.get('mode') || 'FULL_SENTENCE';

  const { data, isLoading, isError } = useLessonDetail(lessonId);
  const { mutate: submitAttempt, isPending: isSubmitting } = useSubmitAttempt();

  const {
    currentSentenceIndex,
    userInputs,
    startedAt,
    setInput,
    nextSentence,
    prevSentence,
    reset,
  } = useDictationStore();

  const responseData = data as Record<string, unknown> | undefined;
  const lesson =
    (responseData?.data as LessonData) ?? (data as unknown as LessonData);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError || !lesson?.sentences) {
    return (
      <div className="py-20 text-center text-destructive">
        Failed to load lesson data.
      </div>
    );
  }

  const sentences = [...lesson.sentences].sort(
    (a, b) => a.order_index - b.order_index,
  );
  const currentSentence = sentences[currentSentenceIndex];
  const currentInput = userInputs[currentSentenceIndex] || '';
  const isLastSentence = currentSentenceIndex === sentences.length - 1;

  const handleInputChange = (value: string) => {
    setInput(currentSentenceIndex, value);
  };

  const handleNext = () => {
    nextSentence(sentences.length);
  };

  const handlePrev = () => {
    prevSentence();
  };

  const handleSubmit = () => {
    const details = sentences.map((sentence, idx) => ({
      sentence_id: sentence.id,
      user_input: userInputs[idx] || '',
    }));

    submitAttempt(
      {
        lesson_id: lessonId,
        difficulty_mode: mode as 'KEYWORD' | 'PHRASE' | 'FULL_SENTENCE',
        started_at: startedAt || new Date().toISOString(),
        completed_at: new Date().toISOString(),
        details,
      },
      {
        onSuccess: (response: unknown) => {
          const result = response as Record<string, unknown>;
          const attemptData =
            (result?.data as Record<string, unknown>) ?? result;
          const attemptId = attemptData?.id as string;
          reset();
          if (attemptId) {
            router.push(`/result/${attemptId}`);
          } else {
            router.push('/lessons');
          }
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{lesson.title}</CardTitle>
            <Badge variant="outline">{mode.replace('_', ' ')}</Badge>
          </div>
          <CardDescription>
            Listen carefully and type what you hear
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AudioPlayer
            audioUrl={lesson.audio_url}
            currentStartTime={currentSentence.start_time}
            currentEndTime={currentSentence.end_time}
          />
        </CardContent>
      </Card>

      {/* Sentence Input with feedback */}
      <Card>
        <CardContent className="pt-0">
          <SentenceInput
            originalText={currentSentence.content}
            userInput={currentInput}
            onInputChange={handleInputChange}
            sentenceIndex={currentSentenceIndex}
            totalSentences={sentences.length}
          />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handlePrev}
          disabled={currentSentenceIndex === 0}
        >
          ← Previous
        </Button>

        {isLastSentence ? (
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit ✓'}
          </Button>
        ) : (
          <Button className="flex-1" onClick={handleNext}>
            Next →
          </Button>
        )}
      </div>
    </div>
  );
}
