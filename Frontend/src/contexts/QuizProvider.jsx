import { useReducer } from "react";
import { QuizContext } from "./QuizContext";
import { quizReducer, initialState } from "./quizReducer";

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};