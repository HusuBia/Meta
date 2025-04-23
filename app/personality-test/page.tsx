'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
}

export default function PersonalityTest() {
  const router = useRouter();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Mock data pentru întrebări (fără opțiuni, răspunsurile vor fi text liber)
  const questions: Question[] = [
    {
      id: 1,
      question: 'How would you describe yourself in a few words?',
    },
    {
      id: 2,
      question: 'How do you handle stress? Describe your approach.',
    },
    {
      id: 3,
      question: 'What motivates you to work in a team or individually?',
    },
  ];

  // Gestionează schimbările în răspunsuri
  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Trimite răspunsurile (logica va fi implementată ulterior)
  const submitTest = () => {
    // Verifică dacă toate întrebările au răspunsuri
    const allAnswered = questions.every((question) => answers[question.id] && answers[question.id].trim() !== '');
    if (!allAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    // Simulează trimiterea către backend
    console.log('Submitted answers:', answers);
    alert('Personality test submitted successfully! Results will be available soon.');

    // Opțional: Salvează răspunsurile în localStorage
    localStorage.setItem('personalityTestAnswers', JSON.stringify(answers));

    // Redirecționează înapoi la dashboard
    router.push('/dashboard/user');
  };

  // Redirecționează înapoi la dashboard-ul utilizatorului
  const goBack = () => {
    router.push('/dashboard/user');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">Personality Test</h1>
        <p className="text-center text-gray-600 mb-8">
          Answer the following questions to discover more about your personality.
        </p>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="p-4 bg-gray-100 rounded-lg">
                <p className="text-lg font-medium text-gray-800 mb-2">{question.question}</p>
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Type your answer here..."
                />
              </div>
            ))}
            <div className="flex justify-between gap-4 mt-6">
              <Button
                onClick={goBack}
                className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-md"
              >
                ⬅ Back
              </Button>
              <Button
                onClick={submitTest}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
              >
                Submit Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}