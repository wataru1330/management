import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData, TalentAssignment } from '../types/user';
import bcrypt from 'bcryptjs';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  users: User[];
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  assignTalentToManager: (assignment: TalentAssignment) => void;
  getAllUsers: () => User[];
  getManagerTalents: (managerId: string) => User[];
  getTalentManager: (talentId: string) => User | null;
}

// 実際のアプリケーションではこれらの情報はバックエンドで管理します
const mockUsers = new Map<string, { user: User; passwordHash: string }>();

// 初期管理者アカウントの作成
const initializeAdmin = async () => {
  const adminEmail = 'admin@example.com';
  if (!mockUsers.has(adminEmail)) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);
    const adminUser: User = {
      id: 'admin-1',
      email: adminEmail,
      name: '管理者',
      role: 'admin',
      profileImage: `https://api.dicebear.com/7.x/avatars/svg?seed=${adminEmail}`,
    };
    mockUsers.set(adminEmail, { user: adminUser, passwordHash });
  }
};

initializeAdmin();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isLoading: false,
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      login: async (credentials: LoginCredentials) => {
        const userData = mockUsers.get(credentials.email);
        if (!userData) {
          throw new Error('Invalid credentials');
        }

        const isValid = await bcrypt.compare(credentials.password, userData.passwordHash);
        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        set({ user: userData.user });
        return userData.user;
      },

      register: async (data: RegisterData) => {
        if (mockUsers.has(data.email)) {
          throw new Error('Email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);

        const newUser: User = {
          id: crypto.randomUUID(),
          email: data.email,
          name: data.name,
          role: data.role,
          profileImage: `https://api.dicebear.com/7.x/avatars/svg?seed=${data.email}`,
          talents: data.role === 'manager' ? [] : undefined,
        };

        mockUsers.set(data.email, { user: newUser, passwordHash });
        set({ user: newUser });
        return newUser;
      },

      logout: () => {
        set({ user: null });
      },

      assignTalentToManager: ({ talentId, managerId }) => {
        const users = Array.from(mockUsers.values()).map(u => u.user);
        const talent = users.find(u => u.id === talentId);
        const manager = users.find(u => u.id === managerId);

        if (!talent || !manager || talent.role !== 'talent' || manager.role !== 'manager') {
          throw new Error('Invalid assignment');
        }

        // 既存の割り当てを解除
        if (talent.managerId) {
          const oldManager = users.find(u => u.id === talent.managerId);
          if (oldManager) {
            oldManager.talents = oldManager.talents?.filter(id => id !== talentId);
            mockUsers.set(oldManager.email, { 
              ...mockUsers.get(oldManager.email)!,
              user: oldManager 
            });
          }
        }

        // 新しい割り当てを設定
        talent.managerId = managerId;
        manager.talents = [...(manager.talents || []), talentId];

        mockUsers.set(talent.email, { 
          ...mockUsers.get(talent.email)!,
          user: talent 
        });
        mockUsers.set(manager.email, { 
          ...mockUsers.get(manager.email)!,
          user: manager 
        });

        // ログインユーザーの情報を更新
        const currentUser = get().user;
        if (currentUser && (currentUser.id === talentId || currentUser.id === managerId)) {
          set({ user: currentUser.id === talentId ? talent : manager });
        }
      },

      getAllUsers: () => {
        return Array.from(mockUsers.values()).map(u => u.user);
      },

      getManagerTalents: (managerId: string) => {
        const users = Array.from(mockUsers.values()).map(u => u.user);
        return users.filter(u => u.managerId === managerId);
      },

      getTalentManager: (talentId: string) => {
        const users = Array.from(mockUsers.values()).map(u => u.user);
        const talent = users.find(u => u.id === talentId);
        return users.find(u => u.id === talent?.managerId) || null;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);