import React from 'react';
import type { Subject, Grade } from '../types';
import { HomeIcon, ChevronRightIcon } from './icons';

interface GradeSelectionViewProps {
    subject: Pick<Subject, 'id' | 'name' | 'icon'>;
    grades: Grade[];
    onSelectGrade: (grade: Grade) => void;
    onBackToSubjects: () => void; // Back to subject selection
    onBackToSelfStudy: () => void; // Back to module dashboard
}

const GradeSelectionView: React.FC<GradeSelectionViewProps> = ({ subject, grades, onSelectGrade, onBackToSubjects, onBackToSelfStudy }) => {
    // Note: The grades array in constants.tsx has full names like "Toán Lớp 6". We just need the number part for the button.
    const getShortGradeName = (fullName: string) => {
        const parts = fullName.split(' ');
        if (parts.length >= 2) {
            return `${parts[parts.length - 2]} ${parts[parts.length - 1]}`;
        }
        return fullName;
    }
    
    return (
        <div className="container mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-slate-500 mb-6">
                <HomeIcon className="h-5 w-5 mr-2" />
                <button onClick={() => alert('Chức năng "Trang chủ" đang được phát triển.')} className="hover:underline">Trang chủ</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <button onClick={onBackToSelfStudy} className="hover:underline">Tự học</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <button onClick={onBackToSubjects} className="hover:underline">Bài giảng</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <span className="font-semibold text-slate-700">{subject.name}</span>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center mt-16 md:mt-24">
                 <h2 className="text-2xl font-bold text-slate-800 mb-12">
                    Chọn lớp cho môn {subject.name}
                </h2>
                <div className="flex bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    {grades.map((grade, index) => (
                        <button
                            key={grade.id}
                            onClick={() => onSelectGrade(grade)}
                            className={`px-10 py-4 text-lg font-semibold text-slate-700 hover:bg-sky-50 transition-colors focus:outline-none focus:bg-sky-100 focus:ring-2 focus:ring-sky-500 z-10
                            ${index < grades.length - 1 ? 'border-r border-slate-200' : ''}`}
                        >
                            {getShortGradeName(grade.name)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GradeSelectionView;