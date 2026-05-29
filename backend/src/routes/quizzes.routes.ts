import { Router } from 'express';
import { getAllQuizzes, createQuiz, getQuizById, deleteQuizById } from '../controllers/quizzes.controller';

const router = Router();

router.get('/quizzes', getAllQuizzes);
router.post('/quizzes', createQuiz);
router.get('/quizzes/:id', getQuizById);
router.delete('/quizzes/:id', deleteQuizById);

export default router;
