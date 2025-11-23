
import React from 'react';
import type { View } from '../App';
import { 
    RocketLaunchIcon, 
    LightBulbIcon, 
    PencilSquareIcon, 
    ChevronRightIcon
} from './icons';

interface HomePageProps {
  setCurrentView: (view: View) => void;
}

const HeroIllustration: React.FC = () => (
    <div className="w-64 h-64 lg:w-72 lg:h-72 relative">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="relative">
            <path fill="#FFD700" d="M46.9,-54.6C59.7,-43.3,68.2,-27.7,71.1,-10.8C74,6,71.2,24.1,61,38.2C50.8,52.3,33.1,62.4,15.6,67.7C-1.9,73,-19.3,73.5,-34.5,66.6C-49.7,59.7,-62.7,45.4,-69.1,29C-75.5,12.6,-75.3,-5.8,-68.8,-21.5C-62.3,-37.2,-49.5,-50.1,-35.1,-60.1C-20.7,-70.1,-4.7,-77.2,10.2,-74.6C25.1,-72,41.1,-60.8,46.9,-54.6Z" transform="translate(100 100)" />
            <g transform="translate(100 100) scale(1.2)">
                <path d="M-15,30 L-15,10 C-15,0 -5,0 0,0 C5,0 15,0 15,10 L15,30 L-15,30 Z" fill="#2A3F7A"/>
                <rect x="-25" y="30" width="50" height="5" rx="2.5" fill="#39508A"/>
                <rect x="-20" y="35" width="40" height="15" rx="5" fill="#FFFFFF"/>
                <circle cx="0" cy="-5" r="12" fill="#FFD700"/>
                <path d="M-4 -5 L0 -9 L4 -5 Z" fill="#FFFFFF"/>
                <path d="M-2 -3 L0 -5 L2 -3 Z" fill="#FFFFFF"/>
                <path d="M-2 0 L0 2 L2 0 Z" fill="#FFFFFF" transform="rotate(180, 0, 0)"/>
            </g>
        </svg>
    </div>
);


const FeatureCard: React.FC<{ 
    icon: React.ElementType; 
    title: string; 
    description: string; 
    onClick: () => void; 
    color: string;
}> = ({ icon: Icon, title, description, onClick, color }) => {
    const bgIconColor = color.replace('bg-', 'bg-').replace('500', '100');
    const textIconColor = color.replace('bg-', 'text-').replace('500', '600');
    const borderColor = color.replace('bg-', 'border-').replace('500', '200');

    return (
        <button 
            onClick={onClick}
            className={`group w-full flex flex-col sm:flex-row items-start sm:items-center p-6 bg-white rounded-2xl shadow-lg border ${borderColor} transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-left`}
        >
            <div className={`flex-shrink-0 flex items-center justify-center h-20 w-20 p-4 rounded-2xl ${bgIconColor} mb-4 sm:mb-0`}>
                <Icon className={`h-full w-full ${textIconColor}`} />
            </div>
            
            <div className="flex-grow sm:ml-6">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-blue-dark transition-colors">{title}</h3>
                <p className="mt-2 text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-4 self-end sm:self-center">
                 <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <ChevronRightIcon className="h-5 w-5" />
                 </div>
            </div>
        </button>
    )
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentView }) => {
  return (
    <div className="space-y-8 lg:space-y-12 container mx-auto max-w-6xl">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-brand-blue via-sky-700 to-sky-600 text-white rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between p-8 lg:p-16 relative z-10">
            <div className="md:w-1/2 lg:w-3/5 text-center md:text-left mb-8 md:mb-0 animate-slide-in-bottom">
                 <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                     Chào mừng bạn đến với <br/>
                     <span className="text-brand-yellow">OnLuyen AI!</span>
                 </h1>
                 <p className="mt-6 text-lg text-sky-100 max-w-xl leading-relaxed">
                     Nền tảng học tập thông minh thế hệ mới, giúp bạn chinh phục kiến thức một cách hiệu quả, thú vị và được cá nhân hóa.
                 </p>
                 <div className="mt-10">
                    <button 
                        onClick={() => setCurrentView('self-study')}
                        className="inline-flex items-center px-8 py-4 bg-white text-brand-blue-dark font-bold rounded-xl shadow-xl hover:bg-slate-50 transition-all transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300"
                    >
                        <RocketLaunchIcon className="h-6 w-6 mr-3" />
                        Khám phá ngay
                    </button>
                 </div>
            </div>
            <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end">
                <HeroIllustration />
            </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="animate-slide-in-bottom" style={{animationDelay: '0.1s'}}>
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Bắt đầu hành trình của bạn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <FeatureCard 
            icon={PencilSquareIcon} 
            title="Tự học"
            description="Truy cập video bài giảng, phòng thí nghiệm ảo và làm các bài kiểm tra trắc nghiệm."
            onClick={() => setCurrentView('self-study')}
            color="bg-emerald-500"
          />
          <FeatureCard 
            icon={LightBulbIcon} 
            title="AI Convo"
            description="Trò chuyện và hỏi đáp trực tiếp với trợ lý AI thông minh về bất kỳ chủ đề nào."
            onClick={() => setCurrentView('ai-subjects')}
            color="bg-sky-500"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
