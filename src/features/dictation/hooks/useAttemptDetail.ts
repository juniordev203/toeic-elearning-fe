'use client';

import { useQuery } from '@tanstack/react-query';
import { attemptsControllerFindOneV1 } from '@/api/generated';

export function useAttemptDetail(id: string) {
  return useQuery({
    queryKey: ['attempt', id],
    queryFn: () => attemptsControllerFindOneV1(id),
    enabled: !!id,
  });
}
