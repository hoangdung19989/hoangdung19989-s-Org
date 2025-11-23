
import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { Subject, Module, Course, Grade, ChatMessage, PhetSimulation, LabCategory, TestSubject, TestGrade, SelfPracticeSubject, PracticeLesson, Quiz, MockExamSubject, LectureSubject, TestType } from './types';
import AITutorView from './components/AITutorView';
import Sidebar from './components/Sidebar';
import ModuleDashboard from './components/Dashboard';
import SubjectDashboard from './components/SubjectDashboard';
import LectureSubjectSelection from './components/LectureSubjectSelection';
import GradeSelectionView from './components/GradeSelectionView';
import LectureView from './components/LectureView';
import LaboratoryParentCategorySelection from './components/LaboratoryParentCategorySelection';
import LaboratorySubCategorySelection from './components/LaboratorySubCategorySelection';
import SimulationListView from './components/SimulationListView';
import SimulationView from './components/SimulationView';
import TestSubjectSelectionView from './components/TestSubjectSelectionView';
import TestGradeSelectionView from './components/TestGradeSelectionView';
import TestTypeSelectionView from './components/TestTypeSelectionView';
import QuizView from './components/QuizView';
import HomePage from './components/HomePage';
import SelfPracticeSubjectSelection from './components/SelfPracticeSubjectSelection';
import SelfPracticeGradeSelectionView from './components/SelfPracticeGradeSelectionView';
import PracticeLessonSelectionView from './components/PracticeLessonSelectionView';
import PracticeView from './components/PracticeView';
import MockExamSubjectSelectionView from './components/MockExamSubjectSelectionView';
import MockExamGradeSelectionView from './components/MockExamGradeSelectionView';
import MockExamView from './components/MockExamView';
import AboutModal from './components/AboutModal';
import { SUBJECTS, GRADES_BY_SUBJECT, ALL_COURSES, PHET_SIMULATIONS, LAB_CATEGORIES, TEST_SUBJECTS, MOCK_EXAM_SUBJECTS, TEST_GRADES, PRACTICE_LESSONS_DATA, TEST_TYPES } from './constants';
import { getGenericTutorResponse, generatePracticeExercises } from './services/geminiService';
import { RobotIcon, PaperAirplaneIcon, XMarkIcon } from './components/icons';


export type View = 
  | 'home'
  | 'self-study' 
  | 'self-practice-subjects'
  | 'self-practice-grades'
  | 'self-practice-lessons'
  | 'practice-view'
  | 'lecture-subjects' 
  | 'lecture-grades' 
  | 'lecture-video' 
  | 'ai-subjects' 
  | 'ai-tutor'
  | 'laboratory-categories'
  | 'laboratory-subcategories'
  | 'laboratory-list'
  | 'laboratory-simulation'
  | 'test-subjects'
  | 'test-grades'
  | 'test-types'
  | 'quiz-view'
  | 'mock-exam-subjects'
  | 'mock-exam-grades'
  | 'mock-exam-view';

// --- Floating AI Button Component ---
const FloatingAIButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 h-16 w-16 bg-brand-blue-dark rounded-full text-white flex items-center justify-center shadow-lg hover:bg-brand-blue transition-colors focus:outline-none focus:ring-4 focus:ring-sky-300 animate-pulse-float"
      aria-label="Mở Trợ lý AI"
    >
      <RobotIcon className="h-8 w-8" />
    </button>
  );
};

