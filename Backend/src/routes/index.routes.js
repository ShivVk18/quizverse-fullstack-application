import { Router } from "express";
import quizRoutes from './quizRoutes/quiz.routes.js'
import quizAttemptRoutes from './quizRoutes/quizAttemps.routes.js'
import userRoutes from './userRoutes/user.routes.js'

const router = Router();

router.use('/quiz', quizRoutes)
router.use('/quiz-attempts', quizAttemptRoutes)
router.use('/users', userRoutes)

export default router;
