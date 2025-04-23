'use client';

import { useEffect, useState } from 'react';
import { FaClipboardList, FaCalendarAlt, FaEnvelope, FaComments, FaSearch, FaUserFriends } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const messages = [
  "Keep smiling 😊",
  "Be happy and confident!",
  "You’ve got this! 💪",
  "Every step counts 🚀",
  "Stay curious and motivated!"
];

export default function UserDashboard() {
  const [quote, setQuote] = useState('');
  const [profileData, setProfileData] = useState({
    fullName: '',
    occupation: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });
  const router = useRouter();

  // Încarcă citatul aleator
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setQuote(messages[randomIndex]);
  }, []);

  // Încarcă datele de profil din localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('profileData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setProfileData(parsedData);
      }
    } catch (error) {
      console.error('Error loading profile data from localStorage:', error);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">NextStep</h2>
        <nav className="space-y-3">
          <div
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer"
            onClick={() => router.push('/profile-user')}
          >
            <span className="text-lg">👤</span>
            <span className="font-medium">Profile</span>
          </div>
          <div
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer"
            onClick={() => router.push('/cvTools')}
          >
            <span className="text-lg">📄</span>
            <span className="font-medium">CV Tools</span>
          </div>
          <div
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer"
            onClick={() => router.push('/interview-sim')}
          >
            <span className="text-lg">📄</span>
            <span className="font-medium">Interview Sim</span>
          </div>
          <div
  className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer"
  onClick={() => router.push('/mentors')}
>
  <FaUserFriends /> Mentors
</div>
          <div
  className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer"
  onClick={() => router.push('/calendar')}
>
  <FaCalendarAlt /> Calendar
</div>
          <a href="#jobs" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
            <FaEnvelope /> Job Alerts
          </a>
          <div
  className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer"
  onClick={() => router.push('/personality-test')}
>
<FaClipboardList/>Personality Test
</div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h1>
        <p className="text-lg text-purple-600 mb-6">{quote}</p>

        {/* Profile section */}
        <section id="profile" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile</h2>
          {profileData.fullName ? (
            <div className="text-gray-600 space-y-2">
              <p><strong>Name:</strong> {profileData.fullName}</p>
              <p><strong>Occupation:</strong> {profileData.occupation || 'Not specified'}</p>
              <p><strong>Age:</strong> {profileData.age || 'Not specified'}</p>
              <p><strong>Email:</strong> {profileData.email || 'Not specified'}</p>
              <p><strong>Phone:</strong> {profileData.phone || 'Not specified'}</p>
              <p><strong>Address:</strong> {profileData.address || 'Not specified'}</p>
              <p><strong>About:</strong> {profileData.description || 'Not specified'}</p>
            </div>
          ) : (
            <p className="text-gray-600">
              Complete your profile to see your details here.{' '}
              <span
                className="text-purple-600 hover:underline cursor-pointer"
                onClick={() => router.push('/profile-user')}
              >
                Go to Profile
              </span>
            </p>
          )}
        </section>

        {/* Placeholder sections */}
        <section id="ai-search" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ask Career AI</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Ask something..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </section>

        <button
          onClick={() => router.push('/signUp')}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          ⬅ Back
        </button>
      </main>
    </div>
  );
}