import React, { useState } from 'react';
import Button from '../../components/Button';
import { loginUser } from './loginService';
import { useLogin } from './useLogin';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, handleLogin } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(() => loginUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3 max-w-sm">
      <h2 className="text-xl font-bold">Sign In</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <Button label={loading ? 'Signing in...' : 'Sign In'} disabled={loading} />
    </form>
  );
}