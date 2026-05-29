import { Router } from 'express';
import { getAllQuizzes, createQuiz } from '../controllers/template.controller';

const router = Router();

router.get('/quizzes', getAllQuizzes);
router.post('/quizzes', createQuiz);
// router.get('/quizzes/:id', template);
// router.delete('/quizzes/:id', template);

export default router;
