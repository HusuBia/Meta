'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function InterviewSimulation() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState('Sample question: Tell me about yourself.');
  const [userAnswer, setUserAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [totalQuestions] = useState(10); // Presupunem 10 întrebări în total
  const [timer, setTimer] = useState(60); // 60 secunde per întrebare
  const [feedback, setFeedback] = useState('');

  // Gestionarea răspunsului utilizatorului
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
  };

  // Funcție pentru trimiterea răspunsului
  const submitAnswer = () => {
    alert('Answer submitted! (This would send the answer to the backend.)');
    setFeedback('Sample feedback: Good response, but consider adding more specific examples.');
    setUserAnswer('');
  };

  // Funcție pentru următoarea întrebare
  const nextQuestion = () => {
    setCurrentQuestion(`Sample question: What are your strengths? (Question ${questionCount + 1})`);
    setUserAnswer('');
    setFeedback('');
    setQuestionCount((prev) => prev + 1);
    setTimer(60); // Resetează timer-ul
    alert('Next question loaded! (This would fetch a new question from the backend.)');
  };

  // Funcție pentru finalizarea simulării
  const finishSimulation = () => {
    alert('Interview simulation completed! Redirecting to dashboard...');
    router.push('/dashboard'); // Redirecționează înapoi la dashboard
  };

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">AI Interview Simulation</h1>
        <p className="text-center text-gray-600 mb-8">
          Practice your interview skills with our AI-powered simulation. Answer questions and receive instant feedback.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panou principal cu întrebare și răspuns */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">
                  Question {questionCount} of {totalQuestions}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Timer */}
                <div className="text-right text-sm text-gray-600">
                  Time remaining: <span className="font-bold text-purple-600">{timer}s</span>
                </div>

                {/* Afișare întrebare */}
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <p className="text-lg font-medium text-gray-800">{currentQuestion}</p>
                </div>

                {/* Câmp pentru răspuns */}
                <div>
                  <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer
                  </label>
                  <textarea
                    id="answer"
                    value={userAnswer}
                    onChange={handleAnswerChange}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                    placeholder="Type your answer here..."
                  />
                </div>

                {/* Feedback (dacă există) */}
                {feedback && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700">
                      <strong>Feedback:</strong> {feedback}
                    </p>
                  </div>
                )}

                {/* Butoane acțiuni */}
                <div className="flex justify-between">
                  <Button
                    onClick={submitAnswer}
                    className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
                    disabled={!userAnswer}
                  >
                    Submit Answer
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    className="bg-gray-600 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-md"
                    disabled={questionCount >= totalQuestions}
                  >
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Buton pentru finalizare */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={finishSimulation}
                className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md"
              >
                Finish Simulation
              </Button>
            </div>
          </div>

          {/* Panou lateral cu progres */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-700">Interview Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Questions answered: <span className="font-bold">{questionCount - 1}/{totalQuestions}</span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${((questionCount - 1) / totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Session Status</p>
                  <p className="text-sm font-medium text-purple-700">
                    {questionCount <= totalQuestions ? 'In Progress' : 'Completed'}
                  </p>
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