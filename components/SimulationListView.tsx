import React from 'react';
import type { LabCategory, PhetSimulation } from '../types';
import { HomeIcon, ChevronRightIcon, LightBulbIcon, PlayCircleIcon } from './icons';

interface SimulationCardProps {
  simulation: PhetSimulation;
  onClick: () => void;
}

const SimulationCard: React.FC<SimulationCardProps> = ({ simulation, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 hover:border-sky-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-start space-x-5"
    >
      <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-2xl bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors">
          <PlayCircleIcon className="h-8 w-8" />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{simulation.title}</h3>
        <p className="mt-2 text-slate-500 text-sm leading-relaxed line-clamp-2">{simulation.description}</p>
        <div className="mt-3 flex items-center text-xs font-medium text-sky-500 uppercase tracking-wide">
            Bấm để chạy mô phỏng <ChevronRightIcon className="h-3 w-3 ml-1" />
        </div>
      </div>
    </button>
  );
};


interface SimulationListViewProps {
  parentCategory: LabCategory;
  subcategory: LabCategory;
  simulations: PhetSimulation[];
  onSelectSimulation: (simulation: PhetSimulation) => void;
  onBack: () => void;
}

const SimulationListView: React.FC<SimulationListViewProps> = ({ parentCategory, subcategory, simulations, onSelectSimulation, onBack }) => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center text-sm text-slate-500 mb-6 flex-wrap">
        <HomeIcon className="h-5 w-5 mr-2 flex-shrink-0" />
        <span className="cursor-pointer hover:underline" onClick={() => alert('Chức năng "Trang chủ" đang được phát triển.')}>Trang chủ</span>
        <ChevronRightIcon className="h-4 w-4 mx-1 flex-shrink-0" />
        <span className="cursor-pointer hover:underline" onClick={onBack}>Phòng thí nghiệm</span>
        <ChevronRightIcon className="h-4 w-4 mx-1 flex-shrink-0" />
        <span className="font-semibold text-slate-700 truncate">{subcategory.name}</span>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 mb-3">
          {subcategory.name}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Các mô phỏng tương tác giúp bạn hiểu sâu hơn về các hiện tượng khoa học.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {simulations.length > 0 ? (
          simulations.map((sim) => (
            <SimulationCard key={sim.id} simulation={sim} onClick={() => onSelectSimulation(sim)} />
          ))
        ) : (
          <div className="md:col-span-2 text-center p-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
                <LightBulbIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Đang cập nhật</h3>
            <p className="mt-2 text-slate-500">Hiện chưa có mô phỏng nào cho chủ đề này. Chúng tôi đang tích cực làm việc để bổ sung sớm nhất.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationListView;