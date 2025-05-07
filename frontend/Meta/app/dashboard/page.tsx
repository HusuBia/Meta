'use client';
import { useAuthToken } from '@/hooks/useAuthToken';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const token = useAuthToken();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
      <main className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Manager Dashboard</h1>

        <section className="space-y-6">
          <h2 className="text-xl font-bold">Manage Sections</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard/users" className="text-blue-600 hover:underline">
                Manage Users
              </Link>
            </li>
            <li>
              <Link href="/dashboard/mentors" className="text-blue-600 hover:underline">
                Manage Mentors
              </Link>
            </li>
            <li>
              <Link href="/dashboard/reviews" className="text-blue-600 hover:underline">
                Manage Reviews
              </Link>
            </li>
          </ul>
        </section>
      </main>
  );
}
