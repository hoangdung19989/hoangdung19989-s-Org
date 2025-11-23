
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { TestSubject, TestGrade, Quiz, TestType } from '../types';
import { generateQuiz } from '../services/geminiService';
import { ArrowLeftIcon, HomeIcon, ChevronRightIcon, CheckCircleIcon, XCircleIcon, PencilSquareIcon, ClockIcon } from './icons';
import { playAudioFromBase64 } from '../utils/audio';
import { CORRECT_ANSWER_SOUND, INCORRECT_ANSWER_SOUND } from '../constants';

interface QuizViewProps {
  subject: TestSubject;
  grade: TestGrade;
  testType: TestType;
  onBack: () => void; // Back to Test Type selection
  onBackToSubjects: () => void;
}

const LoadingSpinner: React.FC<{ name: string, type: string }> = ({ name, type }) => (
  <div className="flex flex-col items-center justify-center text-center p-8">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin mb-4"></div>
    <p className="text-slate-600 font-semibold">Đang tạo bài {type} môn {name}...</p>
    <p className="text-slate-500 text-sm">AI (Gemini) đang soạn câu hỏi trắc nghiệm và tự luận phù hợp.</p>
  </div>
);

const EssaySection: React.FC<{ questions: NonNullable<Quiz['essayQuestions']> }> = ({ questions }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleAnswer = (index: number) => {
        setOpenIndexes(prev => 
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    return (
        <div className="mt-8 text-left">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <PencilSquareIcon className="h-6 w-6 mr-2 text-sky-600"/>
                Phần Tự Luận
            </h3>
            <div className="space-y-6">
                {questions.map((item, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <p className="font-semibold text-slate-800 mb-3 text-lg">Câu {index + 1}:</p>
                        <p className="text-slate-700 mb-4 whitespace-pre-wrap">{item.question}</p>
                        
                        <button 
                            onClick={() => toggleAnswer(index)}
                            className="text-sm font-semibold text-sky-600 hover:text-sky-800 focus:outline-none underline decoration-dotted"
                        >
                            {openIndexes.includes(index) ? 'Ẩn hướng dẫn giải' : 'Xem hướng dẫn giải'}
                        </button>

                        {openIndexes.includes(index) && (
                            <div className="mt-4 pt-4 border-t border-slate-200 animate-slide-in-bottom">
                                <p className="text-sm font-bold text-slate-500 mb-1">Hướng dẫn / Đáp án mẫu:</p>
                                <div className="text-slate-700 bg-white p-4 rounded-lg border border-slate-100 whitespace-pre-wrap">
                                    {item.sampleAnswer}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


const QuizView: React.FC<QuizViewProps> = ({ subject, grade, testType, onBack, onBackToSubjects }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const fetchQuiz = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setQuiz(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsTimerRunning(false);

    try {
      const quizData = await generateQuiz(subject.name, grade.name, testType);
      setQuiz(quizData);
      
      // Parse time limit from quiz data or fallback to testType default
      const timeString = quizData.timeLimit || testType.duration;
      // Extract the first number found in the string
      const minutes = parseInt(timeString.match(/\d+/)?.[0] || '15'); 
      setTimeLeft(minutes * 60);
      setIsTimerRunning(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.');
    } finally {
      setIsLoading(false);
    }
  }, [subject, grade, testType]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  // Timer Effect
  useEffect(() => {
    // FIX: Use ReturnType<typeof setInterval> for browser compatibility instead of NodeJS.Timeout
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && timeLeft > 0) {
        interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
        setIsTimerRunning(false);
        // Optionally auto-submit or show alert
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  const handleAnswerSelect = (option: string) => {
    if (isAnswered || !isTimerRunning) return; // Disable answering if time is up
    
    setIsAnswered(true);
    setSelectedAnswer(option);
    
    if (option === quiz?.questions[currentQuestionIndex].correctAnswer) {
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
  
  const currentQuestion = quiz?.questions[currentQuestionIndex];
  const isQuizFinished = quiz && currentQuestionIndex >= quiz.questions.length;

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner name={`${subject.name} ${grade.name}`} type={testType.name} />;
    }
    if (error) {
      return (
        <div className="text-center text-red-600 bg-red-50 p-6 rounded-lg">
          <p className="font-bold text-lg">Lỗi!</p>
          <p className="mt-2">{error}</p>
           <button onClick={fetchQuiz} className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
            Thử lại
          </button>
        </div>
      );
    }
    if (isQuizFinished) {
      return (
        <div className="text-center p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Hoàn thành bài kiểm tra!</h3>
          <p className="text-lg text-slate-600 mb-6">
            Bạn đã trả lời đúng <span className="font-bold text-sky-600">{score}</span> / {quiz.questions.length} câu trắc nghiệm.
          </p>

          {/* Essay Section */}
          {quiz.essayQuestions && quiz.essayQuestions.length > 0 && (
              <>
                <hr className="border-slate-200 my-6" />
                <EssaySection questions={quiz.essayQuestions} />
              </>
          )}

          <div className="mt-10 flex justify-center space-x-4">
            <button onClick={onBack} className="px-5 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300">
              Chọn loại đề khác
            </button>
            <button onClick={fetchQuiz} className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
              Làm đề tương tự
            </button>
          </div>
        </div>
      );
    }
    if (currentQuestion) {
      // Calculate progress percentage
      const progress = ((currentQuestionIndex + 1) / (quiz?.questions.length || 1)) * 100;
      
      // Warning color if time is low (< 1 minute for short tests, or < 5 mins for longer)
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
                <div className="flex justify-between items-center text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                    <span>Thời gian: {quiz?.timeLimit || testType.duration}</span>
                    <span>{quiz?.title || testType.name}</span>
                </div>
                <p className="text-sm text-slate-500">Nguồn: <span className="font-semibold text-slate-700">{quiz?.sourceSchool}</span></p>
            </div>
            
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-slate-500">Câu hỏi {currentQuestionIndex + 1} / {quiz?.questions.length}</p>
            <p className="text-sm font-bold text-slate-700">Điểm: {score}</p>
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
             <div className="bg-sky-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
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
                   <p className="text-red-700 font-bold">Đã hết thời gian làm bài!</p>
                   <button 
                        onClick={() => setCurrentQuestionIndex(quiz?.questions.length || 0)} // Skip to end
                        className="mt-2 text-sm text-red-600 hover:underline"
                   >
                       Xem kết quả
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
                       {currentQuestionIndex === (quiz?.questions.length || 0) - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
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
        <button onClick={() => alert('Chức năng "Trang chủ" đang được phát triển.')} className="hover:underline">Trang chủ</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <button onClick={onBackToSubjects} className="hover:underline">Kiểm tra</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <span className="text-slate-500">{subject.name}</span>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <button onClick={onBack} className="hover:underline">{grade.name}</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <span className="font-semibold text-slate-700">{testType.name}</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 min-h-[60vh] flex flex-col justify-center">
        {renderContent()}
      </div>
      {renderFeedback()}
    </div>
  );
};

export default QuizView;
