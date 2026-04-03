'use client';

import { useMutation } from '@tanstack/react-query';
import type { SubmitAttemptDto } from '@/api/generated/model';
import { attemptsControllerSubmitV1 } from '@/api/generated';

export function useSubmitAttempt() {
  return useMutation({
    mutationFn: (data: SubmitAttemptDto) => attemptsControllerSubmitV1(data),
  });
}
