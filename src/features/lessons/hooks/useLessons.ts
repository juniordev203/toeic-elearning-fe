'use client';

import { useQuery } from '@tanstack/react-query';
import type { LessonsControllerFindAllV1Params } from '@/api/generated/model';
import { lessonsControllerFindAllV1 } from '@/api/generated';

export function useLessons(params?: LessonsControllerFindAllV1Params) {
  return useQuery({
    queryKey: ['lessons', params],
    queryFn: () => lessonsControllerFindAllV1(params),
  });
}
