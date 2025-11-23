import React from 'react';
import { XMarkIcon, RocketLaunchIcon } from './icons';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 transform transition-all animate-slide-in-bottom">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/70 rounded-t-xl">
          <div className="flex items-center space-x-3">
             <div className="bg-brand-blue text-white rounded-lg p-2">
                <RocketLaunchIcon className="h-6 w-6"/>
            </div>
            <h2 id="modal-title" className="text-xl font-bold text-slate-800">
              Giới thiệu về OnLuyen AI Tutor
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Đóng"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 text-slate-600 space-y-4">
          <p>
            <strong>OnLuyen AI Tutor</strong> là một nền tảng học tập tương tác, được xây dựng với sự hỗ trợ của trí tuệ nhân tạo (AI) tiên tiến từ Google Gemini. Sứ mệnh của chúng tôi là mang đến cho học sinh một công cụ học tập cá nhân hóa, hiệu quả và hấp dẫn.
          </p>
          <div>
            <h3 className="font-semibold text-slate-700 mb-2">Với OnLuyen AI Tutor, bạn có thể:</h3>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>Tự học toàn diện:</strong> Khám phá kho bài giảng video, luyện tập với hàng ngàn câu hỏi, thử sức với các bài kiểm tra và thi thử được tạo tự động, và khám phá khoa học qua phòng thí nghiệm ảo tương tác.
              </li>
              <li>
                <strong>AI Convo - Trợ lý AI thông minh:</strong> Đặt bất kỳ câu hỏi nào về các môn học và nhận được lời giải thích chi tiết, từng bước một từ trợ lý AI.
              </li>
              <li>
                <strong>Học tập mọi lúc, mọi nơi:</strong> Nền tảng được thiết kế để hoạt động mượt mà trên mọi thiết bị, giúp bạn không bỏ lỡ bất kỳ kiến thức nào.
              </li>
            </ul>
          </div>
          <p>
            Chúng tôi tin rằng công nghệ có thể thay đổi cách chúng ta học. OnLuyen AI Tutor mong muốn trở thành người bạn đồng hành đáng tin cậy trên con đường chinh phục tri thức của bạn.
          </p>
          <p className="text-center font-medium pt-2 text-slate-700">
            Cảm ơn bạn đã sử dụng OnLuyen AI Tutor!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
