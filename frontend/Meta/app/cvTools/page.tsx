'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface JwtPayload {
  exp: number;
  sub: string;
  role?: string;
}

// definire tipuri formData
interface Education { institution: string; degree: string; startDate: string; endDate: string; description: string; }
interface Experience { jobTitle: string; employer: string; startDate: string; endDate: string; description: string; }
interface Project { projectTitle: string; description: string; startDate: string; endDate: string; technologies: string; link: string; }
interface DigitalSkills { Java: number; SpringBoot: number; SQL: number; Git: number; HTML: number; CSS: number; }

interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  projectTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  technologies: string;
  link: string;
}

interface DigitalSkills {
  Java: number;
  SpringBoot: number;
  SQL: number;
  Git: number;
  HTML: number;
  CSS: number;
}

interface FormData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  nationality: string;
  aboutMe: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  languages: string[];
  digitalSkills: DigitalSkills;
  softSkills: string[];
}

export default function CVTools() {
  const router = useRouter();


  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    nationality: '',
    aboutMe: '',
    education: [{ institution: '', degree: '', startDate: '', endDate: '', description: '' }],
    experience: [{ jobTitle: '', employer: '', startDate: '', endDate: '', description: '' }],
    projects: [{ projectTitle: '', description: '', startDate: '', endDate: '', technologies: '', link: '' }],
    languages: [''],
    digitalSkills: { Java: 0, SpringBoot: 0, SQL: 0, Git: 0, HTML: 0, CSS: 0 },
    softSkills: [''],
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }
    } catch (err) {
      console.error('Token invalid:', err);
      router.push('/login');
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
      }));
    }
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // incarcare foto
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleArrayInputChange = (
      index: number,
      field: keyof Pick<FormData, 'education' | 'experience' | 'projects' | 'languages' | 'softSkills'>,
      key: string,
      value: string
  ) => {
    setFormData((prevData) => {
      if (field === 'languages') {
        const updatedArray = [...prevData.languages];
        updatedArray[index] = value;
        return { ...prevData, languages: updatedArray };
      }
      if (field === 'softSkills') {
        const updatedArray = [...prevData.softSkills];
        updatedArray[index] = value;
        return { ...prevData, softSkills: updatedArray };
      }
      if (field === 'education') {
        const updatedArray = [...prevData.education];
        updatedArray[index] = { ...updatedArray[index], [key]: value };
        return { ...prevData, education: updatedArray };
      }
      if (field === 'experience') {
        const updatedArray = [...prevData.experience];
        updatedArray[index] = { ...updatedArray[index], [key]: value };
        return { ...prevData, experience: updatedArray };
      }
      if (field === 'projects') {
        const updatedArray = [...prevData.projects];
        updatedArray[index] = { ...updatedArray[index], [key]: value };
        return { ...prevData, projects: updatedArray };
      }
      return prevData;
    });
  };

  const handleDigitalSkillChange = (skill: keyof DigitalSkills, value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      digitalSkills: { ...prevData.digitalSkills, [skill]: value },
    }));
  };

  // adaugare intro nou
  const addArrayEntry = (field: keyof Pick<FormData, 'education' | 'experience' | 'projects' | 'languages' | 'softSkills'>) => {
    setFormData((prevData) => {
      if (field === 'languages' || field === 'softSkills') {
        return { ...prevData, [field]: [...prevData[field], ''] };
      }
      const newEntry =
          field === 'education'
              ? { institution: '', degree: '', startDate: '', endDate: '', description: '' }
              : field === 'experience'
                  ? { jobTitle: '', employer: '', startDate: '', endDate: '', description: '' }
                  : { projectTitle: '', description: '', startDate: '', endDate: '', technologies: '', link: '' };
      return { ...prevData, [field]: [...prevData[field], newEntry] };
    });
  };

  // generare cv + trimitere spre backend
  // creare formData
  const formDataToSend = new FormData();
  const generateCV = async () => {
    try {
      const formDataToSend = new FormData();

      const cvData = {
        fullName: formData.fullName || '',
        title: formData.title || '',
        email: formData.email || '',
        phone: formData.phone || '',
        address: formData.address || '',
        dateOfBirth: formData.dateOfBirth || '',
        nationality: formData.nationality || '',
        aboutMe: formData.aboutMe || '',
        education: formData.education.length > 0
            ? formData.education
            : [{ institution: '', degree: '', startDate: '', endDate: '', description: '' }],
        experience: formData.experience.length > 0
            ? formData.experience.map((exp) => ({
              jobTitle: exp.jobTitle || '',
              employer: exp.employer || '',
              startDate: exp.startDate || '',
              endDate: exp.endDate || '',
              description: exp.description || '',
            }))
            : [{ jobTitle: '', employer: '', startDate: '', endDate: '', description: '' }],
        projects: formData.projects.length > 0
            ? formData.projects.map((project) => ({
              projectTitle: project.projectTitle || '',
              description: project.description || '',
              startDate: project.startDate || '',
              endDate: project.endDate || '',
              technologies: project.technologies.split(',').map(t => t.trim()), // Trim și split
            }))
            : [{ projectTitle: '', description: '', startDate: '', endDate: '', technologies: [] }],
        languages: formData.languages.filter((lang) => lang.trim() !== '') || [''],
        digitalSkills:
            formData.digitalSkills || { Java: 0, SpringBoot: 0, SQL: 0, Git: 0, HTML: 0, CSS: 0 },
        softSkills: formData.softSkills.filter((skill) => skill.trim() !== '') || [''],
      };

      formDataToSend.append('cv', JSON.stringify(cvData));

      if (photo) {
        formDataToSend.append('image', photo);
      } else {
        throw new Error('Imaginea este obligatorie. Te rugăm să încarci o imagine.');
      }

      const response = await axios.post('http://localhost:8080/api/cv/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      });

      // verificare rasouns corect
      console.log('Răspuns complet:', response);

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setError(null);

      // declanseaza descarcarea automata
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'CV.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('PDF generat și descărcat. Dimensiune:', response.data.byteLength);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // verific daca este vreun raspuns din partea serverului
        if (err.response) {
          console.error('Status HTTP:', err.response.status);
          console.error('Mesaj de eroare de la server:', err.response.data);  // Detalii de la server
          setError(`Eroare la server: ${err.response.status} - ${err.response.data}`);
        } else {
          console.error('Eroare necunoscută la cererea Axios:', err.message);
          setError('Eroare necunoscută la cererea Axios');
        }
      } else if (err instanceof Error) {
        setError(err.message || 'Eroare la generarea CV-ului. Te rugăm să încerci din nou.');
        console.error('Eroare detaliată:', err);
      } else {
        setError('Eroare necunoscută');
        console.error('Eroare necunoscută:', err);
      }
    }
  };





  return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10">Create Your Professional CV</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CV Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
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
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <input
                        type="text"
                        name="nationality"
                        id="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Photo
                    </label>
                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* About Me */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-700">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                <textarea
                    name="aboutMe"
                    id="aboutMe"
                    value={formData.aboutMe}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe yourself and your aspirations..."
                />
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-700">Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.education.map((edu, index) => (
                      <div key={index} className="space-y-2 border-b pb-4">
                        <input
                            type="text"
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) => handleArrayInputChange(index, 'education', 'institution', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => handleArrayInputChange(index, 'education', 'degree', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Start Date (YYYY)"
                            value={edu.startDate}
                            onChange={(e) => handleArrayInputChange(index, 'education', 'startDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="End Date (YYYY)"
                            value={edu.endDate}
                            onChange={(e) => handleArrayInputChange(index, 'education', 'endDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <textarea
                            placeholder="Description"
                            value={edu.description}
                            onChange={(e) => handleArrayInputChange(index, 'education', 'description', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                  ))}
                  <Button onClick={() => addArrayEntry('education')} className="bg-purple-600 text-white">
                    Add Education
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Experience */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-700">Professional Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.experience.map((exp, index) => (
                      <div key={index} className="space-y-2 border-b pb-4">
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={exp.jobTitle}
                            onChange={(e) => handleArrayInputChange(index, 'experience', 'jobTitle', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Employer"
                            value={exp.employer}
                            onChange={(e) => handleArrayInputChange(index, 'experience', 'employer', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Start Date (YYYY-MM)"
                            value={exp.startDate}
                            onChange={(e) => handleArrayInputChange(index, 'experience', 'startDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="End Date (YYYY-MM)"
                            value={exp.endDate}
                            onChange={(e) => handleArrayInputChange(index, 'experience', 'endDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <textarea
                            placeholder="Description"
                            value={exp.description}
                            onChange={(e) => handleArrayInputChange(index, 'experience', 'description', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                  ))}
                  <Button onClick={() => addArrayEntry('experience')} className="bg-purple-600 text-white">
                    Add Experience
                  </Button>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-700">Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.projects.map((proj, index) => (
                      <div key={index} className="space-y-2 border-b pb-4">
                        <input
                            type="text"
                            placeholder="Project Title"
                            value={proj.projectTitle}
                            onChange={(e) => handleArrayInputChange(index, 'projects', 'projectTitle', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <textarea
                            placeholder="Description"
                            value={proj.description}
                            onChange={(e) => handleArrayInputChange(index, 'projects', 'description', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Technologies (comma-separated)"
                            value={proj.technologies}
                            onChange={(e) => handleArrayInputChange(index, 'projects', 'technologies', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Start Date (YYYY-MM)"
                            value={proj.startDate}
                            onChange={(e) => handleArrayInputChange(index, 'projects', 'startDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="End Date (YYYY-MM)"
                            value={proj.endDate}
                            onChange={(e) => handleArrayInputChange(index, 'projects', 'endDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="url"
                            placeholder="Project Link"
                            value={proj.link}
                            onChange={(e) => handleArrayInputChange(index, 'projects', 'link', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                  ))}
                  <Button onClick={() => addArrayEntry('projects')} className="bg-purple-600 text-white">
                    Add Project
                  </Button>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-700">Languages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.languages.map((lang, index) => (
                      <input
                          key={index}
                          type="text"
                          placeholder="Language (e.g., English - Fluent)"
                          value={lang}
                          onChange={(e) => handleArrayInputChange(index, 'languages', '', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                  ))}
                  <Button onClick={() => addArrayEntry('languages')} className="bg-purple-600 text-white">
                    Add Language
                  </Button>
                </CardContent>
              </Card>

              {/* Digital Skills */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-700">Digital Skills (1-5)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.keys(formData.digitalSkills).map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <label className="w-24 text-sm font-medium text-gray-700">{skill}</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            value={formData.digitalSkills[skill as keyof DigitalSkills]}
                            onChange={(e) => handleDigitalSkillChange(skill as keyof DigitalSkills, parseInt(e.target.value))}
                            className="w-16 p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                  ))}
                </CardContent>
              </Card>

              {/* Soft Skills */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-700">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.softSkills.map((skill, index) => (
                      <input
                          key={index}
                          type="text"
                          placeholder="Soft Skill"
                          value={skill}
                          onChange={(e) => handleArrayInputChange(index, 'softSkills', '', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                  ))}
                  <Button onClick={() => addArrayEntry('softSkills')} className="bg-purple-600 text-white">
                    Add Soft Skill
                  </Button>
                </CardContent>
              </Card>

              {/* Generate CV Button and Download Link */}
              <div className="flex justify-end space-x-4">
                <Button
                    onClick={generateCV}
                    className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
                >
                  Generate CV
                </Button>
                {pdfUrl && (
                    <a
                        href={pdfUrl}
                        download="cv.pdf"
                        className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md"
                    >
                      Download CV
                    </a>
                )}
              </div>
            </div>

            {/* CV Preview */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-purple-700">CV Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h2 className="text-lg font-bold">{formData.fullName || 'Your Name'}</h2>
                    <p className="text-sm text-gray-600">{formData.title || 'Your Title'}</p>
                    <p className="text-sm text-gray-600">{formData.email || 'Your Email'}</p>
                    <p className="text-sm text-gray-600">{formData.phone || 'Your Phone'}</p>
                    <p className="text-sm text-gray-600 mt-2">{formData.aboutMe || 'About you...'}</p>
                    <p className="text-sm text-gray-500 mt-4 italic">Generate CV to download the full version.</p>
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