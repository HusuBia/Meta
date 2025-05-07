'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Trash2 } from "lucide-react";
import { useRouter } from 'next/navigation';

type Mentor = {
    id: number;
    name: string;
    email: string;
    specialization: string;
};

const mockMentors: Mentor[] = [
    { id: 1, name: "Ana Popescu", email: "ana@example.com", specialization: "Web Development" },
    { id: 2, name: "Ion Ionescu", email: "ion@example.com", specialization: "Machine Learning" },
    { id: 3, name: "Maria Georgescu", email: "maria@example.com", specialization: "Cybersecurity" },
];

export default function Page() {
    const [mentors, setMentors] = useState<Mentor[]>(mockMentors);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const handleRemove = (id: number) => {
        const confirmed = confirm("Are you sure you want to remove this mentor?");
        if (confirmed) {
            setMentors(prev => prev.filter(m => m.id !== id));
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-purple-700 mb-6">Remove Mentor</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                    <Card key={mentor.id} className="rounded-2xl shadow-md bg-white">
                        <CardContent className="p-6 space-y-2">
                            <h2 className="text-xl font-semibold text-purple-700">{mentor.name}</h2>
                            <p className="text-gray-600 font-medium">{mentor.specialization}</p>
                            <p className="text-sm text-gray-500">{mentor.email}</p>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={() => window.location.href = `mailto:${mentor.email}`}
                                >
                                    <Mail className="w-4 h-4" />
                                    Contact
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex items-center gap-2"
                                    onClick={() => handleRemove(mentor.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                </Button>
                            </div>
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
