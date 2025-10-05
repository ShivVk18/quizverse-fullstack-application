import * as Quiz from '../models/quiz.model.js';
import { getQuestionsByQuiz } from '../models/question.model.js';

const getRandomQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.getRandomQuiz();

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "No quiz found at the moment.",
      });
    }

    
    const questions = await getQuestionsByQuiz(quiz.id);

    res.status(200).json({
      success: true,
      message: "Random quiz fetched successfully.",
      data: {
        ...quiz,
        questions, 
      },
    });
  } catch (error) {
    console.error("Error fetching random quiz:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

export { getRandomQuiz };
