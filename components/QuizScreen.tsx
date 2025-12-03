import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { CheckIcon, CrossIcon, SparkleIcon } from './Icons';

interface QuizScreenProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [modalState, setModalState] = useState<{ type: 'correct' | 'incorrect' } | null>(null);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setModalState(null);
  }, [question]);

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    const isCorrect = index === question.correctAnswerIndex;
    setSelectedAnswerIndex(index);
    setIsAnswered(true);
    onAnswer(isCorrect);
    setTimeout(() => {
        setModalState({ type: isCorrect ? 'correct' : 'incorrect' });
    }, 800);
  };
  
  const handleContinue = () => {
    setModalState(null);
    onNext();
  };

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return 'bg-white/40 hover:bg-white/70 text-slate-800 border-white/20';
    }
    if (index === question.correctAnswerIndex) {
      return 'bg-green-500/80 text-white border-green-400';
    }
    if (index === selectedAnswerIndex) {
      return 'bg-red-500/80 text-white border-red-400';
    }
    return 'bg-white/30 text-slate-600 opacity-60 border-white/10';
  };

  return (
    <>
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 md:p-10 w-full animate-fade-in-up">
        <div className="mb-6">
          <p className="text-sm font-bold text-emerald-800">
            Câu {questionNumber} trên {totalQuestions}
          </p>
          <div className="w-full bg-white/30 rounded-full h-2.5 mt-1">
            <div
              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="relative">
             <SparkleIcon className="w-6 h-6 text-yellow-400/70 absolute -top-4 -left-6 transform rotate-[-15deg] opacity-80" />
             <SparkleIcon className="w-5 h-5 text-yellow-400/70 absolute top-8 -left-8 transform rotate-12 opacity-80" />
             <SparkleIcon className="w-5 h-5 text-yellow-400/70 absolute -top-2 -right-4 transform -rotate-12 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 min-h-[100px]">
                {question.question}
            </h2>
        </div>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-xl shadow-md transition-all duration-300 flex justify-between items-center text-lg font-semibold border ${getButtonClass(index)}`}
            >
              <span>{option}</span>
              {isAnswered && index === question.correctAnswerIndex && <CheckIcon className="w-6 h-6" />}
              {isAnswered && index === selectedAnswerIndex && index !== question.correctAnswerIndex && <CrossIcon className="w-6 h-6" />}
            </button>
          ))}
        </div>
      </div>

      {modalState && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-100/80 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 md:p-8 max-w-lg w-full text-center shadow-2xl relative animate-fade-in-up">
              {modalState.type === 'correct' ? (
                <>
                  <SparkleIcon className="w-12 h-12 text-yellow-400 mx-auto -mt-14 mb-2" />
                  <h3 className="text-2xl font-black text-emerald-800 mb-4">Chính xác!</h3>
                </>
              ) : (
                <>
                  <div className="mx-auto bg-red-200 rounded-full w-16 h-16 flex items-center justify-center -mt-14 mb-2 border-4 border-white">
                    <CrossIcon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-black text-red-800 mb-4">Sai mất rồi!</h3>
                </>
              )}
              
              <p className="text-slate-700 mb-4 text-base">{question.explanation}</p>

              {modalState.type === 'incorrect' && (
                <div className="bg-green-100/70 p-3 rounded-lg mb-6">
                    <p className="text-slate-600 text-sm">Đáp án đúng là:</p>
                    <p className="text-emerald-800 font-bold">
                        {question.options[question.correctAnswerIndex]}
                    </p>
                </div>
              )}

              <button
                onClick={handleContinue}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-12 rounded-full text-xl shadow-lg transition-transform transform hover:scale-105"
              >
                {questionNumber === totalQuestions ? 'Hoàn thành' : 'Tiếp tục'}
              </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizScreen;