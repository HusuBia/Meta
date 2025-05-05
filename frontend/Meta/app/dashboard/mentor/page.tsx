'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, ClipboardX, MessageSquare, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MentorDashboard() {
  const router = useRouter();
  const [userStats, setUserStats] = useState({
    scheduledSessions: 5,
    pastSessions: 10,
    feedbacksReceived: 25,
    assignedUsers: 8,
  });

  // pentru a obtine statistici din backend
  useEffect(() => {
    // preluare statistici din backend
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Mentor Dashboard</h1>

      {/* sectiune profil*/}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Profile</h2>
            <Button variant="outline" onClick={() => router.push('/profile-mentor')}>Edit Profile</Button>
          </CardContent>
        </Card>

        {/* sectiune calendar */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Set Availability</h2>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Set Calendar
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* program sesiuni */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Scheduled Sessions</h2>
          < p className="text-lg"> You have {userStats.scheduledSessions} upcoming sessions.</p>
            <Button variant="outline" onClick={() => router.push('/scheduled-sessions')}>Confirm Sessions</Button>
          </CardContent>
        </Card>

        {/* sesiuni trecute */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Past Sessions</h2>
            <p className="text-lg">You have completed {userStats.pastSessions} sessions.</p>
            <Button variant="outline" onClick={() => router.push('/viewPastSessions')}>View Sessions</Button>
          </CardContent>
        </Card>
      </section>

      {/* sectiue pt feedback */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Provide Feedback</h2>
            <Button variant="outline" onClick={() => router.push('/giveFeedback')}>Give Feedback</Button>
          </CardContent>
        </Card>

        {/* review primit  */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Received Reviews</h2>
            <p className="text-lg">You have {userStats.feedbacksReceived} reviews.</p>
            <Button variant="outline" onClick={() => router.push('/mentor-review')}>View Reviews</Button>
          </CardContent>
        </Card>
      </section>

      {/* note oferite utilizatorilor */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Notes for Users</h2>
            <Button variant="outline" onClick={() => router.push('/viewUserNotes')}>View Notes</Button>
          </CardContent>
        </Card>

        {/* utilizatori inscrisi */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-purple-700">Assigned Users</h2>
            <p className="text-lg">You are assigned to {userStats.assignedUsers} users.</p>
            <Button variant="outline" onClick={() => router.push('/assignedUsers')}>View Assigned Users</Button>
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
