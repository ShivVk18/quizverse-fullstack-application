# 🧠 QuizVerse – Frontend

A modern, interactive quiz platform built with **React + Tailwind CSS**, featuring a real-time timer ⏱️, sleek **glassmorphism UI**, and centralized state management using **Context API + useReducer**.

---

## ✨ Features

* 🎨 Modern glassmorphism UI with smooth gradients
* ⏱️ Real-time countdown timer (30s/question)
* 📱 Fully responsive & mobile-friendly design
* 🔄 Context API + useReducer for global state management
* 🎯 Question navigation & progress tracking
* 📊 Detailed score summary and answer review
* ✅ Visual feedback for correct/incorrect answers
* 🚀 Single Page App (SPA) with React Router

---

## 🧩 Tech Stack

| Category             | Technology               |
| -------------------- | ------------------------ |
| **Framework**        | React 19 (Vite)          |
| **Routing**          | React Router DOM         |
| **State Management** | Context API + useReducer |
| **Styling**          | Tailwind CSS             |
| **Icons**            | Lucide React             |

---

## 📁 Project Structure

```
src/
├── components/        # Loader, ErrorDisplay
├── contexts/          # QuizContext, QuizProvider, quizReducer
├── hooks/             # useQuiz (custom context hook)
├── pages/             # UserRegistration, QuizInterface, ScoreCard
├── services/          # API service layer
└── App.jsx            # Main entry component
```

---

## ⚙️ Setup & Installation

### 🧱 Prerequisites

* Node.js **v16+**
* Backend server running on **[http://localhost:3000](http://localhost:3000)**

### 🪜 Steps

```bash
# Clone repository
git clone <repo-url>
cd quiz-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

🌐 **App runs at →** [http://localhost:5173](http://localhost:5173)

---

## 🔗 API Endpoints

| Action              | Method | Endpoint                     |
| ------------------- | ------ | ---------------------------- |
| Create / Fetch User | POST   | /api/v1/users/create         |
| Get Random Quiz     | GET    | /api/v1/quiz/random          |
| Submit Quiz         | POST   | /api/v1/quiz-attempts/submit |

---

## 🧠 State Structure

```js
{
  user: null,
  quiz: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 0,
  quizStarted: false,
  quizCompleted: false,
  score: null,
  results: null
}
```

---

## 🎨 UI & Design Highlights

* ✨ Glassmorphism with backdrop blur
* 🌈 Gradient animated backgrounds
* 🌓 Dark theme with blue accents
* 💫 Smooth transitions & hover animations
* 📱 Fully responsive (mobile-first design)

---

