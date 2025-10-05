import { initDb } from "../config/db.js";

async function getQuestionsByQuiz(quizId){
  const db = await initDb();
  const rows = await db.all(`SELECT id,text,options,correct FROM Question WHERE quizId = ?`, [quizId]);
  return rows.map(r => ({...r, options: JSON.parse(r.options)}));
}

export { getQuestionsByQuiz };
