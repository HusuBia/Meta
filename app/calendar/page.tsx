'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Event {
  date: string;
  title: string;
  description: string;
}

export default function Calendar() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({ date: '', title: '', description: '' });

  // Încarcă evenimentele din localStorage
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('calendarEvents');
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
    }
  }, []);

  // Gestionarea schimbărilor în formular
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  // Adaugă un nou eveniment
  const addEvent = () => {
    if (!newEvent.date || !newEvent.title) {
      alert('Please fill in the date and title.');
      return;
    }

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setNewEvent({ date: '', title: '', description: '' }); // Resetează formularul
  };

  // Redirecționează înapoi la dashboard
  const goBack = () => {
    router.push('/dashboard/user');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">Your Calendar</h1>
        <p className="text-center text-gray-600 mb-8">
          Add and manage your events and appointments.
        </p>

        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Add New Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Interview at Company X"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={newEvent.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Details about the event..."
              />
            </div>

            <div className="flex justify-between gap-4">
              <Button
                onClick={goBack}
                className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-md"
              >
                ⬅ Back
              </Button>
              <Button
                onClick={addEvent}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
              >
                Add Event
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de evenimente */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Your Events</CardTitle>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <ul className="space-y-4">
                {events.map((event, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-lg">
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Title:</strong> {event.title}</p>
                    <p><strong>Description:</strong> {event.description || 'No description'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No events yet. Add an event above!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}