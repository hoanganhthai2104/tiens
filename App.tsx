import React, { useState, useCallback } from 'react';
import { generateQuizQuestions } from './services/geminiService';
import { QuizQuestion, LeaderboardEntry, Difficulty } from './types';
import { getLeaderboard, saveToLeaderboard } from './utils/leaderboard';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import LoadingSpinner from './components/LoadingSpinner';
import LeaderboardScreen from './components/LeaderboardScreen';

type GameState = 'start' | 'loading' | 'quiz' | 'results' | 'leaderboard' | 'error';

// Corrected and optimized base64 strings
const productBoxBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPYSURBVHgB7VzRbhw5FHX/S2wBCYmRQJ6AnI4hISGhyI6AgwQXgBNw5AhyEt+SQ5AcnbIokQOEkCDZ8v+v2TOz1NbCzXJ11tN/EpLsvXp1uul0uhg8Hs/y+XyM46jT6cjlciGEvN/vXbFYxHEcpVLJ0WgUyzI/HA4lSfilUonj8dij0Yin0wmbMiEIAdM0vb5eS6VSqNfrGIYhh8MQSdJqtUrLsjzPKxaLAdzyPE+apnQ6HVarFVmW2Ww2dDodsizL4/GgWq0SDEOaplEUhWEYnU4H0zSGYVg8Hr8e2SjLcv/P6XSis7Mzuq6/tWgYhvPz82q1GuP/AZRSCCGPRqMsyxJCUKlU/LquWZZFkiSMcbvdJpPJ/L7kNE0sy7LZbNput0mSpNFo8Hg84vE4x3E4nU7VajXDMAiCEEII0zSaphFCyLKs0WgQDAOk0+l+W5BSCCGEECzL0ul0IYS83+/lcjlZlpVOp8FgEJfLBYZhkCSJMAzyPM80TXlcDrPZDDNNm6YRRhCE3++HMCRJwmq1SqVS/O12i2VZLMteXy+lUkGlUqFer6PrOnEcjuMwm81yv99funxFUfD5fMjlcvR8Py/LwnEcpmnyu7/SNE0sy0KhELFYDJIk0XWdMAxZljVNkwzDmM1moVAIj8eDx+NBpVLBYDBwOBxKpRJM0zzdbn/4qVqtJggCpmnxeDzIZrNUKhWGYXAc5/V6XbFYxHEcaZriOA6CIGq1mqIoKIpCCLFYLLlcjsPhQCqVYhgGURTRdZ1hGCzLaLfbzGazNE0TBAHDMK5UKhzH4XA4xOPxZrMJwzBcLhfX6zXTNOVyOWiaJpPJyOVyzGazfD4fQRByuRy1Wg1BEFarFSRJ/pD/F0KRSqU4nU7nef7lP4uq0+l8Pp9zua+6rus4jrIsUzQNYRj0ej2e5xFC/D4hSZKEECKRSFAURTAYJBqNEgTBNE3dbpesUqnEGIOMMSzLaJpGtVpFUZTl+eFwiOd5iqIghBDDMAzDkCSJIAiyLEMIkSQJkiSSJGGMRqMhGo0ghBDDMNPplMlkEEJwOp3iOA6CIGzbNkVRPM+z2Wy4XK6/9bmoKEIIh8OIRCJEKBRijEKhEAgEsFgsSKfTNE2jqiqCIAzDHMfhcrkghBBCyPL84XCIpmkIIdfrtc/nQxAEURQJIQQhBEEQRVE0TSGEPM8Ph0OaplEUhVwuR0EQmqYtFgvdbpc0TdM0RSQSSZKEEOLz+UwmE6qusyxLkiSCIAjDyGazHMexLIsgCNPpdDgcIggC0zQzDANBEKIoSZKkrusIIYIgqKoKmqaZpils2xZFwTAMiqKMMYqiYJomx3EIIWiaZpommqaJRqMkSWIcxzAmiqIghNvtViwWkSQJYRiCIKiqStM0RVGMMYqiIAiiaJpMJgNhGAghNE0jhBBCCCGEEEKcPQCCiI9d7uOaRgAAAABJRU5ErkJggg==";
const wingsBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO3bsWoCQRAF0MO8VoKVFnYWapawCVhZW1pZWNoPoUW1sLKwsLKysLOwsBEEWyCYg4Nl5w13uP/B5YDuw8MhACHsYo/Hg6dZ1/Vpmn6s/xAEwdVqlWEYrNdrvu+nadrv9wshzPN80zS12+1pmu73e13Xv/x8Op3Sdf2kS5IkSZJ9Pp/v97tpmqIoiqL4vt9/9n3/KIp2u11RFFmWVavVKIpSKBSwLCuKgnmedrvdbrcrFApYljVNk1wuxzRNx3EAvNfrlUqloihijEajwd/vR5ZlaZpBEARBkFarxTAMpVIJQRB834fneYIg6Pf7mqZpmiYIgoIgyLIsyzLbtnM4HMLhwDAMuq5f7X3btk3TFEWhaRoA4HkeHMfh8XjQ6/V83zfG2LbtnudxHKder0MIlmWz2QyZTAYAzPM8mqb1en3M5/NE0zRNE4fDQTQaRRD0+/2u60IIlmWlUilJEj6fDyEEAGzbZlnWbreH4/jV2B8kSZKkG/wCxVPTpUc6s0YAAAAASUVORK5CYII=";


