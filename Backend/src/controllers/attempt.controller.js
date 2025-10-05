
import * as Question from '../models/question.model.js'  
import * as QuizAttempt from '../models/quizAttempt.model.js'

const submitQuiz = async (req, res) => {
  try {
    const { quizId, userId, answers } = req.body;

    if (!quizId || !userId || !answers) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID, User ID, and answers are required.",
      });
    }
    
    const questions = await Question.getQuestionsByQuiz(quizId);

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for this quiz.",
      });
    }

    let score = 0;
   const results = questions.map((q) => {
  const userAnswerText = answers[q.id]; 
  const userAnswerIndex = q.options.findIndex(opt => opt === userAnswerText);

  const isCorrect = userAnswerIndex === q.correct;

  if (isCorrect) score++;

  return {
    id: q.id,
    text: q.text,
    options: q.options,
    userAnswer: {
      index: userAnswerIndex,
      text: userAnswerText,
    },
    correctAnswer: {
      index: q.correct,
      text: q.options[q.correct],
    },
    isCorrect,
  };
});


    const attemptId = await QuizAttempt.createAttempt({ quizId, userId, answers, score });

    res.status(201).json({
      success: true,
      message: "Quiz submitted successfully.",
      data: {
        attemptId,
        score,
        totalQuestions: questions.length,
        results,
      },
    });
  } catch (e) {
    console.error("Error submitting quiz:", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong while submitting the quiz. Please try again.",
      error: e.message,
    });
  }
}


const getAttempt = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Attempt ID is required.",
      });
    }

    const attempt = await QuizAttempt.getAttemptById(id);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Quiz attempt not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quiz attempt fetched successfully.",
      data: attempt,
    });
  } catch (e) {
    console.error("Error fetching quiz attempt:", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the quiz attempt. Please try again.",
      error: e.message,
    });
  }
}

export { submitQuiz, getAttempt }; 