import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // Default is false for simulation
  user: null,
  login: () => set({ isLoggedIn: true, user: { name: 'Admin', email: 'admin@securevibe.com' } }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));
