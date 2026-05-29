import { Request, Response } from 'express';
import { QuizDTO } from '../types/dto.types';
import { prisma } from '../config/prisma';

export const getAllQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            select: {
                id: true,
                title: true,
                _count: {
                    select: {
                        questions: true,
                    },
                },
            },
        });

        if (!quizzes) {
            return res.status(404).json({ error: 'Quizzes not found' });
        }

        const formatedQuizzes = quizzes.map((quiz) => {
            return {
                id: quiz.id,
                title: quiz.title,
                questionCount: quiz._count.questions,
            };
        });

        res.status(200).json({ quizzes: formatedQuizzes });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

export const createQuiz = async (req: Request, res: Response) => {
    const { title, questions } = req.body as QuizDTO;

    if (!title || !questions) {
        return res.status(400).json({ error: 'Title and questions are required' });
    }

    try {
        const newQuiz = await prisma.quiz.create({
            data: {
                title: title,
                questions: {
                    create: questions.map((question) => ({
                        text: question.text,
                        type: question.type,
                        options: question.options ? JSON.stringify(question.options) : null,
                    })),
                },
            },
            include: {
                questions: true,
            },
        });

        res.status(200).json({ newQuiz });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

export const getQuizById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: String(id),
            },
            select: {
                id: true,
                title: true,
                questions: {
                    select: {
                        id: true,
                        text: true,
                        type: true,
                        options: true,
                    },
                },
            },
        });

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        const formatedQuestions = quiz?.questions.map((question) => {
            return {
                id: question.id,
                text: question.text,
                type: question.type,
                options: question.options ? JSON.parse(question.options) : null,
            };
        });

        res.status(200).json({ quiz: { ...quiz, questions: formatedQuestions } });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

export const deleteQuizById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedQuiz = await prisma.quiz.delete({
            where: {
                id: String(id),
            },
        });

        if (!deletedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json({ deletedQuiz });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};
