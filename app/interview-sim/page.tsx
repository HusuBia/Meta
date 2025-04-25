'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function InterviewSimulation() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [totalQuestions] = useState(10);
  const [timer, setTimer] = useState(120);
  const [feedback, setFeedback] = useState('');
  const [jobTitle] = useState('Software Engineer');
  const [interviewCompleted, setInterviewCompleted] = useState(false);

  // pornire interviu la incarcarea paginii
  useEffect(() => {
    const startInterview = async () => {
      try {
        const res = await fetch('http://localhost:8080/interview/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobTitle })
        });

        if (!res.ok) {
          throw new Error('Failed to start interview');
        }

        const data = await res.json();
        console.log('Start Interview Response:', JSON.stringify(data, null, 2)); // log pt verificare raspuns
        setSessionId(data.id);
        setCurrentQuestion(data.firstQuestion);
      } catch (error) {
        console.error('Error starting interview:', error);
      }
    };

    startInterview();
  }, [jobTitle]);

  // timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // trimitem raspuns
  const submitAnswer = async () => {
    if (!sessionId) return;

    try {
      const res = await fetch('http://localhost:8080/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userMessage: userAnswer
        })
      });

      if (!res.ok) {
        throw new Error('Failed to get next question');
      }

      const data = await res.json();
      console.log('Chat Response:', JSON.stringify(data, null, 2)); // log pt verificare raspuns de la chat

      const feedbackText = data.feedback || 'No feedback available';
      const nextQuestion = data.aiReply
        ? data.aiReply.split('2.')[1]?.split('3.')[0]?.trim() || 'Next question not found.'
        : 'Next question not found.';

        //reset timer pt fiecare intrebare
      setFeedback(feedbackText);
      setCurrentQuestion(nextQuestion);
      setUserAnswer('');
      setQuestionCount((prev) => prev + 1);
      setTimer(120);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

    // verificam daca s a atins limita de 10 intrebari
    useEffect(() => {
      if (questionCount > totalQuestions) {
        setInterviewCompleted(true);
        finishSimulation(); // terminam interviul dupa cele 10 intrebari
      }
    }, [questionCount]);
  

  const finishSimulation = () => {
    alert('Interview simulation completed! Redirecting to dashboard...');
    router.push('/dashboard/user');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">AI Interview Simulation</h1>
        <p className="text-center text-gray-600 mb-8">
          Practice your interview skills with our AI-powered simulation. Answer questions and receive instant feedback.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-700">
                  Question {questionCount} of {totalQuestions}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-right text-sm text-gray-600">
                  Time remaining: <span className="font-bold text-purple-600">{timer}s</span>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <p className="text-lg font-medium text-gray-800">{currentQuestion}</p>
                </div>

                <div>
                  <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer
                  </label>
                  <textarea
                    id="answer"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                    placeholder="Type your answer here..."
                  />
                </div>

                {feedback && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700">
                      <strong>Feedback:</strong> {feedback}
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    onClick={submitAnswer}
                    className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
                    disabled={!userAnswer}
                  >
                    Submit Answer
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={finishSimulation}
                className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md"
              >
                Finish Simulation
              </Button>
            </div>
          </div>

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
