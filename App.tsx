import React, { useState } from 'react';
import { User, AppState, QuizState } from './types';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    score: 0
  });

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setAppState(AppState.QUIZ);
  };

  const handleQuizFinish = (score: number, answers: Record<number, number>) => {
    setQuizState(prev => ({ ...prev, score, answers }));
    setAppState(AppState.RESULT);
  };

  const handleReset = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: {},
      score: 0
    });
    setAppState(AppState.LOGIN);
    setUser(null);
  };

  return (
    <>
      {appState === AppState.LOGIN && (
        <Login onLogin={handleLogin} />
      )}
      
      {appState === AppState.QUIZ && user && (
        <Quiz user={user} onFinish={handleQuizFinish} />
      )}
      
      {appState === AppState.RESULT && user && (
        <Result 
          user={user} 
          score={quizState.score} 
          answers={quizState.answers} 
          onReset={handleReset} 
        />
      )}
    </>
  );
};

export default App;