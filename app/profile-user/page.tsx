'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    occupation: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  // Încarcă datele salvate din localStorage (dacă există)

  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Gestionarea schimbărilor în formular
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Salvează datele și redirecționează
  const saveProfile = () => {
    localStorage.setItem('profileData', JSON.stringify(formData));
    alert('Profile saved successfully!');
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">Edit Your Profile</h1>
        <p className="text-center text-gray-600 mb-8">
          Fill in your personal details to customize your profile.
        </p>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Marcel Popescu"
              />
            </div>

            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="30"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="marcel.popescu@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="+40 xxxxxxxxxx"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="main str, nr 66..."
              />
            </div>

            <div>

              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                About You
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex justify-between gap-4 p-4">
  <button
    onClick={() => router.push('/dashboard/user')}
    className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition flex items-center"
  >
    <span className="mr-2">⬅</span> Back
  </button>
  <Button
    onClick={saveProfile}
    className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
  >
    Save Profile
  </Button>
</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}