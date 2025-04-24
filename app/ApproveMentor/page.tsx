'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, User } from "lucide-react";

type MentorRequest = {
  id: number;
  name: string;
  email: string;
  specialization: string;
};

const pendingMentors: MentorRequest[] = [
  { id: 101, name: "Elena Marinescu", email: "elena@example.com", specialization: "Data Science" },
  { id: 102, name: "George Andrei", email: "george@example.com", specialization: "DevOps" },
  { id: 103, name: "Cristina Stoica", email: "cristina@example.com", specialization: "UI/UX Design" },
];

export default function Page() {
  const [requests, setRequests] = useState<MentorRequest[]>(pendingMentors);

  const handleApprove = (id: number) => {
    alert("Mentor approved!");
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  const handleReject = (id: number) => {
    const confirmReject = confirm("Are you sure you want to reject this request?");
    if (confirmReject) {
      setRequests(prev => prev.filter(req => req.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Approve New Mentor Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-600 text-center">No pending mentor requests at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((mentor) => (
            <Card key={mentor.id} className="rounded-2xl shadow-md bg-white">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-2 text-purple-700">
                  <User className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">{mentor.name}</h2>
                </div>
                <p className="text-gray-600 font-medium">{mentor.specialization}</p>
                <p className="text-sm text-gray-500">{mentor.email}</p>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                    onClick={() => handleApprove(mentor.id)}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={() => handleReject(mentor.id)}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
