
import React from 'react';
import { LECTURE_SUBJECTS } from '../constants';
import { HomeIcon, ChevronRightIcon } from './icons';
import type { LectureSubject } from '../types';

interface LectureSubjectSelectionProps {
    moduleTitle: string;
    onBack: () => void;
    onSelectSubject: (subject: LectureSubject) => void;
}

const LectureSubjectCard: React.FC<{ 
    subject: LectureSubject, 
    onClick: () => void 
}> = ({ subject, onClick }) => {
    const Icon = subject.icon;
    const color = subject.color || 'bg-gray-500';
    const bgIconColor = color.replace('bg-', 'bg-').replace('500', '100');
    const textIconColor = color.replace('bg-', 'text-').replace('500', '600');
    const borderColor = color.replace('bg-', 'border-').replace('500', '200');

    return (
        <button
            onClick={onClick}
            className={`group w-full flex flex-col sm:flex-row items-start sm:items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg border ${borderColor} transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-left`}
        >
            <div className={`flex-shrink-0 flex items-center justify-center h-20 w-20 p-4 rounded-2xl ${bgIconColor} mb-4 sm:mb-0`}>
                <Icon className={`h-full w-full ${textIconColor}`} />
            </div>
            
            <div className="flex-grow sm:ml-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-blue-dark transition-colors">{subject.name}</h3>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{subject.description}</p>
                    </div>
                </div>
                
                {subject.tags && subject.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {subject.tags.map((tag, idx) => (
                            <span 
                                key={idx} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-4 self-end sm:self-center">
                 <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <ChevronRightIcon className="h-5 w-5" />
                 </div>
            </div>
        </button>
    );
};


const LectureSubjectSelection: React.FC<LectureSubjectSelectionProps> = ({ moduleTitle, onBack, onSelectSubject }) => {
    return (
        <div className="container mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-slate-500 mb-8">
                <HomeIcon className="h-5 w-5 mr-2" />
                <button onClick={() => alert('Chức năng "Trang chủ" đang được phát triển.')} className="hover:underline">Trang chủ</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <button onClick={onBack} className="hover:underline">Tự học</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <span className="font-semibold text-slate-700">{moduleTitle}</span>
            </div>
            
            {/* Main Content */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-800 mb-3">
                    Thư viện Bài giảng
                </h1>
                <p className="text-slate-500 text-lg">
                    Chọn môn học để xem video bài giảng chi tiết và trực quan.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {LECTURE_SUBJECTS.map(subject => (
                    <LectureSubjectCard 
                        key={subject.id} 
                        subject={subject} 
                        onClick={() => onSelectSubject(subject)}
                    />
                ))}
            </div>
        </div>
    );
};

export default LectureSubjectSelection;
