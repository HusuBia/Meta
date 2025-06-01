'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Șterge utilizatorul anterior din localStorage (ex: Bianca)
    localStorage.removeItem('user');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || 'Login failed';
        setErrorMessage(errorMessage);
        return;
      }

      const token = response.headers.get('Authorization')?.replace('Bearer ', '') || data.token;

      if (!token) {
        setErrorMessage('No token received from server');
        return;
      }

      // Salvează tokenul în localStorage
      localStorage.setItem('token', token);

      // Obține profilul utilizatorului folosind tokenul
      const profileRes = await fetch('http://localhost:8080/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!profileRes.ok) {
        setErrorMessage('Failed to fetch user profile');
        return;
      }

      const profile = await profileRes.json();

      // Salvează profilul utilizatorului actual
      localStorage.setItem('user', JSON.stringify(profile));

      // Redirecționează către dashboard-ul specific rolului
      router.push('/dashboard/' + profile.role.toLowerCase());
    } catch (error) {
      setErrorMessage('Something went wrong');
      console.error('Error during login:', error);
    }
  };

  return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Login to NextStep</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>

          {errorMessage && (
              <p className="text-red-600 text-center mt-4">{errorMessage}</p>
          )}

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link href="/signUp" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
  );
}
