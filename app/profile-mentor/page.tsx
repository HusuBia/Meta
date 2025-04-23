'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Mentor {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  phone: string;
  occupation: string;
  description: string;
  name: string; // firstName + lastName, pentru compatibilitate cu lista de mentori
  expertise: string; // occupation, pentru compatibilitate
}

export default function MentorProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState<Mentor>({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    occupation: '',
    description: '',
    name: '',
    expertise: '',
  });

  // Încarcă datele salvate din localStorage (dacă există)
  useEffect(() => {
    const savedMentors = localStorage.getItem('mentors');
    if (savedMentors) {
      const mentors = JSON.parse(savedMentors);
      const currentMentor = mentors[mentors.length - 1]; // Presupunem ultimul mentor adăugat
      if (currentMentor) {
        setFormData(currentMentor);
      }
    }
  }, []);

  // Gestionarea schimbărilor în formular
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Salvează datele și redirecționează
  const saveProfile = () => {
    const updatedMentor = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`, // Combină firstName și lastName
      expertise: formData.occupation, // Folosește occupation ca expertise
    };

    try {
      const savedMentors = localStorage.getItem('mentors');
      let mentors = savedMentors ? JSON.parse(savedMentors) : [];
      mentors = [...mentors, updatedMentor]; // Adaugă noul mentor la listă
      // Salvează mentorul curent (simulează autentificare)
      localStorage.setItem('currentMentor', JSON.stringify(updatedMentor));
      alert('Profile saved successfully!');
      router.push('/dashboard/mentor');
    } catch (error) {
      console.error('Error saving mentor profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  // Redirecționează înapoi la dashboard-ul mentorilor
  const goBack = () => {
    router.push('/dashboard/mentor');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">Mentor Profile</h1>
        <p className="text-center text-gray-600 mb-8">
          Fill in your details to register as a mentor.
        </p>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Mentor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Ionel"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Sava"
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
                placeholder="29"
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
                placeholder="ionel.sava@example.com"
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
                placeholder="+1234567890"
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                What Users Will Learn
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="I will teach you coding best practices and career advice..."
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