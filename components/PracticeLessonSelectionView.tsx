import React from 'react';
import type { SelfPracticeSubject, TestGrade, PracticeChapter, PracticeLesson } from '../types';
import { HomeIcon, ChevronRightIcon, BookmarkIcon } from './icons';

interface PracticeLessonSelectionViewProps {
  subject: SelfPracticeSubject;
  grade: TestGrade;
  chapters: PracticeChapter[];
  onBack: () => void; // back to grade selection
  onSelectLesson: (lesson: PracticeLesson) => void;
  onBackToSelfStudy: () => void;
  onBackToSubjects: () => void; // back to subject selection
}

const PracticeLessonSelectionView: React.FC<PracticeLessonSelectionViewProps> = ({
  subject,
  grade,
  chapters,
  onBack,
  onSelectLesson,
  onBackToSelfStudy,
  onBackToSubjects,
}) => {
  return (
    <div className="container mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 mb-6 flex-wrap">
        <HomeIcon className="h-5 w-5 mr-2" />
        <button onClick={onBackToSelfStudy} className="hover:underline">Tự học</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <button onClick={onBackToSubjects} className="hover:underline">Tự luyện</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <button onClick={onBack} className="hover:underline">{subject.name}</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <span className="font-semibold text-slate-700">{grade.name}</span>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Luyện tập {subject.name} {grade.name}
        </h1>
        <p className="text-slate-500 mt-2">Sách Kết nối tri thức với cuộc sống. Chọn một bài để bắt đầu.</p>
      </div>

      <div className="space-y-8">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-white p-6 rounded-xl shadow-md border border-slate-200/80">
            <h2 className="text-xl font-bold text-brand-blue-dark mb-4 border-b pb-3">{chapter.title}</h2>
            <ul className="space-y-2">
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <button
                    onClick={() => onSelectLesson(lesson)}
                    className="w-full text-left flex items-center p-3 rounded-lg hover:bg-sky-50 transition-colors group"
                  >
                    <BookmarkIcon className="h-5 w-5 mr-3 text-sky-400 flex-shrink-0" />
                    <span className="text-slate-700 group-hover:text-slate-900">{lesson.title}</span>
                    <ChevronRightIcon className="h-5 w-5 ml-auto text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-1" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeLessonSelectionView;
