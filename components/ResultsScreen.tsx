import React from 'react';
import { StarIcon } from './Icons';

interface ResultsScreenProps {
  playerName: string;
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onSaveScore: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ playerName, score, totalQuestions, onPlayAgain, onSaveScore }) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    let emoji = '';

    if (percentage === 100) {
        message = 'Điểm Tuyệt Đối!';
        emoji = '🏆';
    } else if (percentage >= 80) {
        message = 'Chuyên Gia Canxi!';
        emoji = '🥇';
    } else if (percentage >= 50) {
        message = 'Làm Tốt Lắm!';
        emoji = '👍';
    } else {
        message = 'Cùng Cố Gắng Nhé!';
        emoji = '📚';
    }

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in-up">
        <h2 className="text-3xl font-black text-emerald-900 mb-2">{message} {emoji}</h2>
        <p className="text-slate-700 mb-6 text-lg">Chúc mừng <span className="font-bold text-emerald-800">{playerName}</span> đã hoàn thành bài quiz!</p>
        
        <div className="bg-white/30 rounded-xl p-6 my-6">
            <p className="text-lg text-emerald-800 font-semibold">Điểm của bạn</p>
            <p className="text-6xl font-black text-emerald-900 my-2">{score} <span className="text-3xl font-bold text-slate-600">/ {totalQuestions}</span></p>
            <div className="flex justify-center my-4">
                {[...Array(totalQuestions)].map((_, i) => (
                    <StarIcon key={i} className={`w-8 h-8 ${i < score ? 'text-yellow-400' : 'text-white/40'}`} />
                ))}
            </div>
        </div>

        <div className="mt-8 space-y-4">
            <button
                onClick={onSaveScore}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
            >
                Lưu & Xem Bảng Xếp Hạng
            </button>
             <button
                onClick={onPlayAgain}
                className="w-full bg-yellow-400/80 hover:bg-yellow-500/80 text-emerald-900 font-bold py-3 px-8 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
                Chơi lại
            </button>
        </div>
    </div>
  );
};

export default ResultsScreen;
