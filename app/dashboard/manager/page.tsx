'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Users, CheckCircle, MessageSquare, BarChart2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ManagerDashboard() {
  const [userStats, setUserStats] = useState({ users: 120, mentors: 15, feedbacks: 42 });
  const router = useRouter();

  // pentru a obtine statistici din backend
  useEffect(() => {
    // preluare statistici din backend
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Manager Dashboard</h1>

      {/* sectiune statistici */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Users className="text-purple-600" />
            <div>
              <h2 className="text-lg font-semibold">Users</h2>
              <p className="text-2xl font-bold">{userStats.users}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <CheckCircle className="text-green-600" />
            <div>
              <h2 className="text-lg font-semibold">Active Mentors</h2>
              <p className="text-2xl font-bold">{userStats.mentors}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Star className="text-yellow-500" />
            <div>
              <h2 className="text-lg font-semibold">Reviews</h2>
              <p className="text-2xl font-bold">{userStats.feedbacks}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* sectiune actiuni */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* mentor management */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Mentor Management</h2>
            <Button variant="outline">Approve New Requests</Button>
            <Button variant="outline">Edit Mentor Profiles</Button>
            <Button variant="destructive">Remove Mentor</Button>
          </CardContent>
        </Card>

        {/*moderare forum/chat */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Forum & Chat Moderation</h2>
            <Button variant="outline">View Reported Messages</Button>
            <Button variant="outline">Block User</Button>
          </CardContent>
        </Card>

        {/* feedback & reviews */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Feedback & Reviews</h2>
            <Button variant="outline">View Feedback</Button>
            <Button variant="outline">Respond to Reviews</Button>
          </CardContent>
        </Card>

        {/* date exportate */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Data Export</h2>
            <Button variant="outline">
              <BarChart2 className="mr-2 h-4 w-4" />
              User Progress
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Test Results
            </Button>
          </CardContent>
        </Card>
      </section>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push('/signUp')}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          ⬅ Back
        </button>
        </div>
    </main>
  );
}
