'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || 'Login failed';
        } catch {
          errorMessage = errorText || 'Login failed';
        }
        setErrorMessage(errorMessage);
      } else {
        const json = await response.json();
        const token = response.headers.get('Authorization')?.replace('Bearer ', '') || json.token;
        let userData = {};
        try {
          userData = await response.json();
        } catch (err) {
          console.warn('No JSON in success response');
        }

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        }

        router.push('/dashboard/user');
      }

    } catch (error) {
      setErrorMessage('Something went wrong')
      console.error('Error during login:', error)
    }
  }

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
            Don't have an account? <Link href="/signUp" className="text-purple-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </main>
  )
}
