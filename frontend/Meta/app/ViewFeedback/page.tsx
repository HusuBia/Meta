'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, User } from 'lucide-react';

const feedbackList = [
  {
    id: 1,
    user: "Alex Ionescu",
    rating: 5,
    comment: "Great mentor, super helpful and friendly!",
    tag: "Mentorship",
  },
  {
    id: 2,
    user: "Maria Enache",
    rating: 4,
    comment: "The platform is intuitive and easy to use.",
    tag: "Platform",
  },
  {
    id: 3,
    user: "Dan Popa",
    rating: 3,
    comment: "Some features could be improved, but overall good experience.",
    tag: "UX",
  },
  {
    id: 4,
    user: "Ioana Radu",
    rating: 5,
    comment: "I loved the personalized career plan!",
    tag: "AI Assistant",
  },
  {
    id: 5,
    user: "Andrei Călin",
    rating: 4,
    comment: "Mentor gave me great advice for my CV and interviews.",
    tag: "Mentorship",
  },
  {
    id: 6,
    user: "Bianca Neagu",
    rating: 2,
    comment: "The app crashed once during a session, please fix that.",
    tag: "Technical",
  },
  {
    id: 7,
    user: "Roxana Toma",
    rating: 5,
    comment: "Super useful resources and career roadmap!",
    tag: "Career",
  },
  {
    id: 8,
    user: "Vlad Petrescu",
    rating: 4,
    comment: "Quick response from support, appreciated it!",
    tag: "Support",
  },
  {
    id: 9,
    user: "Sorina Pavel",
    rating: 5,
    comment: "The AI interview simulation was surprisingly realistic.",
    tag: "AI Tools",
  },
  {
    id: 10,
    user: "Mihai Dobre",
    rating: 3,
    comment: "Nice platform, but would love more design mentors.",
    tag: "Suggestions",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">User Feedback</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackList.map((feedback) => (
          <Card key={feedback.id} className="bg-white rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center gap-2 text-purple-700">
                <User className="w-5 h-5" />
                <h2 className="text-lg font-semibold">{feedback.user}</h2>
              </div>
              <p className="text-gray-700">{feedback.comment}</p>
              <div className="flex items-center gap-1">
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="inline-block text-sm text-purple-700 bg-purple-100 rounded-full px-3 py-1 mt-2">
                {feedback.tag}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={() => window.history.back()}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          ⬅ Back to Dashboard
        </Button>
      </div>
    </main>
  );
}
