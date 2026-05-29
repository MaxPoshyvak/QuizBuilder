'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Quiz } from '@/types';
import QuizzzeCard from '@/components/shared/QuizzzeCard/QuizzzeCard';

export default function QuizzesListPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`);
                if (!res.ok) throw new Error('Failed to fetch quizzes');

                const data = await res.json();
                setQuizzes(data.quizzes);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();

        const previousQuizzes = [...quizzes];
        setQuizzes(quizzes.filter((q) => q.id !== id));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete quiz');
        } catch (error) {
            console.error('Error deleting quiz:', error);
            setQuizzes(previousQuizzes);
            alert('Помилка при видаленні вікторини');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">All Quizzes</h1>
                        <p className="text-zinc-400 mt-2">Manage and view your created quizzes.</p>
                    </div>
                    <Link href="/create">
                        <Button variant="primary">+ Create Quiz</Button>
                    </Link>
                </div>
                {isLoading ? (
                    <div className="flex justify-center py-20 text-zinc-500">Loading quizzes...</div>
                ) : quizzes.length === 0 ? (
                    <div className="bg-white/2 border border-white/10 rounded-2xl p-12 text-center backdrop-blur-xl">
                        <p className="text-zinc-400 mb-4">You haven&apos;t created any quizzes yet.</p>
                        <Link href="/create">
                            <Button variant="secondary" className="mx-auto">
                                Create your first quiz
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <QuizzzeCard key={quiz.id} quiz={quiz} handleDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
