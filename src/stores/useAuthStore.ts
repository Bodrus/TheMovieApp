import { create } from 'zustand';

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  authenticateUser: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  username: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  authenticateUser: (name: string) => {
    if (name.trim()) {
      set({ loading: true, error: null });

      set({
        username: name,
        isAuthenticated: true,
        loading: false,
      });
    } else {
      set({
        error: 'Please enter a valid username.',
        isAuthenticated: false,
        loading: false,
      });
    }
  },
  logout: () => {
    set({
      username: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  },
}));
