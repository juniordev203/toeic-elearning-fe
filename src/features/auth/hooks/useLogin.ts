'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import type { LoginDto } from '@/api/generated/model';
import { authControllerLoginV1 } from '@/api/generated';

export function useLogin() {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (data: LoginDto) => authControllerLoginV1(data),
    onSuccess: (response) => {
      if (response && response.tokens && response.user) {
        const user = {
          ...response.user,
          display_name: (response.user.display_name as string | null) ?? null,
        };
        login(response.tokens.accessToken, response.tokens.refreshToken, user);
      }
    },
  });
}
