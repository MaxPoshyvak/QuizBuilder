import { Question, QuestionType } from '@/types';
import { Button } from '@/components/ui/Button';

interface QuestionCardProps {
    questions: Question[];
    index: number;
    q: Question;
    addOption: (questionId: string) => void;
    updateOptionText: (questionId: string, optionIndex: number, text: string) => void;
    removeQuestion: (id: string) => void;
    updateQuestionType: (id: string, type: QuestionType) => void;
    updateQuestionText: (id: string, text: string) => void;
}

export default function QuestionCard({
    questions,
    index,
    q,
    addOption,
    updateOptionText,
    removeQuestion,
    updateQuestionType,
    updateQuestionText,
}: QuestionCardProps) {
    return (
        <div key={q.id} className="bg-white/2 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative group">
            {questions.length > 1 && (
                <button
                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition-colors">
                    ✕
                </button>
            )}

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Question {index + 1}</h3>

                    <select
                        value={q.type}
                        onChange={(e) => updateQuestionType(q.id, e.target.value as QuestionType)}
                        className="bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                        <option value="INPUT">Short Answer</option>
                        <option value="BOOLEAN">True / False</option>
                        <option value="CHECKBOX">Multiple Choice</option>
                    </select>
                </div>

                <input
                    type="text"
                    value={q.text}
                    onChange={(e) => updateQuestionText(q.id, e.target.value)}
                    placeholder="What is your question?"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    required
                />

                <div className="pt-2 pl-2 border-l-2 border-white/10">
                    {q.type === 'INPUT' && (
                        <div className="text-sm text-zinc-500 italic">User will see a text input field here.</div>
                    )}

                    {q.type === 'BOOLEAN' && (
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-zinc-300">
                                <input type="radio" disabled className="accent-blue-500 w-4 h-4" /> True
                            </label>
                            <label className="flex items-center gap-2 text-zinc-300">
                                <input type="radio" disabled className="accent-blue-500 w-4 h-4" /> False
                            </label>
                        </div>
                    )}

                    {q.type === 'CHECKBOX' && (
                        <div className="space-y-3">
                            {q.options.map((optionText: string, optionIndex: number) => (
                                <div key={optionIndex} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        disabled
                                        className="w-4 h-4 rounded border-white/20 bg-transparent accent-blue-500"
                                    />
                                    <input
                                        type="text"
                                        value={optionText}
                                        onChange={(e) => updateOptionText(q.id, optionIndex, e.target.value)}
                                        placeholder={`Option ${optionIndex + 1}`}
                                        className="bg-transparent border-b border-white/10 text-white focus:border-blue-500 px-2 py-1 outline-none text-sm w-full max-w-xs"
                                        required
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="ghost"
                                className="text-sm px-2 py-1"
                                onClick={() => addOption(q.id)}>
                                + Add Option
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
