'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Mentor {
  name: string;
  expertise: string;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  phone: string;
  description: string;
}

interface Review {
  mentorEmail: string;
  rating: number;
  review: string;
  user: string;
}

export default function MentorReviews() {
  const router = useRouter();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // incarca mentorul + recenziile
  useEffect(() => {
    try {
      const savedMentor = localStorage.getItem('currentMentor');
      if (savedMentor) {
        const parsedMentor = JSON.parse(savedMentor);
        setMentor(parsedMentor);

        const savedReviews = localStorage.getItem('mentorReviews');
        if (savedReviews) {
          const allReviews = JSON.parse(savedReviews);
          const mentorReviews = allReviews.filter(
            (review: Review) => review.mentorEmail === parsedMentor.email
          );
          setReviews(mentorReviews);
        }
      } else {
        router.push('/dashboard/mentor');
        return;
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      router.push('/dashboard/mentor');
    }
  }, [router]);

  const goBack = () => {
    router.push('/dashboard/mentor');
  };

  if (!mentor) {
    return null; 
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">Your Reviews</h1>
        <p className="text-center text-gray-600 mb-8">
          See what users have said about their experience with you.
        </p>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Reviews List</CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length > 0 ? (
              <ul className="space-y-4">
                {reviews.map((review, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-lg">
                    <div className="space-y-1">
                      <p><strong>User:</strong> {review.user}</p>
                      <p><strong>Rating:</strong> {review.rating}/5</p>
                      <p><strong>Review:</strong> {review.review}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-start mt-6">
          <Button
            onClick={goBack}
            className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-md"
          >
            ⬅ Back
          </Button>
        </div>
      </div>
    </main>
  );
}