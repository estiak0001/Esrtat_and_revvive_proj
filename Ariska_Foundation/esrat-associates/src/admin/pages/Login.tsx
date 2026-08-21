import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 mb-4">
            <Lock size={24} className="text-[#C9A84C]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-white/50 text-sm mt-1">ESRAT Associates CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/60 text-xs font-medium mb-1.5">Username</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-white/5 border border-white/15 text-white rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]/60 placeholder-white/20"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs font-medium mb-1.5">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-white/5 border border-white/15 text-white rounded-lg pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]/60 placeholder-white/20"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-50 text-[#0D1B2A] font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
