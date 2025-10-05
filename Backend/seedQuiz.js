
import { initDb } from "./src/config/db.js";
import quizzes from "./constants/data.js";

const db = await initDb();

try {
  // Start transaction
  await db.exec("BEGIN TRANSACTION");

  // --- 1. Create tables ---
  await db.exec(`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT
    );

    CREATE TABLE IF NOT EXISTS Quiz (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      timeLimit INTEGER DEFAULT 600
    );

    CREATE TABLE IF NOT EXISTS Question (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quizId INTEGER NOT NULL,
      text TEXT NOT NULL,
      options TEXT NOT NULL,
      correct INTEGER NOT NULL,
      FOREIGN KEY (quizId) REFERENCES Quiz(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS QuizAttempt (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      quizId INTEGER NOT NULL,
      answers TEXT NOT NULL,
      score INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES User(id),
      FOREIGN KEY (quizId) REFERENCES Quiz(id)
    );
  `);

  // --- 2. Clean previous data (optional for re-seeding) ---
  await db.exec(`
    DELETE FROM Question;
    DELETE FROM Quiz;
  `);

  // --- 3. Insert quizzes and questions ---
  for (const qz of quizzes) {
    const quizRes = await db.run(
      "INSERT INTO Quiz (title, description, timeLimit) VALUES (?, ?, ?)",
      [qz.title, qz.description, qz.timeLimit ?? 600]
    );
    const quizId = quizRes.lastID;

    console.log(`Inserted Quiz: "${qz.title}" with ID: ${quizId}`);

    for (const q of qz.questions) {
      await db.run(
        "INSERT INTO Question (quizId, text, options, correct) VALUES (?, ?, ?, ?)",
        [quizId, q.text, JSON.stringify(q.options), q.correct]
      );
    }
  }

  // Commit transaction
  await db.exec("COMMIT");
  console.log("✅ All quizzes and questions inserted successfully!");

} catch (err) {
  await db.exec("ROLLBACK");
  console.error("❌ Error seeding database:", err);
}
