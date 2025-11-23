import React from 'react';
import type { LabCategory } from '../types';
import { HomeIcon, ChevronRightIcon } from './icons';

interface CategoryCardProps {
  category: LabCategory;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const Icon = category.icon;
  const color = category.color || 'bg-gray-500';
  const bgIconColor = color.replace('bg-', 'bg-').replace('500', '100');
  const textIconColor = color.replace('bg-', 'text-').replace('500', '600');
  const borderColor = color.replace('bg-', 'border-').replace('500', '200');

  return (
    <button
      onClick={onClick}
      className={`group relative p-6 rounded-2xl text-left bg-white hover:bg-slate-50 border ${borderColor} transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-sky-500 shadow-sm hover:shadow-lg`}
    >
      <div className="flex items-start space-x-5">
        {Icon && (
          <div className={`flex-shrink-0 p-4 rounded-2xl ${bgIconColor}`}>
            <Icon className={`h-8 w-8 ${textIconColor}`} />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-blue-dark transition-colors">{category.name}</h3>
          <p className="mt-2 text-slate-500 text-sm leading-relaxed">{category.description}</p>
        </div>
        <div className="self-center">
             <ChevronRightIcon className="h-6 w-6 text-slate-300 group-hover:text-brand-blue transition-colors" />
        </div>
      </div>
    </button>
  );
};

interface LaboratoryParentCategorySelectionProps {
  categories: LabCategory[];
  onSelectCategory: (category: LabCategory) => void;
  onBack: () => void;
}

const LaboratoryParentCategorySelection: React.FC<LaboratoryParentCategorySelectionProps> = ({ categories, onSelectCategory, onBack }) => {
  return (
    <div className="container mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <HomeIcon className="h-5 w-5 mr-2" />
        <button onClick={() => alert('Chức năng "Trang chủ" đang được phát triển.')} className="hover:underline">Trang chủ</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <button onClick={onBack} className="hover:underline">Tự học</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <span className="font-semibold text-slate-700">Phòng thí nghiệm</span>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 mb-3">
          Phòng thí nghiệm ảo
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Chọn một lĩnh vực khoa học để bắt đầu khám phá các mô phỏng tương tác trực quan.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} onClick={() => onSelectCategory(category)} />
        ))}
      </div>
    </div>
  );
};

export default LaboratoryParentCategorySelection;