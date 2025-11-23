
import React from 'react';
import { MODULES } from '../constants';
import ModuleCard from './ModuleCard';
import { HomeIcon, ChevronRightIcon } from './icons';
import type { Module } from '../types';

interface ModuleDashboardProps {
  onSelectModule: (module: Module) => void;
}

const ModuleDashboard: React.FC<ModuleDashboardProps> = ({ onSelectModule }) => {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <HomeIcon className="h-5 w-5 mr-2" />
        <button onClick={() => alert('Chức năng "Trang chủ" đang được phát triển.')} className="hover:underline">Trang chủ</button>
        <ChevronRightIcon className="h-4 w-4 mx-1" />
        <span className="font-semibold text-slate-700">Tự học</span>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
            Trung tâm Tự học
        </h1>
        <p className="text-slate-500 text-lg">
            Chọn một tính năng bên dưới để bắt đầu hành trình chinh phục kiến thức.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MODULES.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onClick={() => onSelectModule(module)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleDashboard;
