import React from 'react';
import { LeaderboardEntry } from '../types';
import { TrophyIcon } from './Icons';

interface LeaderboardScreenProps {
  scores: LeaderboardEntry[];
  onPlayAgain: () => void;
  onGoToStart: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ scores, onPlayAgain, onGoToStart }) => {
    
    const getMedal = (index: number) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return <span className="font-bold text-slate-500">{index + 1}</span>;
    };

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 w-full animate-fade-in-up">
      <div className="flex items-center justify-center mb-6">
        <TrophyIcon className="w-10 h-10 text-yellow-400" />
        <h2 className="text-3xl font-black text-emerald-900 ml-3">Bảng Xếp Hạng</h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {scores.length > 0 ? (
          scores.map((entry, index) => (
            <div
              key={entry.timestamp}
              className="flex items-center justify-between p-3 rounded-xl bg-white/30 shadow"
            >
              <div className="flex items-center">
                <div className="w-8 text-center text-xl mr-3">{getMedal(index)}</div>
                <p className="font-bold text-slate-800 text-lg">{entry.name}</p>
              </div>
              <p className="font-black text-emerald-800 text-xl">{entry.score}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-600 p-8">Chưa có ai trên bảng xếp hạng. Hãy là người đầu tiên!</p>
        )}
      </div>

      <div className="mt-8 flex flex-col space-y-3">
        <button
          onClick={onPlayAgain}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Chơi Lại
        </button>
        <button
          onClick={onGoToStart}
          className="w-full bg-white/40 hover:bg-white/60 text-emerald-800 font-bold py-2 px-8 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          Về Màn Hình Chính
        </button>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
