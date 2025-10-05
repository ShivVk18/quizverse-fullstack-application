import { Router } from "express";
import { getRandomQuiz } from "../../controllers/quiz.controller.js";


const router = Router();


router.get('/random', getRandomQuiz)


export default router;