import { Router } from "express";

import { getAttempt, submitQuiz } from "../../controllers/attempt.controller.js";

const router = Router();


router.post('/submit', submitQuiz)
router.get('/:id',getAttempt)




export default router;