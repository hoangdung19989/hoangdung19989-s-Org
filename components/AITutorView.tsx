import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Subject, ChatMessage } from '../types';
import { getTutorResponse } from '../services/geminiService';
import { ArrowLeftIcon, PaperAirplaneIcon } from './icons';

interface AITutorViewProps {
  subject: Subject;
  onBack: () => void;
}

const AITutorView: React.FC<AITutorViewProps> = ({ subject, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    setMessages([{
        role: 'model',
        content: `Xin chào! Tôi là trợ lý AI môn ${subject.name}. Bạn cần giúp đỡ về vấn đề gì hôm nay?`
    }]);
  }, [subject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await getTutorResponse(subject, input);
      const modelMessage: ChatMessage = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
       const modelMessage: ChatMessage = { role: 'model', content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại." };
      setMessages((prev) => [...prev, modelMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="flex items-center p-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="ml-4 text-xl font-bold text-slate-800">{`AI Tutor: ${subject.name}`}</h2>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-lg px-4 py-3 rounded-2xl bg-white text-slate-700 flex items-center space-x-2 shadow-sm">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
            </div>
          </div>
        )}
         {error && (
            <div className="flex justify-start">
              <div className="max-w-lg px-4 py-3 rounded-2xl bg-red-100 text-red-700 border border-red-200">
                <p><strong>Lỗi:</strong> {error}</p>
              </div>
            </div>
          )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Đặt câu hỏi của bạn ở đây..."
            className="flex-1 w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-sky-600 rounded-full text-white hover:bg-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AITutorView;
