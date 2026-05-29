export type QuestionType = 'INPUT' | 'BOOLEAN' | 'CHECKBOX';

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options: string[];
}

export interface Quiz {
    id: string;
    title: string;
    questionCount: number;
    questions: Question[];
}
