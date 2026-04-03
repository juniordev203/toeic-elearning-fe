'use client';

import { useState } from 'react';
import { useLessons } from '../hooks/useLessons';
import { LessonCard } from './LessonCard';
import { DifficultySelectModal } from './DifficultySelectModal';
import { Button } from '@/components/ui/button';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  part_type: string;
  difficulty: string;
  duration_seconds: number;
  total_sentences: number;
}

const partFilters = [
  { label: 'All', value: '' },
  { label: 'Part 3', value: 'PART3' },
  { label: 'Part 4', value: 'PART4' },
];

export function LessonListFeature() {
  const [partFilter, setPartFilter] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const { data, isLoading, isError } = useLessons({
    page: 1,
    limit: 20,
  });

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseModal = () => {
    setSelectedLesson(null);
  };

  const responseData = data as Record<string, unknown> | undefined;
  const lessons =
    (responseData?.data as Lesson[]) ??
    (Array.isArray(data) ? (data as Lesson[]) : []);

  const filteredLessons = partFilter
    ? lessons.filter((l) => l.part_type === partFilter)
    : lessons;

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
        Failed to load lessons. Please try again.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lessons</h1>
        <div className="flex gap-2">
          {partFilters.map((f) => (
            <Button
              key={f.value}
              variant={partFilter === f.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPartFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No lessons found.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onSelect={handleSelectLesson}
            />
          ))}
        </div>
      )}

      {selectedLesson && (
        <DifficultySelectModal
          lessonId={selectedLesson.id}
          lessonTitle={selectedLesson.title}
          open={!!selectedLesson}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
