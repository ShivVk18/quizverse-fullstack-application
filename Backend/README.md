# QuizVerse Backend

A Node.js/Express backend for a quiz application with an SQLite database. The server supports multiple quiz categories (Tech Basics, Frontend Tech, Cricket, Football, and a mixed category), user management, quiz attempts tracking, and automatic scoring.

---

## Features

- 🎯 Random quiz selection
- 📝 Multiple quiz categories (Tech Basics, Frontend Tech, Cricket, Football, Mixed)
- 👤 User management (create or return existing user)
- 📊 Quiz attempt tracking and scoring
- 🗃️ SQLite database for persistent storage
- ✅ Automatic score calculation
- 🔄 Transaction-based database seeding

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **ORM/Query Builder:** `sqlite` (promise-based wrapper)
- **CORS:** Enabled for all origins

---

## Project Structure

```
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection setup
│   ├── controllers/
│   │   ├── attempt.controller.js # Quiz attempt logic
│   │   ├── quiz.controller.js    # Quiz fetching logic
│   │   └── user.controller.js    # User management logic
│   ├── models/
│   │   ├── question.model.js     # Question data access
│   │   ├── quiz.model.js         # Quiz data access
│   │   ├── quizAttempt.model.js  # Attempt data access
│   │   └── user.model.js         # User data access
│   ├── routes/
│   │   ├── index.routes.js       # Main router
│   │   ├── quizRoutes/
│   │   │   ├── quiz.routes.js
│   │   │   └── quizAttemps.routes.js
│   │   └── userRoutes/
│   │       └── user.routes.js
│   └── app.js                    # Express app configuration
├── constants/
│   └── data.js                   # Quiz data
├── db/
│   └── quiz.db                   # SQLite database file
├── seed.js                       # Database seeding script
└── index.js                      # Server entry point
```

---

## Database Schema

### User

```sql
CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT
);
```

### Quiz

```sql
CREATE TABLE Quiz (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  timeLimit INTEGER DEFAULT 600
);
```

### Question

```sql
CREATE TABLE Question (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quizId INTEGER NOT NULL,
  text TEXT NOT NULL,
  options TEXT NOT NULL,
  correct INTEGER NOT NULL,
  FOREIGN KEY (quizId) REFERENCES Quiz(id) ON DELETE CASCADE
);
```

*Note:* `options` can be stored as a JSON string (e.g. `['A', 'B', 'C', 'D']`). `correct` is the index (0..3) or the option ID depending on implementation.

### QuizAttempt

```sql
CREATE TABLE QuizAttempt (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  quizId INTEGER NOT NULL,
  answers TEXT NOT NULL,
  score INTEGER,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (quizId) REFERENCES Quiz(id)
);
```

`answers` should be stored as a JSON string mapping question IDs to chosen answers, e.g. `{"1":"JavaScript","2":"HTML"}`.

---

## API Endpoints

All responses follow this structure:

```json
{
  "success": true|false,
  "message": "Description of the result",
  "data": { ... }
}
```

### User Routes

- `POST /api/v1/users/create` - Create a new user or return existing

  **Body**
  ```json
  { "name": "John Doe", "email": "john@example.com" }
  ```

- `GET /api/v1/users/:id` - Get user by ID


### Quiz Routes

- `GET /api/v1/quiz/random` - Get a random quiz with questions

  **Response (example)**
  ```json
  {
    "success": true,
    "message": "Random quiz fetched successfully.",
    "data": {
      "id": 1,
      "title": "Tech Basics",
      "description": "General technology knowledge",
      "timeLimit": 600,
      "questions": [ ... ]
    }
  }
  ```


### Quiz Attempt Routes

- `POST /api/v1/quiz-attempts/random` - Submit quiz answers

  **Body**
  ```json
  {
    "quizId": 1,
    "userId": 1,
    "answers": {
      "1": "Hyper Text Markup Language",
      "2": "JavaScript"
    }
  }
  ```

  **Behavior**
  - Server compares submitted answers with stored `correct` values
  - Calculates `score` automatically
  - Stores the attempt (answers + score) in `QuizAttempt`
  - Returns detailed result marking each question correct/incorrect

- `GET /api/v1/quiz-attempts/:id` - Get attempt details by ID

---

## Error Handling

- `400 Bad Request` — Missing required fields or invalid payload
- `404 Not Found` — Resource doesn't exist
- `500 Internal Server Error` — Unexpected server error

All errors return the standard response envelope with `success: false` and an explanatory `message`.

---

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd quiz-backend
```

2. Install dependencies

```bash
npm install
# and ensure required packages
npm install express cors sqlite3 sqlite
```

3. Set up the database (seed initial data)

```bash
node seed.js
```

4. Start the server

```bash
node index.js
```

The server will start on `http://localhost:3000` (or the port specified in `PORT` environment variable).

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
DB_PATH=./db/quiz.db   # optional: path to sqlite file
```

---

## Database Seeding

Run the seeding script to populate the database with initial quiz data:

```bash
node seed.js
```

This will:
- Create all necessary tables
- Insert 5 quiz categories with 10 questions each
- Use transactions to ensure consistent seeding
- Display success messages for each inserted quiz

> To modify quiz data, edit `constants/data.js` and re-run the seeding script (or write a migration script if you want safe updates).

---

## Quiz Categories

1. Tech Basics — General technology knowledge (HTML, CSS, JavaScript, etc.)
2. Frontend Tech — Frontend development questions (React, JSX, CSS)
3. Cricket Knowledge — Cricket trivia
4. Football Knowledge — Football trivia
5. Tech & Sports Mix — Mixed questions from all categories

Each quiz contains 10 multiple-choice questions with 4 options.

---

## Notes & Recommendations

- Store `options` and `answers` as JSON strings in the DB to keep the schema flexible.
- Use transactions during seeding to avoid partial inserts.
- Consider indexing `quizId` on `Question` and `userId`/`quizId` on `QuizAttempt` for faster lookups if the DB grows.
- Add rate-limiting and input validation (e.g., `express-validator`) for production readiness.

---

## Contribution

Feel free to open issues or submit PRs. If you add features (like timed live quizzes, leaderboards, or user profiles), update `constants/data.js` and `seed.js` accordingly.

---

