import React, { useState } from 'react';
import type { View } from '../App';
import { 
    HomeIcon, 
    PencilSquareIcon, 
    LightBulbIcon, 
    QuestionMarkCircleIcon,
    ChatBubbleBottomCenterTextIcon,
    ChevronRightIcon,
} from './icons';


interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onOpenAboutModal: () => void;
}

const NavLink: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, isExpanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-amber-400/90 text-slate-900 shadow-inner'
          : 'text-slate-200 hover:bg-brand-blue'
      } ${!isExpanded ? 'justify-center' : ''}`}
    >
      <Icon className="h-6 w-6 flex-shrink-0" />
      <span
        className={`flex-1 text-left whitespace-nowrap transition-all duration-200 overflow-hidden ${
          isExpanded ? 'w-auto ml-4 opacity-100' : 'w-0 ml-0 opacity-0'
        }`}
      >
        {label}
      </span>
      {isActive && isExpanded && <ChevronRightIcon className="h-4 w-4 ml-auto" />}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onOpenAboutModal }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isSelfStudyActive = currentView === 'self-study' 
        || currentView.startsWith('lecture') 
        || currentView.startsWith('laboratory')
        || currentView.startsWith('test')
        || currentView.startsWith('quiz')
        || currentView.startsWith('mock-exam')
        || currentView.startsWith('self-practice');

    const isAiConvoActive = currentView === 'ai-subjects' || currentView === 'ai-tutor';

  return (
    <aside 
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`bg-brand-blue-dark text-white flex flex-col p-3 shadow-2xl z-20 transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}
    >
        <div className={`flex items-center mb-8 pt-1 ${isExpanded ? 'pl-1' : 'justify-center'}`}>
            <div className="bg-white rounded-full p-1.5 mr-3 flex-shrink-0">
                 <svg className="h-8 w-8 text-brand-blue-dark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" stroke="#2A3F7A" strokeWidth="4" fill="none" />
                    <text x="50" y="60" fontFamily="Arial, sans-serif" fontSize="40" fill="#2A3F7A" textAnchor="middle" fontWeight="bold">AI</text>
                </svg>
            </div>
            <span className={`text-2xl font-bold tracking-wider whitespace-nowrap transition-all duration-200 overflow-hidden ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>onluyen</span>
        </div>
      
      <nav className="flex-1 space-y-2">
        <NavLink icon={HomeIcon} label="Trang chủ" isActive={currentView === 'home'} isExpanded={isExpanded} onClick={() => setCurrentView('home')} />
        <NavLink icon={PencilSquareIcon} label="Tự học" isActive={isSelfStudyActive} isExpanded={isExpanded} onClick={() => setCurrentView('self-study')} />
        <NavLink icon={LightBulbIcon} label="AI ConCo" isActive={isAiConvoActive} isExpanded={isExpanded} onClick={() => setCurrentView('ai-subjects')} />
      </nav>

        <div className="mt-auto">
            <div className="border-t border-brand-blue mb-2"></div>
             <button
                onClick={onOpenAboutModal}
                className={`w-full flex items-center p-3 text-sm text-slate-300 hover:bg-brand-blue rounded-lg transition-colors duration-200 ${!isExpanded ? 'justify-center' : ''}`}
            >
                <QuestionMarkCircleIcon className="h-6 w-6 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-200 overflow-hidden ${isExpanded ? 'w-auto ml-3 opacity-100' : 'w-0 ml-0 opacity-0'}`}>
                    Giới thiệu về web
                </span>
            </button>
             <a
                href="mailto:gopy@onluyen.ai?subject=Góp ý cho OnLuyen AI Tutor"
                className={`w-full flex items-center p-3 text-sm text-slate-300 hover:bg-brand-blue rounded-lg transition-colors duration-200 mt-1 ${!isExpanded ? 'justify-center' : ''}`}
            >
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 flex-shrink-0" />
                <div className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${isExpanded ? 'w-auto ml-3 opacity-100' : 'w-0 ml-0 opacity-0'}`}>
                    <p className="font-semibold text-white">Góp ý & Báo lỗi</p>
                    <p className="text-xs text-slate-400">Giúp chúng tôi cải thiện</p>
                </div>
            </a>
      </div>
    </aside>
  );
};

export default Sidebar;