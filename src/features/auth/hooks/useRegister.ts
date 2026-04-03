'use client';

import { useMutation } from '@tanstack/react-query';
import type { RegisterDto } from '@/api/generated/model';
import { authControllerRegisterV1 } from '@/api/generated';

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterDto) => authControllerRegisterV1(data),
  });
}
