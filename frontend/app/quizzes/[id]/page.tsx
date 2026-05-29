'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Quiz } from '@/types';

export default function QuizDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`);
                if (!res.ok) {
                    if (res.status === 404) throw new Error('Quiz not found');
                    throw new Error('Failed to fetch quiz details');
                }

                const data = await res.json();
                setQuiz(data.quiz);
            } catch (err: unknown) {
                console.error('Error fetching quiz details:', err);
                if (err instanceof Error) setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchQuizDetails();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
                Loading quiz details...
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 gap-4">
                <p className="text-xl">{error || 'Something went wrong'}</p>
                <Link href="/quizzes" className="text-blue-500 hover:underline">
                    &larr; Back to all quizzes
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-8">
                <Link
                    href="/quizzes"
                    className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
                    &larr; Back to Quizzes
                </Link>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-xl">
                    <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
                    <p className="text-blue-400 mt-2 text-sm font-medium">
                        Read-only preview • {quiz.questions.length}{' '}
                        {quiz.questions.length === 1 ? 'question' : 'questions'}
                    </p>
                </div>

                <div className="space-y-6">
                    {quiz.questions.map((q, index) => (
                        <div key={q.id} className="bg-white/2 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h3 className="text-lg font-medium text-white">
                                    <span className="text-zinc-500 mr-2">{index + 1}.</span>
                                    {q.text}
                                </h3>
                                <span className="text-xs font-medium px-2 py-1 bg-white/5 text-zinc-400 rounded-md whitespace-nowrap">
                                    {q.type}
                                </span>
                            </div>

                            <div className="pt-4 mt-4 border-t border-white/5">
                                {q.type === 'INPUT' && (
                                    <input
                                        type="text"
                                        disabled
                                        placeholder="Short answer text..."
                                        className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
                                    />
                                )}

                                {q.type === 'BOOLEAN' && (
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-3 text-zinc-400 cursor-not-allowed">
                                            <input
                                                type="radio"
                                                disabled
                                                className="w-5 h-5 accent-blue-500 opacity-50"
                                            />
                                            True
                                        </label>
                                        <label className="flex items-center gap-3 text-zinc-400 cursor-not-allowed">
                                            <input
                                                type="radio"
                                                disabled
                                                className="w-5 h-5 accent-blue-500 opacity-50"
                                            />
                                            False
                                        </label>
                                    </div>
                                )}

                                {q.type === 'CHECKBOX' && q.options && (
                                    <div className="space-y-3">
                                        {q.options.map((option, optIndex) => (
                                            <label
                                                key={optIndex}
                                                className="flex items-center gap-3 text-zinc-400 cursor-not-allowed bg-black/10 p-3 rounded-lg border border-white/5">
                                                <input
                                                    type="checkbox"
                                                    disabled
                                                    className="w-5 h-5 rounded border-white/20 bg-transparent accent-blue-500 opacity-50"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
