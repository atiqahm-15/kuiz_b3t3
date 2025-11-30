import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { User } from '../types';
import Button from './Button';
import { ChevronRight, CheckCircle2, XCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
  user: User;
  onFinish: (score: number, answers: Record<number, number>) => void;
}

const Quiz: React.FC<QuizProps> = ({ user, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = QUESTIONS[currentIdx];
  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

  const handleSelect = (idx: number) => {
    if (!isSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsSubmitted(true);
    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Calculate score
      let score = 0;
      QUESTIONS.forEach(q => {
        if (answers[q.id] === q.correctAnswerIndex) {
          score++;
        }
      });
      onFinish(score, answers);
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm font-semibold text-gray-800">{user.name}</span>
              <span className="text-xs text-pink-500 ml-2 font-medium">({user.className})</span>
            </div>
            <span className="text-sm font-bold text-pink-600">
              Soalan {currentIdx + 1}/{QUESTIONS.length}
            </span>
          </div>
          <div className="h-2 w-full bg-pink-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-pink-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 pb-32">
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let buttonStyle = 'border-gray-100 hover:border-pink-200 hover:bg-pink-50/50';
              let circleStyle = 'border-gray-300 text-gray-400 group-hover:border-pink-300 group-hover:text-pink-400';
              let textStyle = 'text-gray-700';
              let Icon = null;

              if (isSubmitted) {
                // Logic after submission
                if (idx === currentQuestion.correctAnswerIndex) {
                  // This is the correct answer
                  buttonStyle = 'border-green-500 bg-green-50';
                  circleStyle = 'border-green-500 bg-green-500 text-white';
                  textStyle = 'text-green-900 font-medium';
                  Icon = CheckCircle2;
                } else if (idx === selectedOption) {
                  // This is the selected WRONG answer
                  buttonStyle = 'border-red-500 bg-red-50';
                  circleStyle = 'border-red-500 bg-red-500 text-white';
                  textStyle = 'text-red-900 font-medium';
                  Icon = XCircle;
                } else {
                  // Other unselected wrong answers
                  buttonStyle = 'border-gray-100 opacity-60';
                }
              } else {
                // Logic before submission
                if (selectedOption === idx) {
                  buttonStyle = 'border-pink-500 bg-pink-50 shadow-inner';
                  circleStyle = 'border-pink-500 bg-pink-500 text-white';
                  textStyle = 'text-pink-900 font-medium';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group relative
                    ${buttonStyle} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${circleStyle}`}>
                    {Icon ? <Icon className="w-5 h-5" /> : String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-lg flex-1 ${textStyle}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation Section */}
          {isSubmitted && (
            <div className={`mt-8 p-6 rounded-xl border animation-fade-in ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Jawapan Tepat!' : 'Kurang Tepat'}
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p className="font-semibold text-sm text-gray-500 mb-2 uppercase tracking-wide flex items-center gap-1">
                      <HelpCircle className="w-4 h-4" /> Penjelasan:
                    </p>
                    {currentQuestion.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="bg-white border-t border-pink-100 p-4 fixed bottom-0 w-full z-10">
        <div className="max-w-3xl mx-auto flex justify-end">
          {!isSubmitted ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="flex items-center gap-2"
            >
              Semak Jawapan
              <CheckCircle2 className="w-5 h-5" />
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              className="flex items-center gap-2"
            >
              {currentIdx === QUESTIONS.length - 1 ? 'Lihat Keputusan' : 'Seterusnya'}
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;