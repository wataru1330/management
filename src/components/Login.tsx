import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials, RegisterData } from '../types/user';
import { Shield } from 'lucide-react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, register, isLoading } = useAuthStore();

  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
    role: 'talent',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        await register(formData);
      } else {
        await login({
          email: formData.email,
          password: formData.password,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '認証エラーが発生しました');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-md w-full space-y-8 glass-card p-8 rounded-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-pink text-transparent bg-clip-text">
            VTuber Manager
          </h2>
          <p className="mt-2 text-gray-600">事務所管理システム</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名前
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              パスワード
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                役割
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
              >
                <option value="talent">タレント</option>
                <option value="manager">マネージャー</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? '処理中...' : isRegister ? '登録' : 'ログイン'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-brand-purple hover:underline"
          >
            {isRegister ? 'アカウントをお持ちの方' : '新規登録はこちら'}
          </button>
        </div>

        {!isRegister && (
          <div className="text-center text-sm text-gray-500">
            管理者アカウント: admin@example.com / admin123
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;