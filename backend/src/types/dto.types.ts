import { Question, Quiz } from '@prisma/client';

export interface QuizDTO extends Pick<Quiz, 'title'> {
    questions: Pick<Question, 'type' | 'text' | 'options'>[];
}
