'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CVTools() {
  const router = useRouter();

  // State pentru a păstra valorile din formular
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    portfolio: '',
    objective: '',
    experience: '',
    education: '',
    skills: '',
    languages: '',
    certifications: '',
    hobbies: '',
    additionalInfo: '',
  });

  // Gestionarea schimbărilor în câmpurile formularului
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Funcția de generare a CV-ului
  const generateCV = () => {
    alert('CV generated! (Here we would generate a downloadable PDF or preview.)');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10">Create Your Professional CV</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formular CV */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informații Personale */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    required
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
                    required
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
                    required
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
                  />
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio/LinkedIn/GitHub
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Obiectiv Profesional */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Professional Objective</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="objective"
                  id="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your career goals and aspirations..."
                />
              </CardContent>
            </Card>

            {/* Experiență Profesională */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Professional Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="experience"
                  id="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="List your work experience (e.g., Job Title, Company, Dates, Responsibilities)..."
                />
              </CardContent>
            </Card>

            {/* Educație */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="education"
                  id="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="List your education (e.g., Degree, Institution, Dates)..."
                />
              </CardContent>
            </Card>

            {/* Abilități */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="skills"
                  id="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="List your skills (e.g., Programming, Communication, Leadership)..."
                />
              </CardContent>
            </Card>

            {/* Limbi Străine */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="languages"
                  id="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="List languages and proficiency (e.g., English - Fluent, Spanish - Intermediate)..."
                />
              </CardContent>
            </Card>

            {/* Certificări */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="certifications"
                  id="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="List certifications (e.g., AWS Certified Developer, PMP, etc.)..."
                />
              </CardContent>
            </Card>

            {/* Hobby-uri */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Hobbies</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="hobbies"
                  id="hobbies"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="List your hobbies (e.g., Photography, Hiking, Chess)..."
                />
              </CardContent>
            </Card>

            {/* Informații Suplimentare */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="additionalInfo"
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Any additional information relevant to your CV..."
                />
              </CardContent>
            </Card>

            {/* Buton Generare CV */}
            <div className="flex justify-end">
              <Button
                onClick={generateCV}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
              >
                Generate CV
              </Button>
            </div>
          </div>

          {/* Preview CV (Placeholder) */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">CV Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h2 className="text-lg font-bold">{formData.fullName || 'Your Name'}</h2>
                  <p className="text-sm text-gray-600">{formData.email || 'Your Email'}</p>
                  <p className="text-sm text-gray-600">{formData.phone || 'Your Phone'}</p>
                  <p className="text-sm text-gray-600 mt-2">{formData.objective || 'Your professional objective...'}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Experience:</strong> {formData.experience || 'Your experience...'}
                  </p>
                  {/* Adaugă mai multe secțiuni pentru preview dacă dorești */}
                  <p className="text-sm text-gray-500 mt-4 italic">This is a placeholder preview. Generate CV to see the full version.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <button
          onClick={() => router.push('/dashboard/user')}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          ⬅ Back
        </button>
      </div>
    </main>
  );
}