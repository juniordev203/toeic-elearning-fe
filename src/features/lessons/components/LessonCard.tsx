import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  part_type: string;
  difficulty: string;
  duration_seconds: number;
  total_sentences: number;
}

interface LessonCardProps {
  lesson: Lesson;
  onSelect: (lesson: Lesson) => void;
}

const difficultyVariant: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  EASY: 'secondary',
  MEDIUM: 'default',
  HARD: 'destructive',
};

export function LessonCard({ lesson, onSelect }: LessonCardProps) {
  const handleClick = () => onSelect(lesson);

  return (
    <Card
      className="cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 hover:shadow-md"
      onClick={handleClick}
    >
      <CardContent className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug truncate">
            {lesson.title}
          </h3>
          <Badge variant="outline" className="shrink-0">
            {lesson.part_type === 'PART3' ? 'Part 3' : 'Part 4'}
          </Badge>
        </div>
        {lesson.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {lesson.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="gap-3 text-xs text-muted-foreground">
        <Badge variant={difficultyVariant[lesson.difficulty] || 'secondary'}>
          {lesson.difficulty}
        </Badge>
        <span>{lesson.total_sentences} sentences</span>
        <span>
          {Math.floor(lesson.duration_seconds / 60)}:
          {String(lesson.duration_seconds % 60).padStart(2, '0')}
        </span>
      </CardFooter>
    </Card>
  );
}
