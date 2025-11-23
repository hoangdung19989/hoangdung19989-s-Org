import React, { useState } from 'react';
import type { Course, Lesson } from '../types';
import { PlayCircleIcon, DocumentTextIcon, XMarkIcon, ChevronLeftIcon } from './icons';

interface LessonSidebarProps {
    course: Course;
    activeLessonId: string;
    onSelectLesson: (lesson: Lesson) => void;
    onExit: () => void;
}

const getIconForLesson = (type: Lesson['type']) => {
    switch (type) {
        case 'video':
            return <PlayCircleIcon className="h-5 w-5 text-slate-500 group-hover:text-sky-600" />;
        case 'text':
            return <DocumentTextIcon className="h-5 w-5 text-slate-500 group-hover:text-sky-600" />;
        case 'quiz':
            return <DocumentTextIcon className="h-5 w-5 text-slate-500 group-hover:text-sky-600" />;
        default:
            return null;
    }
};

const LessonSidebar: React.FC<LessonSidebarProps> = ({ course, activeLessonId, onSelectLesson, onExit }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside
            className={`
                relative w-96 bg-white border-l border-slate-200 flex flex-col shadow-lg
                flex-shrink-0 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-48px)]'}
            `}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Handle with icon */}
            <div className="absolute top-0 left-0 w-12 h-full flex items-center justify-center pointer-events-none">
                <div className="h-8 w-8 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-full border border-slate-200/80">
                    <ChevronLeftIcon
                        className={`
                            h-5 w-5 text-slate-600 transition-transform duration-300
                            ${isOpen ? '' : 'rotate-180'}
                        `}
                    />
                </div>
            </div>

            {/* Content Wrapper */}
            <div
                className={`
                    w-full h-full flex flex-col transition-opacity
                    ${isOpen ? 'opacity-100 duration-200 delay-100' : 'opacity-0 duration-100'}
                `}
            >
                {/* Header */}
                <div className="pl-12 pr-4 pt-4 pb-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="p-4 rounded-lg bg-sky-50 border border-sky-200 flex-1">
                        <div className="font-bold text-brand-blue-dark">{course.subjectName} - Lớp {course.gradeLevel}</div>
                        <div className="text-sm text-slate-600">{course.title}</div>
                    </div>
                    <button
                        onClick={onExit}
                        className="ml-4 flex items-center justify-center h-10 w-10 flex-shrink-0 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-full transition-colors"
                        aria-label="Thoát"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Lesson List */}
                <div className="flex-1 overflow-y-auto pl-12 pr-4 pt-4 pb-4">
                    <nav>
                        <ul>
                            {course.chapters.map((chapter) => (
                                <li key={chapter.id} className="mb-6 last:mb-0">
                                    <h3 className="font-bold text-slate-800 mb-3 px-2">
                                        {chapter.title}
                                    </h3>
                                    <ul className="relative">
                                        {/* Timeline */}
                                        <div className="absolute left-3.5 top-2.5 bottom-2.5 w-0.5 bg-slate-200"></div>

                                        {chapter.lessons.map(lesson => {
                                            const isActive = lesson.id === activeLessonId;
                                            return (
                                                <li key={lesson.id} className="mb-1">
                                                    <button
                                                        onClick={() => onSelectLesson(lesson)}
                                                        className={`w-full group text-left flex items-start py-2 px-2 rounded-lg transition-colors ${
                                                            isActive
                                                                ? 'bg-sky-100/80'
                                                                : 'hover:bg-slate-100'
                                                        }`}
                                                    >
                                                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center h-6 w-6 mr-2">
                                                            <div className={`h-2.5 w-2.5 rounded-full transition-colors ring-4 ${isActive ? 'bg-sky-500 ring-white' : 'bg-slate-300 ring-white group-hover:bg-slate-400'}`}></div>
                                                        </div>

                                                        <div className="flex items-center flex-1">
                                                            <div className="flex-shrink-0 mr-2.5">
                                                                {getIconForLesson(lesson.type)}
                                                            </div>
                                                            <span className={`text-sm ${isActive ? 'font-semibold text-sky-800' : 'text-slate-700 group-hover:text-slate-800'}`}>
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default LessonSidebar;