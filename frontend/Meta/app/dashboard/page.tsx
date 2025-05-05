// app/dashboard/page.tsx

'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Manager Dashboard</h1>
      
      <section className="space-y-6">
        <h2 className="text-xl font-bold">Manage Sections</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard/users">
              <a className="text-blue-600 hover:underline">Manage Users</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/mentors">
              <a className="text-blue-600 hover:underline">Manage Mentors</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/reviews">
              <a className="text-blue-600 hover:underline">Manage Reviews</a>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
