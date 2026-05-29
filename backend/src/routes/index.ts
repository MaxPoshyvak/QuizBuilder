import { Router } from 'express';
import quizzes from './quizzes.routes';

const router = Router();

router.use(quizzes);

export default router;
