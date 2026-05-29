'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Question, QuestionType } from '@/types';
import QuestionCard from '@/components/shared/QuestionCard/QuestionCard';

export default function CreateQuizPage() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([{ id: '1', text: '', type: 'INPUT', options: [] }]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: Date.now().toString(),
                text: '',
                type: 'INPUT',
                options: [],
            },
        ]);
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    const updateQuestionType = (id: string, type: QuestionType) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, type, options: type === 'CHECKBOX' ? [''] : [] } : q)),
        );
    };

    const updateQuestionText = (id: string, text: string) => {
        setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
    };

    const addOption = (questionId: string) => {
        setQuestions(questions.map((q) => (q.id === questionId ? { ...q, options: [...q.options, ''] } : q)));
    };

    const updateOptionText = (questionId: string, optionIndex: number, text: string) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const newOptions = [...q.options];
                    newOptions[optionIndex] = text;
                    return { ...q, options: newOptions };
                }
                return q;
            }),
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = { title, questions };
        console.log('Готово до відправки на бекенд:', payload);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Відповідь від бекенду:', data);
                router.push('/quizzes');
            } else {
                console.error('Помилка відправки запиту:', response.statusText);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Create New Quiz</h1>
                    <p className="text-zinc-400 mt-2">Build a custom quiz with various types of questions.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white/2 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Quiz Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. JavaScript Basics"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-6">
                        {questions.map((q, index) => (
                            <QuestionCard
                                key={q.id}
                                questions={questions}
                                index={index}
                                q={q}
                                addOption={addOption}
                                updateOptionText={updateOptionText}
                                removeQuestion={removeQuestion}
                                updateQuestionType={updateQuestionType}
                                updateQuestionText={updateQuestionText}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <Button type="button" variant="secondary" onClick={addQuestion}>
                            + Add Question
                        </Button>

                        <Button type="submit" variant="primary">
                            Save Quiz
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
