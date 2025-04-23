'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Mentor {
  name: string;
  expertise: string;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  phone: string;
  description: string;
}

interface ScheduledMeeting {
  mentorEmail: string;
  date: string;
  time: string;
  user: string;
  status?: string; // 'pending' sau 'confirmed'
}

export default function MentorMeetings() {
  const router = useRouter();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [meetings, setMeetings] = useState<ScheduledMeeting[]>([]);
  const [editMeeting, setEditMeeting] = useState<ScheduledMeeting | null>(null);
  const [editData, setEditData] = useState({ date: '', time: '' });

  // Încarcă mentorul și întâlnirile
  useEffect(() => {
    try {
      const savedMentor = localStorage.getItem('selectedMentor');
      if (savedMentor) {
        setMentor(JSON.parse(savedMentor));
      } else {
        router.push('/mentor-dashboard');
        return;
      }

      const savedMeetings = localStorage.getItem('scheduledMeetings');
      if (savedMeetings) {
        const allMeetings = JSON.parse(savedMeetings);
        // Filtrează întâlnirile pentru mentorul curent
        const mentorMeetings = allMeetings.filter(
          (meeting: ScheduledMeeting) => meeting.mentorEmail === JSON.parse(savedMentor).email
        );
        setMeetings(mentorMeetings);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      router.push('/mentor-dashboard');
    }
  }, [router]);

  // Confirmă o întâlnire
  const confirmMeeting = (meeting: ScheduledMeeting) => {
    try {
      const updatedMeeting = { ...meeting, status: 'confirmed' };
      const savedMeetings = localStorage.getItem('scheduledMeetings');
      if (savedMeetings) {
        const allMeetings = JSON.parse(savedMeetings);
        const updatedMeetings = allMeetings.map((m: ScheduledMeeting) =>
          m.mentorEmail === meeting.mentorEmail && m.date === meeting.date && m.time === meeting.time && m.user === meeting.user
            ? updatedMeeting
            : m
        );
        localStorage.setItem('scheduledMeetings', JSON.stringify(updatedMeetings));
        setMeetings(meetings.map((m) =>
          m.mentorEmail === meeting.mentorEmail && m.date === meeting.date && m.time === meeting.time && m.user === meeting.user
            ? updatedMeeting
            : m
        ));
        alert('Meeting confirmed successfully!');
      }
    } catch (error) {
      console.error('Error confirming meeting:', error);
      alert('Failed to confirm meeting. Please try again.');
    }
  };

  // Deschide formularul de reprogramare
  const startReschedule = (meeting: ScheduledMeeting) => {
    setEditMeeting(meeting);
    setEditData({ date: meeting.date, time: meeting.time });
  };

  // Gestionează schimbările în formularul de reprogramare
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Salvează reprogramarea
  const saveReschedule = (meeting: ScheduledMeeting) => {
    if (!editData.date || !editData.time) {
      alert('Please fill in both date and time.');
      return;
    }

    try {
      const updatedMeeting = { ...meeting, date: editData.date, time: editData.time, status: 'pending' };
      const savedMeetings = localStorage.getItem('scheduledMeetings');
      if (savedMeetings) {
        const allMeetings = JSON.parse(savedMeetings);
        const updatedMeetings = allMeetings.map((m: ScheduledMeeting) =>
          m.mentorEmail === meeting.mentorEmail && m.date === meeting.date && m.time === meeting.time && m.user === meeting.user
            ? updatedMeeting
            : m
        );
        localStorage.setItem('scheduledMeetings', JSON.stringify(updatedMeetings));
        setMeetings(meetings.map((m) =>
          m.mentorEmail === meeting.mentorEmail && m.date === meeting.date && m.time === meeting.time && m.user === meeting.user
            ? updatedMeeting
            : m
        ));
        setEditMeeting(null);
        alert('Meeting rescheduled successfully!');
      }
    } catch (error) {
      console.error('Error rescheduling meeting:', error);
      alert('Failed to reschedule meeting. Please try again.');
    }
  };

  // Anulează reprogramarea
  const cancelReschedule = () => {
    setEditMeeting(null);
    setEditData({ date: '', time: '' });
  };

  // Redirecționează înapoi la dashboard-ul mentorilor
  const goBack = () => {
    router.push('/dashboard/mentor');
  };

  if (!mentor) {
    return null; // Așteaptă redirecționarea dacă mentorul nu este încărcat
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">Your Scheduled Meetings</h1>
        <p className="text-center text-gray-600 mb-8">
          View and manage meetings scheduled with you.
        </p>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Meetings List</CardTitle>
          </CardHeader>
          <CardContent>
            {meetings.length > 0 ? (
              <ul className="space-y-4">
                {meetings.map((meeting, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-lg">
                    {editMeeting?.mentorEmail === meeting.mentorEmail &&
                    editMeeting?.date === meeting.date &&
                    editMeeting?.time === meeting.time &&
                    editMeeting?.user === meeting.user ? (
                      // Formular de reprogramare
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700 mb-1">
                            New Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="edit-date"
                            value={editData.date}
                            onChange={handleEditInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-time" className="block text-sm font-medium text-gray-700 mb-1">
                            New Time
                          </label>
                          <input
                            type="time"
                            name="time"
                            id="edit-time"
                            value={editData.time}
                            onChange={handleEditInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => saveReschedule(meeting)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={cancelReschedule}
                            className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-md"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Afișare întâlnire
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p><strong>User:</strong> {meeting.user}</p>
                          <p><strong>Date:</strong> {meeting.date}</p>
                          <p><strong>Time:</strong> {meeting.time}</p>
                          <p><strong>Status:</strong> {meeting.status || 'pending'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => confirmMeeting(meeting)}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md"
                            disabled={meeting.status === 'confirmed'}
                          >
                            Confirm
                          </Button>
                          <Button
                            onClick={() => startReschedule(meeting)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
                          >
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No meetings scheduled yet.</p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-start mt-6">
          <Button
            onClick={goBack}
            className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-md"
          >
            ⬅ Back
          </Button>
        </div>
      </div>
    </main>
  );
}