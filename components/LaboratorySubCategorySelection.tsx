import React from 'react';
import type { LabCategory } from '../types';
import { HomeIcon, ChevronRightIcon } from './icons';

interface LaboratorySubCategorySelectionProps {
  parentCategory: LabCategory;
  onSelectSubcategory: (subcategory: LabCategory) => void;
  onBack: () => void;
}

const SubCategoryCard: React.FC<{ subcategory: LabCategory; onClick: () => void; color: string; }> = ({ subcategory, onClick, color }) => {
  const borderColor = color.replace('bg-', 'border-').replace('500', '200');
  const hoverBgColor = color.replace('bg-', 'bg-').replace('500', '50');

  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-5 rounded-xl bg-white border ${borderColor} hover:${hoverBgColor} transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 shadow-sm hover:shadow-md flex items-center`}
    >
      <div className={`w-2 h-10 rounded-full ${color} mr-5`}></div>
      <span className="font-bold text-lg text-slate-700 group-hover:text-slate-900">{subcategory.name}</span>
      <ChevronRightIcon className="h-5 w-5 text-slate-400 ml-auto group-hover:text-slate-600 transition-colors" />
    </button>
  );
};

const LaboratorySubCategorySelection: React.FC<LaboratorySubCategorySelectionProps> = ({ parentCategory, onSelectSubcategory, onBack }) => {
  const Icon = parentCategory.icon;
  const color = parentCategory.color || 'bg-gray-500';
  const bgIconColor = color.replace('bg-', 'bg-').replace('500', '100');
  const textIconColor = color.replace('bg-', 'text-').replace('500', '600');

  return (
    <div className="container mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <HomeIcon className="h-5 w-5 mr-2" />
        <button onClick={() => alert('Chức năng "Trang chủ" đang được phát triển.')} className="hover:underline">Trang chủ</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <button onClick={onBack} className="hover:underline">Phòng thí nghiệm</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <span className="font-semibold text-slate-700">{parentCategory.name}</span>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-5 mb-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
            {Icon && (
                <div className={`p-4 rounded-2xl ${bgIconColor}`}>
                    <Icon className={`h-10 w-10 ${textIconColor}`} />
                </div>
            )}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
                {parentCategory.name}
                </h1>
                <p className="text-lg text-slate-500 mt-1">Chọn một chuyên đề bên dưới để vào phòng thí nghiệm.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {parentCategory.subcategories && parentCategory.subcategories.length > 0 ? (
            parentCategory.subcategories.map(sub => (
              <SubCategoryCard 
                key={sub.id} 
                subcategory={sub} 
                onClick={() => onSelectSubcategory(sub)}
                color={color}
              />
            ))
          ) : (
            <p className="sm:col-span-2 text-center text-slate-500 italic">Chưa có chuyên đề nào cho môn học này.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaboratorySubCategorySelection;