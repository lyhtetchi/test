import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
    nav('/account');
  };

  return (
    <main className="premium-section max-w-md">
      <form className="glass-card space-y-4 rounded-2xl p-6" onSubmit={onSubmit}>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <input className="w-full rounded-lg bg-slate-900 px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg bg-slate-900 px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded-lg bg-violet-500 py-2 font-medium" type="submit">Login</button>
        <button className="w-full rounded-lg border border-borderglass py-2" type="button" onClick={() => void loginWithGoogle()}>Continue with Google</button>
        <p className="text-sm text-slate-300">No account? <Link to="/signup" className="text-violet-300">Sign up</Link></p>
      </form>
    </main>
  );
};