const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('start');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [playerName, setPlayerName] = useState<string>('');
    const [difficulty, setDifficulty] = useState<Difficulty>('Vừa');
    

    const startQuiz = useCallback(async (name: string, diff: Difficulty) => {
        setPlayerName(name);
        setDifficulty(diff);
        setGameState('loading');
        setScore(0);
        setCurrentQuestionIndex(0);
        try {
            const fetchedQuestions = await generateQuizQuestions(diff);
             if (fetchedQuestions.length < 5) {
                throw new Error("Không đủ câu hỏi được tạo. Vui lòng thử lại.");
            }
            setQuestions(fetchedQuestions);
            setGameState('quiz');
        } catch (err: any) {
            setError(err.message || 'Đã có lỗi xảy ra khi tạo câu hỏi.');
            setGameState('error');
        }
    }, []);

    const handleAnswer = useCallback((isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
    }, []);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setGameState('results');
        }
    }, [currentQuestionIndex, questions.length]);

    const handlePlayAgain = useCallback(() => {
        setGameState('start');
    }, []);

    const handleViewLeaderboard = useCallback(() => {
        setLeaderboard(getLeaderboard());
        setGameState('leaderboard');
    }, []);

    const handleSaveScore = useCallback(() => {
        saveToLeaderboard(playerName, score);
        handleViewLeaderboard();
    }, [score, playerName, handleViewLeaderboard]);
    
    const handleGoToStart = useCallback(() => {
        setGameState('start');
    }, []);

    const renderGameState = () => {
        switch (gameState) {
            case 'start':
                return <StartScreen onStart={startQuiz} onViewLeaderboard={handleViewLeaderboard} />;
            case 'loading':
                return <LoadingSpinner message="Đang tạo bộ câu hỏi..." />;
            case 'quiz':
                if (questions.length > 0) {
                    return (
                        <QuizScreen
                            question={questions[currentQuestionIndex]}
                            questionNumber={currentQuestionIndex + 1}
                            totalQuestions={questions.length}
                            onAnswer={handleAnswer}
                            onNext={handleNextQuestion}
                        />
                    );
                }
                return <LoadingSpinner message="Đang tải câu hỏi..." />;
             case 'results':
                return (
                    <ResultsScreen
                        playerName={playerName}
                        score={score}
                        totalQuestions={questions.length}
                        onPlayAgain={handlePlayAgain}
                        onSaveScore={handleSaveScore}
                    />
                );
            case 'leaderboard':
                return <LeaderboardScreen scores={leaderboard} onPlayAgain={handlePlayAgain} onGoToStart={handleGoToStart} />;
            case 'error':
                 return (
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 text-center animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-red-700 mb-4">Ối, có lỗi rồi!</h2>
                        <p className="text-slate-700 mb-6">{error}</p>
                        <button
                            onClick={handleGoToStart}
                            className="bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-bold py-3 px-8 rounded-full shadow-lg"
                        >
                            Thử lại
                        </button>
                    </div>
                 );
        }
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center p-4">
             <div className="absolute inset-0 overflow-hidden z-0">
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-20 blur-sm"
                    style={{
                        background: `url(${wingsBase64}) no-repeat center center / contain`,
                        transform: 'translate(-50%, -50%) rotate(-5deg)',
                    }}
                />
                 <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] md:w-[240px] md:h-[240px] opacity-30"
                    style={{
                        background: `url(${productBoxBase64}) no-repeat center center / contain`,
                    }}
                />
            </div>
            <div className="relative z-10 w-full max-w-lg mx-auto">
                {renderGameState()}
            </div>
        </main>
    );
};

export default App;
