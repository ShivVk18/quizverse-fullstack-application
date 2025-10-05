const API_BASE_URL = '/api/v1';

export const apiService = {
  async createUser(username, email) {
    const response = await fetch(`${API_BASE_URL}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create user');
    }

    const data = await response.json();
    
    // Ensure consistent structure
    return {
      id: data.id,
      username: data.username,
      email: data.email
    };
  },

  async getRandomQuiz() {
    const response = await fetch(`${API_BASE_URL}/quiz/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch quiz');
    }

    return response.json();
  },

  async submitQuiz(quizId, userId, answers) {
    console.log('Submitting quiz:', { quizId, userId, answers });
    
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    if (!quizId) {
      throw new Error('Quiz ID is required');
    }
    
    const response = await fetch(`${API_BASE_URL}/quiz-attempts/random`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizId, userId, answers }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit quiz');
    }

    return response.json();
  },

  async getAttempt(attemptId) {
    const response = await fetch(`${API_BASE_URL}/quiz-attempts/${attemptId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch attempt');
    }

    return response.json();
  },
};