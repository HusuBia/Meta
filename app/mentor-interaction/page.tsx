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

interface ScheduledMeeting {
  mentorEmail: string;
  date: string;
  time: string;
  user: string;
}

interface Review {
  mentorEmail: string;
  rating: number;
  review: string;
  user: string;
}

export default function MentorInteraction() {
  const router = useRouter();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [meetingData, setMeetingData] = useState({ date: '', time: '' });
  const [reviewData, setReviewData] = useState({ rating: 0, review: '' });

  // Încarcă mentorul selectat din localStorage
  useEffect(() => {
    try {
      const savedSelectedMentor = localStorage.getItem('selectedMentor');
      if (savedSelectedMentor) {
        setSelectedMentor(JSON.parse(savedSelectedMentor));
      } else {
        // Dacă nu există mentor selectat, redirecționează înapoi la lista de mentori
        router.push('/mentors');
      }
    } catch (error) {
      console.error('Error loading selected mentor:', error);
      router.push('/mentors');
    }
  }, [router]);

  // Gestionarea schimbărilor pentru programare
  const handleMeetingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeetingData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Gestionarea schimbărilor pentru recenzie
  const handleReviewInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Programează o discuție
  const scheduleMeeting = () => {
    if (!meetingData.date || !meetingData.time) {
      alert('Please fill in both date and time.');
      return;
    }

    if (!selectedMentor) {
      alert('No mentor selected.');
      return;
    }

    try {
      const userEmail = localStorage.getItem('userEmail') || 'user@example.com'; // Placeholder pentru email-ul utilizatorului
      const newMeeting: ScheduledMeeting = {
        mentorEmail: selectedMentor.email,
        date: meetingData.date,
        time: meetingData.time,
        user: userEmail,
      };

      const savedMeetings = localStorage.getItem('scheduledMeetings');
      let meetings = savedMeetings ? JSON.parse(savedMeetings) : [];
      meetings = [...meetings, newMeeting];
      localStorage.setItem('scheduledMeetings', JSON.stringify(meetings));

      alert('Meeting scheduled successfully!');
      setMeetingData({ date: '', time: '' }); // Resetează formularul
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('Failed to schedule meeting. Please try again.');
    }
  };

  // Trimite o recenzie
  const submitReview = () => {
    if (!reviewData.rating || !reviewData.review) {
      alert('Please provide both a rating and a review.');
      return;
    }

    if (!selectedMentor) {
      alert('No mentor selected.');
      return;
    }

    try {
      const userEmail = localStorage.getItem('userEmail') || 'user@example.com'; // Placeholder pentru email-ul utilizatorului
      const newReview: Review = {
        mentorEmail: selectedMentor.email,
        rating: parseInt(reviewData.rating.toString()),
        review: reviewData.review,
        user: userEmail,
      };

      const savedReviews = localStorage.getItem('mentorReviews');
      let reviews = savedReviews ? JSON.parse(savedReviews) : [];
      reviews = [...reviews, newReview];
      localStorage.setItem('mentorReviews', JSON.stringify(reviews));

      alert('Review submitted successfully!');
      setReviewData({ rating: 0, review: '' }); // Resetează formularul
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  // Redirecționează înapoi la lista de mentori
  const goBack = () => {
    router.push('/mentors');
  };

  if (!selectedMentor) {
    return null; // Așteaptă redirecționarea dacă mentorul nu este încărcat
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">
          Interact with {selectedMentor.name}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Schedule a meeting or leave a review for your mentor.
        </p>

        {/* Secțiunea pentru programare */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Schedule a Meeting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={meetingData.date}
                onChange={handleMeetingInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                value={meetingData.time}
                onChange={handleMeetingInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={scheduleMeeting}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
              >
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Secțiunea pentru recenzie */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Leave a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating (1-5)
              </label>
              <select
                name="rating"
                id="rating"
                value={reviewData.rating}
                onChange={handleReviewInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="0">Select a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                Review
              </label>
              <textarea
                name="review"
                id="review"
                value={reviewData.review}
                onChange={handleReviewInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Share your experience with this mentor..."
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={submitReview}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md"
              >
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-start">
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