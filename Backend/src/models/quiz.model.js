import { initDb } from "../config/db.js";

const getRandomQuiz = async () => { 
  const db = await initDb();
  
  try {
    const quiz = await db.get("SELECT * FROM QUIZ ORDER BY RANDOM() LIMIT 1");
    
   
    if (!quiz) {
      console.log("No quiz found in database");
      return null;
    }
    
    
    return quiz;
  } catch (error) {
    console.error("Error in getRandomQuiz:", error);
    throw error;
  }
}



export { getRandomQuiz};