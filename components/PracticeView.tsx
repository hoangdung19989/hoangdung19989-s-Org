
import React, { useState, useEffect } from 'react';
import type { SelfPracticeSubject, TestGrade, PracticeLesson, Quiz } from '../types';
import { HomeIcon, ChevronRightIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from './icons';
import { playAudioFromBase64 } from '../utils/audio';
import { CORRECT_ANSWER_SOUND, INCORRECT_ANSWER_SOUND } from '../constants';

interface PracticeViewProps {
  subject: SelfPracticeSubject;
  grade: TestGrade;
  lesson: PracticeLesson;
  quizData: Quiz | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onBack: () => void; // Back to lesson selection
  onBackToSubjects: () => void; // Back to subject selection (Tự luyện)
  onBackToSelfStudy: () => void; // Back to Tự học dashboard
}

const LoadingSpinner: React.FC<{ lessonTitle: string }> = ({ lessonTitle }) => (
  <div className="flex flex-col items-center justify-center text-center p-8">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin mb-4"></div>
    <p className="text-slate-600 font-semibold">Đang tạo bài luyện tập cho bài học:</p>
    <p className="text-slate-500 italic">"{lessonTitle}"</p>
    <p className="text-slate-500 text-sm mt-2">AI (Gemini) đang làm việc, vui lòng chờ trong giây lát.</p>
  </div>
);

const PracticeView: React.FC<PracticeViewProps> = ({ 
    subject, 
    grade, 
    lesson, 
    quizData,
    isLoading,
    error,
    onRetry,
    onBack,
    onBackToSubjects,
    onBackToSelfStudy,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Reset state when lesson changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsTimerRunning(false);
  }, [lesson]);

  // Initialize timer when quizData loads
  useEffect(() => {
      if (quizData && !isLoading) {
          // Default practice time usually short, e.g., 10-15 mins depending on question count
          // Or parse from quizData if available
          const defaultTime = 15; 
          const timeString = quizData.timeLimit || `${defaultTime} phút`;
          const minutes = parseInt(timeString.match(/\d+/)?.[0] || String(defaultTime)); 
          setTimeLeft(minutes * 60);
          setIsTimerRunning(true);
      }
  }, [quizData, isLoading]);

  // Timer logic
  useEffect(() => {
    // FIX: Use ReturnType<typeof setInterval> for browser compatibility instead of NodeJS.Timeout
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && timeLeft > 0) {
        interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
        setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  const handleAnswerSelect = (option: string) => {
    if (isAnswered || !isTimerRunning) return;
    
    setIsAnswered(true);
    setSelectedAnswer(option);
    
    if (option === quizData?.questions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
      playAudioFromBase64(CORRECT_ANSWER_SOUND);
    } else {
      playAudioFromBase64(INCORRECT_ANSWER_SOUND);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };
  
  const currentQuestion = quizData?.questions[currentQuestionIndex];
  const isQuizFinished = quizData && currentQuestionIndex >= quizData.questions.length;

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner lessonTitle={lesson.title} />;
    }
    if (error) {
      return (
        <div className="text-center text-red-600 bg-red-50 p-6 rounded-lg">
          <p className="font-bold text-lg">Lỗi!</p>
          <p className="mt-2">{error}</p>
           <button onClick={onRetry} className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
            Thử lại
          </button>
        </div>
      );
    }
    if (isQuizFinished) {
      return (
        <div className="text-center p-8">
          <h3 className="text-2xl font-bold text-slate-800">Hoàn thành!</h3>
          <p className="text-lg text-slate-600 mt-2">
            Bạn đã trả lời đúng {score} / {quizData.questions.length} câu hỏi.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <button onClick={onBack} className="px-5 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300">
              Chọn bài học khác
            </button>
            <button onClick={onRetry} className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
              Luyện tập lại
            </button>
          </div>
        </div>
      );
    }
    if (currentQuestion) {
      const isTimeLow = timeLeft < 60;

      return (
        <div className="p-6 relative">
             {/* Sticky Timer Header */}
             <div className="flex justify-end sticky top-0 z-30 mb-6 -mx-6 px-6 py-2 bg-white/90 backdrop-blur-md border-b border-slate-100/50">
                 <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-full shadow-sm border transition-colors duration-300 ${isTimeLow ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-white border-slate-200 text-slate-700'}`}>
                    <ClockIcon className="h-5 w-5" />
                     {timeLeft === 0 ? (
                        <span className="font-bold text-base uppercase">Đã hết giờ</span>
                    ) : (
                        <div className="flex items-baseline">
                            <span className="text-xs font-semibold mr-1 uppercase hidden sm:inline-block text-slate-500">Còn lại:</span>
                            <span className="font-mono font-bold text-lg tracking-widest">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    )}
                 </div>
            </div>

            <div className="text-center mb-4 border-b border-slate-100 pb-4">
                <p className="text-sm text-slate-500">Bài luyện tập cho:</p>
                <p className="font-semibold text-slate-700">{lesson.title}</p>
            </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-slate-500">Câu hỏi {currentQuestionIndex + 1} / {quizData?.questions.length}</p>
            <p className="text-sm font-bold text-slate-700">Điểm: {score}</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
             <div className="bg-sky-500 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / (quizData?.questions.length || 1)) * 100}%` }}></div>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-6">{currentQuestion.question}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let buttonClass = 'border-slate-300 bg-white hover:bg-slate-100';
              if (isAnswered) {
                if (isCorrect) {
                  buttonClass = 'border-green-500 bg-green-100/50 text-green-800 ring-2 ring-green-500';
                } else if (isSelected && !isCorrect) {
                  buttonClass = 'border-red-500 bg-red-100/50 text-red-800 ring-2 ring-red-500';
                } else {
                    buttonClass = 'border-slate-300 bg-slate-50 text-slate-500';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered || timeLeft === 0}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${buttonClass} ${timeLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>

           {timeLeft === 0 && !isAnswered && (
               <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                   <p className="text-red-700 font-bold">Đã hết thời gian!</p>
                   <button 
                        onClick={() => setCurrentQuestionIndex(quizData?.questions.length || 0)} 
                        className="mt-2 text-sm text-red-600 hover:underline"
                   >
                       Kết thúc bài luyện tập
                   </button>
               </div>
          )}
        </div>
      );
    }
    return null;
  };
  
  const renderFeedback = () => {
      if (!isAnswered || !currentQuestion) return null;
      
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      
      return (
        <div className={`fixed bottom-0 left-0 right-0 p-4 sm:p-6 z-10 animate-slide-in-bottom`}>
            <div className={`max-w-4xl mx-auto p-5 rounded-xl shadow-2xl border-t-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <div className="flex items-start">
                    <div className={`flex-shrink-0 mr-4 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {isCorrect ? <CheckCircleIcon className="h-7 w-7" /> : <XCircleIcon className="h-7 w-7" />}
                    </div>
                    <div className="flex-1">
                        <h4 className={`text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                           {isCorrect ? 'Chính xác!' : 'Cố gắng lên nhé!'}
                        </h4>
                        <p className="mt-1 text-slate-700">{currentQuestion.explanation}</p>
                    </div>
                    <button 
                        onClick={handleNextQuestion}
                        className={`ml-6 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                       {currentQuestionIndex === (quizData?.questions.length || 0) - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                    </button>
                </div>
            </div>
        </div>
      );
  }

  return (
     <div className="container mx-auto max-w-4xl relative">
      <div className="flex items-center text-sm text-slate-500 mb-4 flex-wrap">
        <HomeIcon className="h-5 w-5 mr-2" />
        <button onClick={onBackToSelfStudy} className="hover:underline">Tự học</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <button onClick={onBackToSubjects} className="hover:underline">Tự luyện</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <button onClick={onBack} className="hover:underline">{subject.name} - {grade.name}</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <span className="font-semibold text-slate-700 truncate">{lesson.title}</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 min-h-[60vh] flex flex-col justify-center">
        {renderContent()}
      </div>
      {renderFeedback()}
    </div>
  );
};

export default PracticeView;
