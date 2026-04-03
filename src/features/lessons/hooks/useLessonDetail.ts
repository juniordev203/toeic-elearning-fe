'use client';

import { useQuery } from '@tanstack/react-query';
import { lessonsControllerFindOneV1 } from '@/api/generated';

export function useLessonDetail(id: string) {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: () => lessonsControllerFindOneV1(id),
    enabled: !!id,
  });
}
