import React from 'react';
import type { Subject } from '../types';
import { ChevronRightIcon } from './icons';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  const Icon = subject.icon;
  
  // Dynamic color generation based on the subject's base color class
  // Assuming subject.color is like 'bg-sky-500'
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
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-blue-dark transition-colors">
              {subject.name}
            </h3>
            <p className="text-slate-500 text-sm mt-2 line-clamp-2">
              {subject.description}
            </p>
          </div>
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

export default SubjectCard;