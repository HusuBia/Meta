'use client';

import { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword || !form.role) {
      setError('All fields are required.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${form.firstName} ${form.lastName}`,
          email: form.email,
          password: form.password,
          role: form.role.toLowerCase(), // important pentru backend
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || 'Signup failed');
      }

      console.log('Success:', text);
      router.push('/dashboard/' + form.role.toLowerCase());

    } catch (err: any) {
      setError(err.message);
      console.error('Signup error:', err);
    }
  };

  return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Create Your Account</h1>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
              <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
            </div>
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
            <select name="role" value={form.role} required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500">
              <option value="" disabled>Choose your role</option>
              <option value="user">User</option>
              <option value="mentor">Mentor</option>
              <option value="manager">Manager</option>
            </select>

            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition">Sign Up</button>
          </form>

          <div className="my-6 text-center text-sm text-gray-500">or sign up with</div>

          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
              <FaFacebookF className="text-blue-600" /> Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <a href="/login" className="text-purple-600 hover:underline">Login</a>
          </p>
        </div>
      </main>
  );
}
