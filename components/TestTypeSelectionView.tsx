
import React from 'react';
import type { TestSubject, TestGrade, TestType } from '../types';
import { HomeIcon, ChevronRightIcon, ClockIcon } from './icons';

interface TestTypeSelectionViewProps {
    subject: TestSubject;
    grade: TestGrade;
    testTypes: TestType[];
    onSelectTestType: (type: TestType) => void;
    onBack: () => void;
    onBackToSubjects: () => void;
    onBackToSelfStudy: () => void;
}

const TestTypeCard: React.FC<{
    testType: TestType;
    onClick: () => void;
}> = ({ testType, onClick }) => {
    const color = testType.color || 'bg-gray-500';
    const bgIconColor = color.replace('bg-', 'bg-').replace('500', '100');
    const textIconColor = color.replace('bg-', 'text-').replace('500', '600');
    const borderColor = color.replace('bg-', 'border-').replace('500', '200');

    return (
        <button
            onClick={onClick}
            className={`group w-full flex flex-col sm:flex-row items-start sm:items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg border ${borderColor} transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-left`}
        >
            <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 p-3 rounded-2xl ${bgIconColor} mb-4 sm:mb-0`}>
                <ClockIcon className={`h-full w-full ${textIconColor}`} />
            </div>
            
            <div className="flex-grow sm:ml-6">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-blue-dark transition-colors">{testType.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{testType.description}</p>
                <div className="flex items-center mt-3 space-x-4 text-sm text-slate-600">
                    <span className="flex items-center bg-slate-100 px-2 py-1 rounded">
                        <span className="font-bold mr-1">Thời gian:</span> {testType.duration}
                    </span>
                    <span className="flex items-center bg-slate-100 px-2 py-1 rounded">
                        <span className="font-bold mr-1">Số câu:</span> ~{testType.questionCount} TN {testType.essayCount > 0 ? `+ ${testType.essayCount} TL` : ''}
                    </span>
                </div>
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-4 self-end sm:self-center">
                 <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <ChevronRightIcon className="h-5 w-5" />
                 </div>
            </div>
        </button>
    );
};

const TestTypeSelectionView: React.FC<TestTypeSelectionViewProps> = ({ 
    subject, 
    grade,
    testTypes,
    onSelectTestType, 
    onBack,
    onBackToSubjects, 
    onBackToSelfStudy,
}) => {
    return (
        <div className="container mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-slate-500 mb-6 flex-wrap">
                <HomeIcon className="h-5 w-5 mr-2" />
                <button onClick={() => alert('Chức năng "Trang chủ" đang được phát triển.')} className="hover:underline">Trang chủ</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <button onClick={onBackToSelfStudy} className="hover:underline">Tự học</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <button onClick={onBackToSubjects} className="hover:underline">Kiểm tra</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <button onClick={onBack} className="hover:underline">{subject.name}</button>
                <ChevronRightIcon className="h-4 w-4 mx-1" />
                <span className="font-semibold text-slate-700">{grade.name}</span>
            </div>

            {/* Main Content */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">
                    Chọn loại bài kiểm tra
                </h2>
                <p className="text-slate-500 text-lg">
                    Bạn muốn làm bài kiểm tra trong bao lâu?
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {testTypes.map(type => (
                    <TestTypeCard
                        key={type.id}
                        testType={type}
                        onClick={() => onSelectTestType(type)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestTypeSelectionView;