// --- AI Chat Popup Component ---
const AIChatPopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        setMessages([{
            role: 'model',
            content: `Xin chào! Tôi là trợ lý AI của OnLuyen. Tôi có thể giúp gì cho bạn?`
        }]);
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGenericTutorResponse(currentInput);
      const modelMessage: ChatMessage = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
       const modelMessage: ChatMessage = { role: 'model', content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại." };
      setMessages((prev) => [...prev, modelMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] flex flex-col bg-white rounded-xl shadow-2xl border border-slate-200 transition-all duration-300 ease-in-out transform origin-bottom-right animate-scale-in">
      <div className="flex items-center p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex-shrink-0">
        <RobotIcon className="h-6 w-6 text-brand-blue-dark" />
        <h2 className="ml-3 text-lg font-bold text-slate-800">Trợ lý AI OnLuyen</h2>
        <button
          onClick={onClose}
          className="ml-auto p-2 rounded-full hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Đóng Trợ lý AI"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl shadow-sm ${
                msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-lg px-4 py-3 rounded-2xl bg-white text-slate-700 flex items-center space-x-2 shadow-sm border border-slate-200">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200 bg-white rounded-b-xl flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 sm:space-x-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi bất cứ điều gì..."
            className="flex-1 w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-sky-600 rounded-full text-white hover:bg-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500"
            aria-label="Gửi"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};


// --- Main App Component ---
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLectureSubject, setSelectedLectureSubject] = useState<LectureSubject | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLabCategory, setSelectedLabCategory] = useState<LabCategory | null>(null);
  const [selectedLabSubCategory, setSelectedLabSubCategory] = useState<LabCategory | null>(null);
  const [selectedSimulation, setSelectedSimulation] = useState<PhetSimulation | null>(null);
  const [selectedTestSubject, setSelectedTestSubject] = useState<TestSubject | null>(null);
  const [selectedTestGrade, setSelectedTestGrade] = useState<TestGrade | null>(null);
  const [selectedTestType, setSelectedTestType] = useState<TestType | null>(null);
  const [selectedMockExamSubject, setSelectedMockExamSubject] = useState<MockExamSubject | null>(null);
  const [selectedMockExamGrade, setSelectedMockExamGrade] = useState<TestGrade | null>(null);
  const [selectedSelfPracticeSubject, setSelectedSelfPracticeSubject] = useState<SelfPracticeSubject | null>(null);
  const [selectedSelfPracticeGrade, setSelectedSelfPracticeGrade] = useState<TestGrade | null>(null);
  const [selectedPracticeLesson, setSelectedPracticeLesson] = useState<PracticeLesson | null>(null);
  const [practiceQuiz, setPracticeQuiz] = useState<Quiz | null>(null);
  const [isPracticeQuizLoading, setIsPracticeQuizLoading] = useState<boolean>(false);
  const [practiceQuizError, setPracticeQuizError] = useState<string | null>(null);


  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // --- Navigation Handlers ---

  const handleBackToDashboard = () => setCurrentView('self-study');

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
    if (module.title === 'Bài giảng') {
      setCurrentView('lecture-subjects');
    } else if (module.title === 'Phòng thí nghiệm') {
      setCurrentView('laboratory-categories');
    } else if (module.title === 'Kiểm tra') {
        setCurrentView('test-subjects');
    } else if (module.title === 'Thi thử') {
        setCurrentView('mock-exam-subjects');
    } else if (module.title === 'Tự luyện') {
        setCurrentView('self-practice-subjects');
    } else {
      alert(`Chức năng "${module.title}" đang được phát triển.`);
    }
  };

  // --- AI Tutor Flow ---
  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentView('ai-tutor');
  };
  const handleBackToSubjectDashboard = () => setCurrentView('ai-subjects');
  
  // --- Lecture Flow ---
  const handleSelectLectureSubject = (subject: LectureSubject) => {
    setSelectedLectureSubject(subject);
    setCurrentView('lecture-grades');
  };
  const handleSelectGrade = (grade: Grade) => {
    setSelectedGrade(grade);
    const courseData = ALL_COURSES[grade.courseId];
    if (courseData) {
      setSelectedCourse(courseData);
      setCurrentView('lecture-video');
    } else {
      alert(`Nội dung cho ${grade.name} đang được cập nhật.`);
    }
  };
  const handleBackToLectureSubjects = () => setCurrentView('lecture-subjects');
  const handleExitLecture = () => setCurrentView('lecture-grades');
  
  // --- Laboratory Flow ---
  const handleSelectLabCategory = (category: LabCategory) => {
    setSelectedLabCategory(category);
    setCurrentView('laboratory-subcategories');
  };
  const handleBackToLabCategories = () => setCurrentView('laboratory-categories');
  const handleSelectLabSubCategory = (subcategory: LabCategory) => {
    setSelectedLabSubCategory(subcategory);
    setCurrentView('laboratory-list');
  };
  const handleSelectSimulation = (simulation: PhetSimulation) => {
    setSelectedSimulation(simulation);
    setCurrentView('laboratory-simulation');
  };
  const handleBackToSimulationList = () => setCurrentView('laboratory-list');
  
  // --- Test/Exam Flow ---
  const handleSelectTestSubject = (subject: TestSubject) => {
    setSelectedTestSubject(subject);
    setCurrentView('test-grades');
  };
  const handleBackToTestSubjects = () => setCurrentView('test-subjects');
  const handleSelectTestGrade = (grade: TestGrade) => {
    setSelectedTestGrade(grade);
    setCurrentView('test-types');
  };
  const handleBackToTestGrades = () => setCurrentView('test-grades');

  const handleSelectTestType = (type: TestType) => {
      setSelectedTestType(type);
      setCurrentView('quiz-view');
  }
  const handleBackToTestTypes = () => setCurrentView('test-types');


  // --- Mock Exam Flow ---
  const handleSelectMockExamSubject = (subject: MockExamSubject) => {
    setSelectedMockExamSubject(subject);
    setCurrentView('mock-exam-grades');
  };
  const handleBackToMockExamSubjects = () => setCurrentView('mock-exam-subjects');
  const handleSelectMockExamGrade = (grade: TestGrade) => {
    setSelectedMockExamGrade(grade);
    setCurrentView('mock-exam-view');
  };
  const handleBackToMockExamGrades = () => setCurrentView('mock-exam-grades');

  // --- Self Practice Flow ---
  const handleSelectSelfPracticeSubject = (subject: SelfPracticeSubject) => {
    setSelectedSelfPracticeSubject(subject);
    setCurrentView('self-practice-grades');
  };
  const handleBackToSelfPracticeSubjects = () => setCurrentView('self-practice-subjects');

  const handleSelectSelfPracticeGrade = (grade: TestGrade) => {
    setSelectedSelfPracticeGrade(grade);
    const lessonKey = `sp-${selectedSelfPracticeSubject?.id.replace('sp-', '')}-grade-${grade.id.replace('grade-', '')}`;
    if (PRACTICE_LESSONS_DATA[lessonKey]) {
      setCurrentView('self-practice-lessons');
    } else {
      alert(`Nội dung cho ${selectedSelfPracticeSubject?.name} ${grade.name} đang được phát triển.`);
    }
  };

  const fetchPracticeQuiz = useCallback(async (lesson: PracticeLesson) => {
    if (!selectedSelfPracticeSubject || !selectedSelfPracticeGrade) return;
    
    setIsPracticeQuizLoading(true);
    setPracticeQuizError(null);
    setPracticeQuiz(null);

    try {
        const quizData = await generatePracticeExercises(
            selectedSelfPracticeSubject.name,
            selectedSelfPracticeGrade.name,
            lesson.title
        );
        setPracticeQuiz(quizData);
    } catch (err) {
        setPracticeQuizError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.');
    } finally {
        setIsPracticeQuizLoading(false);
    }
  }, [selectedSelfPracticeSubject, selectedSelfPracticeGrade]);


  const handleSelectPracticeLesson = useCallback((lesson: PracticeLesson) => {
      setSelectedPracticeLesson(lesson);
      setCurrentView('practice-view');
      fetchPracticeQuiz(lesson);
  }, [fetchPracticeQuiz]);


  const handleBackToPracticeLessons = () => {
      setCurrentView('self-practice-lessons');
      // Clear old data
      setSelectedPracticeLesson(null);
      setPracticeQuiz(null);
      setPracticeQuizError(null);
  }

  const handleBackToSelfPracticeGrades = () => {
    setCurrentView('self-practice-grades');
  };


  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage setCurrentView={setCurrentView} />;
      case 'self-study':
        return <ModuleDashboard onSelectModule={handleSelectModule} />;
      case 'ai-subjects':
        return <SubjectDashboard subjects={SUBJECTS} onSelectSubject={handleSelectSubject} />;
      case 'ai-tutor':
        if (selectedSubject) {
          return <AITutorView subject={selectedSubject} onBack={handleBackToSubjectDashboard} />;
        }
        // Fallthrough to default case if no subject is selected
      case 'lecture-subjects':
        return <LectureSubjectSelection moduleTitle={selectedModule?.title || 'Bài giảng'} onBack={handleBackToDashboard} onSelectSubject={handleSelectLectureSubject} />;
      case 'lecture-grades':
        if (selectedLectureSubject) {
            const gradesForSubject = GRADES_BY_SUBJECT[selectedLectureSubject.id] || [];
            return <GradeSelectionView subject={selectedLectureSubject} grades={gradesForSubject} onSelectGrade={handleSelectGrade} onBackToSubjects={handleBackToLectureSubjects} onBackToSelfStudy={handleBackToDashboard} />;
        }
        // Fallthrough to default case
      case 'lecture-video':
        if (selectedCourse) {
          return <LectureView course={selectedCourse} onExit={handleExitLecture} />;
        }
        // Fallthrough to default case
      case 'laboratory-categories':
        return <LaboratoryParentCategorySelection categories={LAB_CATEGORIES} onSelectCategory={handleSelectLabCategory} onBack={handleBackToDashboard} />;
      case 'laboratory-subcategories':
        if (selectedLabCategory) {
          return <LaboratorySubCategorySelection parentCategory={selectedLabCategory} onSelectSubcategory={handleSelectLabSubCategory} onBack={handleBackToLabCategories} />;
        }
        // Fallthrough to default case
      case 'laboratory-list':
        if (selectedLabCategory && selectedLabSubCategory) {
          const simulations = PHET_SIMULATIONS[selectedLabSubCategory.id] || [];
          return <SimulationListView parentCategory={selectedLabCategory} subcategory={selectedLabSubCategory} simulations={simulations} onSelectSimulation={handleSelectSimulation} onBack={handleBackToLabCategories} />;
        }
        // Fallthrough to default case
      case 'laboratory-simulation':
        if (selectedSimulation && selectedLabCategory) {
          return <SimulationView simulation={selectedSimulation} subjectName={selectedLabCategory.name} onBack={handleBackToSimulationList} />;
        }
        // Fallthrough to default case
      case 'test-subjects':
        return <TestSubjectSelectionView moduleTitle={selectedModule?.title || "Kiểm tra"} subjects={TEST_SUBJECTS} onSelectSubject={handleSelectTestSubject} onBack={handleBackToDashboard}/>
      case 'test-grades':
        if (selectedTestSubject) {
            return <TestGradeSelectionView subject={selectedTestSubject} grades={TEST_GRADES} onSelectGrade={handleSelectTestGrade} onBackToSubjects={handleBackToTestSubjects} onBackToSelfStudy={handleBackToDashboard}/>
        }
      case 'test-types':
        if (selectedTestSubject && selectedTestGrade) {
            return <TestTypeSelectionView 
                subject={selectedTestSubject} 
                grade={selectedTestGrade} 
                testTypes={TEST_TYPES} 
                onSelectTestType={handleSelectTestType} 
                onBack={handleBackToTestGrades}
                onBackToSubjects={handleBackToTestSubjects}
                onBackToSelfStudy={handleBackToDashboard}
            />
        }
        // Fallthrough to default case
      case 'quiz-view':
          if (selectedTestSubject && selectedTestGrade && selectedTestType) {
              return <QuizView subject={selectedTestSubject} grade={selectedTestGrade} testType={selectedTestType} onBack={handleBackToTestTypes} onBackToSubjects={handleBackToTestSubjects}/>
          }
        // Fallthrough to default case
      case 'mock-exam-subjects':
        return <MockExamSubjectSelectionView moduleTitle={selectedModule?.title || "Thi thử"} subjects={MOCK_EXAM_SUBJECTS} onSelectSubject={handleSelectMockExamSubject} onBack={handleBackToDashboard}/>
      case 'mock-exam-grades':
        if (selectedMockExamSubject) {
            return <MockExamGradeSelectionView subject={selectedMockExamSubject} grades={TEST_GRADES} onSelectGrade={handleSelectMockExamGrade} onBackToSubjects={handleBackToMockExamSubjects} onBackToSelfStudy={handleBackToDashboard}/>
        }
        // Fallthrough to default case
      case 'mock-exam-view':
          if (selectedMockExamSubject && selectedMockExamGrade) {
              return <MockExamView subject={selectedMockExamSubject} grade={selectedMockExamGrade} onBack={handleBackToMockExamGrades} onBackToSubjects={handleBackToMockExamSubjects}/>
          }
        // Fallthrough to default case
      case 'self-practice-subjects':
        return <SelfPracticeSubjectSelection onBack={handleBackToDashboard} onSelectSubject={handleSelectSelfPracticeSubject} />;
      
      case 'self-practice-grades':
        if (selectedSelfPracticeSubject) {
            return <SelfPracticeGradeSelectionView 
                subject={selectedSelfPracticeSubject} 
                grades={TEST_GRADES} 
                onSelectGrade={handleSelectSelfPracticeGrade}
                onBackToSubjects={handleBackToSelfPracticeSubjects}
                onBackToSelfStudy={handleBackToDashboard}
            />
        }
        // Fallthrough to default case

      case 'self-practice-lessons':
        const practiceLessonKey = `sp-${selectedSelfPracticeSubject?.id.replace('sp-', '')}-grade-${selectedSelfPracticeGrade?.id.replace('grade-', '')}`;
        const practiceChapters = PRACTICE_LESSONS_DATA[practiceLessonKey];
        if (selectedSelfPracticeSubject && selectedSelfPracticeGrade && practiceChapters) {
          return (
            <PracticeLessonSelectionView
              subject={selectedSelfPracticeSubject}
              grade={selectedSelfPracticeGrade}
              chapters={practiceChapters}
              onBack={handleBackToSelfPracticeGrades}
              onSelectLesson={handleSelectPracticeLesson}
              onBackToSelfStudy={handleBackToDashboard}
              onBackToSubjects={handleBackToSelfPracticeSubjects}
            />
          );
        }
        // Fallback if data is missing
        return <ModuleDashboard onSelectModule={handleSelectModule} />;
    
    case 'practice-view':
        if (selectedSelfPracticeSubject && selectedSelfPracticeGrade && selectedPracticeLesson) {
            return (
                <PracticeView
                    subject={selectedSelfPracticeSubject}
                    grade={selectedSelfPracticeGrade}
                    lesson={selectedPracticeLesson}
                    quizData={practiceQuiz}
                    isLoading={isPracticeQuizLoading}
                    error={practiceQuizError}
                    onRetry={() => fetchPracticeQuiz(selectedPracticeLesson)}
                    onBack={handleBackToPracticeLessons}
                    onBackToSubjects={handleBackToSelfPracticeSubjects}
                    onBackToSelfStudy={handleBackToDashboard}
                />
            );
        }
        // Fallthrough to default case
    }
    // Default fallback
    return <HomePage setCurrentView={setCurrentView} />;
  };

  return (
    <div className="flex h-screen w-full font-sans">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className={`flex-1 p-6 sm:p-8 lg:p-10 ${currentView === 'lecture-video' ? 'p-0 sm:p-0 lg:p-0' : ''}`}>
          {renderView()}
        </main>
      </div>
      <FloatingAIButton onClick={() => setIsChatOpen(true)} />
      <AIChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </div>
  );
};

export default App;
