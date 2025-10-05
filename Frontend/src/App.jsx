import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserRegistration } from './pages/UserRegistration';
import { QuizInterface } from './pages/QuizInterface';
import { ScoreCard } from './pages/ScoreCard';
import { QuizProvider } from './contexts/QuizProvider';

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/quiz" element={<QuizInterface />} />
          <Route path="/results" element={<ScoreCard />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
