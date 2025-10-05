export const initialState = {
  user: null,
  quiz: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 0,
  quizStarted: false,
  quizCompleted: false,
  score: null,
  results: null,
  attemptId: null,
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_QUIZ":
      return {
        ...state,
        quiz: action.payload,
        timeRemaining: action.payload.questions.length * 30,
        quizStarted: true,
      };
    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.quiz.questions.length - 1
        ),
      };
    case "PREV_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case "SET_QUESTION_INDEX":
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };
    case "TICK_TIMER":
      return {
        ...state,
        timeRemaining: Math.max(state.timeRemaining - 1, 0),
      };
    case "SUBMIT_QUIZ":
      return {
        ...state,
        quizCompleted: true,
        score: action.payload.score,
        results: action.payload.results,
        attemptId: action.payload.attemptId,
      };
    case "RESET_QUIZ":
      return initialState;
    default:
      return state;
  }
};