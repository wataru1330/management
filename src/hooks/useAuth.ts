import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, isLoading, logout } = useAuthStore();
  return { user, isLoading, logout };
};