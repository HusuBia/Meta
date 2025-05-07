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

export default function Mentors() {
  const router = useRouter();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const savedMentors = localStorage.getItem('mentors');
      if (savedMentors) {
        const mentorsData = JSON.parse(savedMentors);
        setMentors(mentorsData);
      }

      const savedSelectedMentor = localStorage.getItem('selectedMentor');
      if (savedSelectedMentor) {
        setSelectedMentor(JSON.parse(savedSelectedMentor));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, [router]);

  const selectMentor = (mentor: Mentor) => {
    try {
      localStorage.setItem('selectedMentor', JSON.stringify(mentor));
      setSelectedMentor(mentor);
      router.push('/mentor-interaction');
    } catch (error) {
      console.error('Error saving selected mentor:', error);
      alert('Failed to select mentor. Please try again.');
    }
  };

  const unselectMentor = () => {
    try {
      localStorage.removeItem('selectedMentor');
      setSelectedMentor(null);
      alert('Mentor unselected successfully!');
    } catch (error) {
      console.error('Error unselecting mentor:', error);
      alert('Failed to unselect mentor. Please try again.');
    }
  };

  const goBack = () => {
    router.push('/dashboard/user');
  };

  return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">Available Mentors</h1>
          <p className="text-center text-gray-600 mb-8">
            Connect with experienced mentors to guide your career journey.
          </p>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-700">Mentors List</CardTitle>
            </CardHeader>
            <CardContent>
              {mentors.length > 0 ? (
                  <ul className="space-y-4">
                    {mentors.map((mentor, index) => (
                        <li key={index} className="p-4 bg-gray-100 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p><strong>Name:</strong> {mentor.name}</p>
                              <p><strong>Expertise:</strong> {mentor.expertise}</p>
                              <p><strong>Email:</strong> {mentor.email}</p>
                              <p><strong>Phone:</strong> {mentor.phone || 'Not provided'}</p>
                              <p><strong>What You’ll Learn:</strong> {mentor.description || 'Not provided'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                  onClick={() => selectMentor(mentor)}
                                  className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
                                  disabled={selectedMentor?.email === mentor.email}
                              >
                                Select
                              </Button>
                              {selectedMentor?.email === mentor.email && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-green-600 font-medium">Selected</span>
                                    <Button
                                        onClick={unselectMentor}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
                                    >
                                      Unselect
                                    </Button>
                                  </div>
                              )}
                            </div>
                          </div>
                        </li>
                    ))}
                  </ul>
              ) : (
                  <p className="text-gray-600">No mentors available yet. Check back later!</p>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-start mt-6">
            <Button
                onClick={goBack}
                className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition"
            >
              ⬅ Back
            </Button>
          </div>
        </div>
      </main>
  );
}
