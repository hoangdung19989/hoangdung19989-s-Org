import React from 'react';
import type { PhetSimulation } from '../types';
import { ArrowLeftIcon } from './icons';

interface SimulationViewProps {
  simulation: PhetSimulation;
  subjectName: string;
  onBack: () => void;
}

const SimulationView: React.FC<SimulationViewProps> = ({ simulation, subjectName, onBack }) => {
  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="flex items-center p-4 border-b border-slate-200 flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div className="ml-4">
            <h2 className="text-xl font-bold text-slate-800">{simulation.title}</h2>
            <p className="text-sm text-slate-500">Môn: {subjectName}</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-100">
        <iframe
          key={simulation.id}
          src={simulation.embedUrl}
          title={simulation.title}
          className="w-full h-full border-0"
          allowFullScreen
          allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};

export default SimulationView;