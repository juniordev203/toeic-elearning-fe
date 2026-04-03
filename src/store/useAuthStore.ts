import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  display_name: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!Cookies.get('access_token'),

  login: (accessToken, refreshToken, user) => {
    if (accessToken && accessToken !== 'undefined') {
      Cookies.set('access_token', accessToken, { expires: 1 }); // 1 day
    }
    if (refreshToken && refreshToken !== 'undefined') {
      Cookies.set('refresh_token', refreshToken, { expires: 7 }); // 7 days
    }
    set({ user, isAuthenticated: !!accessToken });
  },

  logout: () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user) => {
    set({ user });
  },
}));
