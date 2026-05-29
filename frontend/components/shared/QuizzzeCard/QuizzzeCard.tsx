import Link from 'next/link';
import React from 'react';
import { Trash } from 'lucide-react';

interface QuizzzeCardProps {
    quiz: {
        id: string;
        title: string;
        questionCount: number;
    };
    handleDelete: (id: string, e: React.MouseEvent) => void;
}

export default function QuizzzeCard({ quiz, handleDelete }: QuizzzeCardProps) {
    return (
        <Link
            href={`/quizzes/${quiz.id}`}
            key={quiz.id}
            className="group relative block bg-white/2 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/4 transition-all duration-300">
            <div className="flex flex-col h-full justify-between gap-4">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{quiz.title}</h3>
                    <span className="inline-block bg-blue-500/10 text-blue-400 text-sm px-3 py-1 rounded-full border border-blue-500/20">
                        {quiz.questionCount} {quiz.questionCount === 1 ? 'question' : 'questions'}
                    </span>
                </div>

                <button
                    onClick={(e) => handleDelete(quiz.id, e)}
                    className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all duration-200"
                    title="Delete Quiz">
                    <Trash size={20} />
                </button>
            </div>
        </Link>
    );
}
