import React from 'react';
import type { Subject } from '../types';
import SubjectCard from './SubjectCard';

interface SubjectDashboardProps {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
}

const SubjectDashboard: React.FC<SubjectDashboardProps> = ({ subjects, onSelectSubject }) => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-2">
          AI Convo
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Chọn một môn học để bắt đầu ôn luyện cùng trợ lý AI.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onClick={() => onSelectSubject(subject)}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectDashboard;
