import React, { useState, useMemo } from 'react';
import type { Course, Lesson } from '../types';
import LessonSidebar from './LessonSidebar';

interface LectureViewProps {
  course: Course;
  onExit: () => void;
}

// --- URL Helper Functions ---

/**
 * Checks if a URL points to a direct video file.
 * @param url The URL to check.
 * @returns True if the URL ends with a common video extension.
 */
const isDirectVideoUrl = (url: string): boolean => {
  if (!url) return false;
  return /\.(mp4|webm|ogg)$/i.test(url);
};

/**
 * Checks if a string is a YouTube URL or just a YouTube video ID.
 * @param urlOrId The string to check.
 * @returns True if the string is a YouTube link or ID.
 */
const isYoutubeContent = (urlOrId: string): boolean => {
  if (!urlOrId) return false;
  const urlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  const idRegex = /^[a-zA-Z0-9_-]{11}$/;
  return urlRegex.test(urlOrId) || idRegex.test(urlOrId);
};


/**
 * Transforms a Google Drive sharing URL into an embeddable URL.
 * @param url The original Google Drive URL (e.g., .../view)
 * @returns The embeddable URL (e.g., .../preview)
 */
const transformGoogleDriveUrl = (url: string): string => {
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  return url;
};

/**
 * Transforms various YouTube URL formats or a direct video ID into a standard embed URL with optimal parameters.
 * @param urlOrId The original YouTube URL or just the video ID.
 * @returns The embeddable YouTube URL.
 */
const transformYoutubeUrl = (urlOrId: string): string => {
    let videoId: string | null = null;
    
    // Regex to find the video ID in various YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = urlOrId.match(regex);
    
    if (match && match[1]) {
        videoId = match[1];
    } else if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
        // If no match from URL, check if the string itself is a valid ID.
        videoId = urlOrId;
    }

    if (videoId) {
        const params = new URLSearchParams({
            autoplay: '1',
            rel: '0',
            modestbranding: '1',
            iv_load_policy: '3',
            playsinline: '1',
        });
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }
    
    return urlOrId; // Fallback
};


const LectureView: React.FC<LectureViewProps> = ({ course, onExit }) => {
  const firstLesson = useMemo(() => course?.chapters?.[0]?.lessons?.[0] || null, [course]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(firstLesson);
  
  const currentUrl = currentLesson?.videoUrl || '';

  const urlType = useMemo(() => {
    if (!currentUrl) return 'none';
    if (isDirectVideoUrl(currentUrl)) return 'direct';
    if (isYoutubeContent(currentUrl)) return 'youtube';
    if (currentUrl.includes('drive.google.com')) return 'googledrive';
    return 'iframe';
  }, [currentUrl]);

  const embedUrl = useMemo(() => {
    if (urlType === 'youtube') {
      return transformYoutubeUrl(currentUrl);
    }
    if (urlType === 'googledrive') {
      return transformGoogleDriveUrl(currentUrl);
    }
    return currentUrl;
  }, [currentUrl, urlType]);


  const handleSelectLesson = (lesson: Lesson) => {
    if (lesson.type === 'video' && lesson.videoUrl) {
        setCurrentLesson(lesson);
    } else {
        alert(`Nội dung cho bài học "${lesson.title}" đang được chuẩn bị.`);
    }
  };
  
  return (
    <div className="h-screen w-full bg-brand-bg flex overflow-x-hidden">
        <main className="flex-1 p-6 flex flex-col">
          <div className="flex-grow flex flex-col">
            <div className="flex-grow aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-6">
              {urlType === 'none' ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white">
                      <p>Vui lòng chọn một bài học có video để bắt đầu.</p>
                  </div>
              ) : urlType === 'direct' ? (
                    <video
                        key={currentLesson?.id}
                        className="w-full h-full"
                        src={currentUrl}
                        controls
                        autoPlay
                    >
                        Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
              ) : (
                    <iframe
                        key={currentLesson?.id}
                        className="w-full h-full"
                        src={embedUrl}
                        title={currentLesson?.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
              )}
            </div>
            <div className="flex-shrink-0 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-2 text-slate-800">{currentLesson?.title || 'Chưa chọn bài học'}</h2>
              <p className="text-slate-600">Phần nội dung chi tiết hoặc bài tập cho video này sẽ được hiển thị ở đây.</p>
            </div>
          </div>
        </main>
        <LessonSidebar 
            course={course}
            activeLessonId={currentLesson?.id || ''}
            onSelectLesson={handleSelectLesson}
            onExit={onExit}
        />
    </div>
  );
};

export default LectureView;