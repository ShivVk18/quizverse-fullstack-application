import { initDb } from "../config/db.js";

const createUser = async (username, email) => {
  const db = await initDb();

  const result = await db.run(
    "INSERT INTO USER (username, email) VALUES (?, ?)",
    [username, email]
  );

 
  return { 
    id: result.lastID, 
    username, 
    email 
  };
};



const getUserByEmailAndUsername = async (email, username) => {
  const db = await initDb();
  const user = await db.get(
    "SELECT * FROM USER WHERE email = ? AND username = ?", 
    [email, username]
  );
  return user;
};

export { createUser,  getUserByEmailAndUsername };