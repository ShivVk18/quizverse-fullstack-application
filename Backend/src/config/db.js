import sqlite3 from "sqlite3";

import * as sqlite from "sqlite";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../../db/quiz.db");

let db;

const initDb = async () => {
  if (!db) {
    db = await sqlite.open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully");
  }

  return db;
};

export { initDb };
