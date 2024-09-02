import { create } from 'zustand';
import { getStorageItem, setStorageItem, StorageKeys } from './Storage.ts';

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  authenticateUser: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  username: getStorageItem(StorageKeys.userName) || null,
  isAuthenticated: !!getStorageItem(StorageKeys.userName),
  loading: false,
  error: null,
  authenticateUser: (name: string) => {
    if (name.trim()) {
      set({
        username: name,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      setStorageItem(StorageKeys.userName, name);
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
