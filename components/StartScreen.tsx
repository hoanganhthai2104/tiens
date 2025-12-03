import React, { useState } from 'react';
import { TiensLogo } from './Logo';
import { TrophyIcon } from './Icons';
import { Difficulty } from '../types';

interface StartScreenProps {
  onStart: (name: string, difficulty: Difficulty) => void;
  onViewLeaderboard: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onViewLeaderboard }) => {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState<Difficulty>('Vừa');

    const handleStart = () => {
        if (name.trim()) {
            onStart(name.trim(), difficulty);
        }
    };
    
  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12 text-center transform transition-all duration-500 animate-fade-in-up">
        <TiensLogo className="mb-6" />
      <h1 className="text-3xl md:text-4xl font-black text-emerald-900 mb-2" style={{textShadow: '1px 1px 2px rgba(255,255,255,0.5)'}}>
        Bé Yêu Canxi!
      </h1>
      <p className="text-slate-700 mb-8 text-lg">
        Khám phá kiến thức về canxi cho sức khỏe của bé!
      </p>
      
      <div className="flex flex-col space-y-4">
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên của bé..."
            className="w-full px-5 py-3 rounded-full border-2 border-white/40 bg-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-slate-500 text-slate-800 font-semibold text-center text-lg"
            maxLength={20}
        />

        <div className="flex justify-center space-x-3">
            {(['Dễ', 'Vừa', 'Khó'] as Difficulty[]).map(level => (
                 <button 
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${difficulty === level ? 'bg-yellow-400 text-emerald-900 shadow-md' : 'bg-white/30 text-slate-600 hover:bg-white/50'}`}
                 >
                    {level}
                 </button>
            ))}
        </div>

        <button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-bold py-4 px-10 rounded-full text-xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:transform-none"
        >
            Bắt đầu chơi!
        </button>
        <button
            onClick={onViewLeaderboard}
            className="w-full bg-emerald-500/80 hover:bg-emerald-600/80 text-white font-bold py-3 px-8 rounded-full shadow-md transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
        >
            <TrophyIcon className="w-6 h-6" />
            Bảng Xếp Hạng
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
