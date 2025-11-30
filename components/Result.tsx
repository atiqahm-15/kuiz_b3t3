import React from 'react';
import { User } from '../types';
import { QUESTIONS } from '../constants';
import Button from './Button';
import { Trophy, XCircle, CheckCircle, RotateCcw } from 'lucide-react';

interface ResultProps {
  user: User;
  score: number;
  answers: Record<number, number>;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ user, score, answers, onReset }) => {
  const percentage = Math.round((score / QUESTIONS.length) * 100);
  const isPass = percentage >= 40;

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-pink-200">
          <div className={`${isPass ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-800'} p-8 text-center text-white relative overflow-hidden`}>
            {/* Decorational circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-10 translate-y-10"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border-2 border-white/30">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {isPass ? 'Tahniah!' : 'Cuba Lagi!'}
              </h1>
              <p className="opacity-90 text-lg">
                {user.name} - {user.className}
              </p>
            </div>
          </div>
          
          <div className="p-8 text-center">
            <div className="mb-6">
              <span className="text-sm text-pink-500 uppercase tracking-wider font-bold">Markah Anda</span>
              <div className="text-6xl font-bold text-gray-800 mt-2">
                {score}<span className="text-3xl text-gray-400">/{QUESTIONS.length}</span>
              </div>
              <div className="inline-block px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mt-3">
                {percentage}%
              </div>
            </div>

            <Button onClick={onReset} variant="outline" className="flex items-center gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" />
              Mula Semula
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 ml-1">Semakan Jawapan</h3>
          {QUESTIONS.map((q) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswerIndex;

            return (
              <div 
                key={q.id} 
                className={`bg-white p-6 rounded-xl border-l-4 shadow-sm ${
                  isCorrect ? 'border-l-green-500' : 'border-l-red-500'
                }`}
              >
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-3">{q.id}. {q.text}</h4>
                    
                    <div className="space-y-2">
                      <div className={`p-3 rounded-lg text-sm flex justify-between items-center ${
                        isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                      }`}>
                        <span>
                          <span className="font-bold mr-2">Jawapan Anda:</span>
                          {q.options[userAnswer]}
                        </span>
                      </div>
                      
                      {!isCorrect && (
                        <div className="p-3 rounded-lg text-sm bg-gray-50 text-gray-700 flex justify-between items-center border border-gray-200">
                          <span>
                            <span className="font-bold mr-2">Jawapan Betul:</span>
                            {q.options[q.correctAnswerIndex]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;