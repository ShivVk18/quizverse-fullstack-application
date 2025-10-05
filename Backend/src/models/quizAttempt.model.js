import { initDb } from "../config/db.js";

async function createAttempt({quizId,userId,answers,score}){
  const db = await initDb();
  const result = await db.run(
    `INSERT INTO QuizAttempt (quizId,userId,answers,score) VALUES (?,?,?,?)`,
    [quizId,userId,JSON.stringify(answers),score]
  );
  return result.lastID;
}


export { createAttempt };
