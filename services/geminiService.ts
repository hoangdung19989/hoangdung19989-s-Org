import { GoogleGenAI, Type } from "@google/genai";
import type { Subject, Quiz, TestType } from '../types';

// Lazy initialization for the AI instance
let geminiAI: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI {
  if (!geminiAI) {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      // This will be visible in the browser console, which is helpful for debugging on Vercel
      console.error("VITE_API_KEY environment variable not set!");
      throw new Error("API_KEY is not configured. Please check your environment variables.");
    }
    geminiAI = new GoogleGenAI({ apiKey });
  }
  return geminiAI;
}


const getSystemInstruction = (subjectName: string): string => {
  return `You are a world-class, friendly, and patient tutor for Vietnamese high school students. 
Your subject of expertise is ${subjectName}. 
Explain concepts clearly, concisely, and in Vietnamese. 
Use examples and analogies relevant to a student's life. 
When asked to solve a problem, break it down into simple, easy-to-follow steps. 
Maintain a positive and encouraging tone. 
Format your responses using Markdown for better readability, including code blocks for formulas or code when appropriate.`;
};

const getGenericSystemInstruction = (): string => {
  return `You are a helpful and friendly AI tutor for Vietnamese students. 
You can answer questions on a wide range of subjects like Math, Physics, Chemistry, English, Literature, and Programming. 
Explain concepts clearly, concisely, and in Vietnamese. 
Use examples relevant to a student's life. 
Maintain a positive and encouraging tone. 
Format your responses using Markdown for better readability, including code blocks for formulas or code when appropriate.`;
};

export const getTutorResponse = async (subject: Subject, prompt: string): Promise<string> => {
  try {
    const ai = getAiInstance();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(subject.name),
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return "Rất tiếc, đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.";
  }
};

export const getGenericTutorResponse = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiInstance();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getGenericSystemInstruction(),
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return "Rất tiếc, đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.";
  }
};

export const generateQuiz = async (subjectName: string, gradeName: string, testType: TestType): Promise<Quiz> => {
    try {
        const ai = getAiInstance();
        const isEnglishSubject = subjectName.toLowerCase().includes('tiếng anh') || subjectName.toLowerCase().includes('english');
        
        const languageInstruction = isEnglishSubject 
            ? "QUAN TRỌNG: Đây là môn Tiếng Anh. Nội dung câu hỏi (question), các lựa chọn (options) và đề bài tự luận PHẢI VIẾT BẰNG TIẾNG ANH. Tuy nhiên, phần giải thích (explanation) hãy viết bằng TIẾNG VIỆT để học sinh hiểu bài."
            : "Nội dung 100% Tiếng Việt.";

        // Customize prompt based on test type
        let typeSpecificInstruction = "";
        if (testType.id === '15-minute') {
            typeSpecificInstruction = `
                - Đây là bài KIỂM TRA 15 PHÚT.
                - Số lượng: ${testType.questionCount} câu TRẮC NGHIỆM.
                - KHÔNG có tự luận.
                - Nội dung: Tập trung vào 1-2 bài học gần nhất trong chương trình, kiểm tra mức độ Nhận biết và Thông hiểu.
            `;
        } else if (testType.id === '45-minute') {
            typeSpecificInstruction = `
                - Đây là bài KIỂM TRA 1 TIẾT (45 phút).
                - Số lượng: ${testType.questionCount} câu TRẮC NGHIỆM và ${testType.essayCount} câu TỰ LUẬN.
                - Phân hóa: 40% Nhận biết, 30% Thông hiểu, 20% Vận dụng, 10% Vận dụng cao.
                - Nội dung: Tổng hợp kiến thức của cả chương vừa học.
            `;
        } else if (testType.id === 'semester') {
            typeSpecificInstruction = `
                - Đây là bài THI HỌC KỲ (Cuối kỳ).
                - Số lượng: ${testType.questionCount} câu TRẮC NGHIỆM và ${testType.essayCount} câu TỰ LUẬN.
                - Độ khó: Cao. Bao phủ toàn bộ kiến thức học kỳ.
                - Cấu trúc đề thi chuẩn của Bộ Giáo dục.
            `;
        }

        // Optimized Prompt
        const quizGenerationPrompt = `
            Bạn là giáo viên giỏi. Hãy soạn đề "${testType.name}" môn "${subjectName}" lớp "${gradeName}".
            
            Yêu cầu cấu trúc:
            ${typeSpecificInstruction}
            
            Yêu cầu chung:
            1. **Nguồn đề**: Chọn ngẫu nhiên tên một trường THCS/THPT uy tín tại Việt Nam để điền vào "sourceSchool".
            2. **Trắc nghiệm**: Mỗi câu có 4 đáp án, chỉ 1 đúng. Giải thích chi tiết.
            3. **Tự luận** (Nếu có): Yêu cầu vận dụng, giải bài tập hoặc viết đoạn văn (với môn Văn/Anh). Cung cấp đáp án mẫu chi tiết.
            4. ${languageInstruction}
            5. Xuất ra JSON hợp lệ.
        `;

        const quizResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: quizGenerationPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sourceSchool: { type: Type.STRING, description: "Tên trường học." },
                        title: { type: Type.STRING, description: "Tiêu đề bài kiểm tra (VD: Kiểm tra 1 tiết Toán 7)." },
                        timeLimit: { type: Type.STRING, description: "Thời gian làm bài (VD: 45 phút)." },
                        questions: {
                            type: Type.ARRAY,
                            description: "Danh sách câu hỏi trắc nghiệm",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    correctAnswer: { type: Type.STRING },
                                    explanation: { type: Type.STRING }
                                },
                                required: ["question", "options", "correctAnswer", "explanation"]
                            }
                        },
                        essayQuestions: {
                            type: Type.ARRAY,
                            description: "Danh sách câu hỏi tự luận (nếu có)",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    sampleAnswer: { type: Type.STRING, description: "Hướng dẫn giải" }
                                },
                                required: ["question", "sampleAnswer"]
                            }
                        }
                    },
                    required: ["sourceSchool", "questions", "title", "timeLimit"]
                }
            }
        });

        const jsonText = quizResponse.text?.trim();
        if (!jsonText) throw new Error("Empty response from AI");
        
        const quizData: Quiz = JSON.parse(jsonText);

        if (!quizData.sourceSchool || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
            throw new Error("Dữ liệu bài kiểm tra do AI tạo ra không hợp lệ.");
        }
        
        return quizData;

    } catch (error) {
        console.error("Gemini API call for quiz generation failed:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Không thể tạo bài kiểm tra lúc này. Vui lòng thử lại sau.");
    }
};

export const generateMockExam = async (subjectName: string, gradeName: string): Promise<Quiz> => {
    try {
        const ai = getAiInstance();
        const isEnglishSubject = subjectName.toLowerCase().includes('tiếng anh') || subjectName.toLowerCase().includes('english');
        
        const languageInstruction = isEnglishSubject 
            ? "QUAN TRỌNG: Đây là đề thi môn Tiếng Anh. Tất cả câu hỏi, đáp án, bài đọc hiểu, và đề bài viết luận PHẢI BẰNG TIẾNG ANH chuẩn ngữ pháp. Chỉ phần giải thích (explanation) là viết bằng TIẾNG VIỆT."
            : "Ngôn ngữ: Tiếng Việt.";

        // Optimized Prompt: Nationwide School Sources
        const quizGenerationPrompt = `
            Bạn là chuyên gia ra đề thi. Hãy soạn một ĐỀ THI THỬ (Mock Exam) chuẩn cấu trúc cho môn "${subjectName}" lớp "${gradeName}".

            Yêu cầu cụ thể:
            1. **Phần 1: Trắc nghiệm**: Tạo **30 câu hỏi** trắc nghiệm. Phân hóa: 40% Nhận biết, 30% Thông hiểu, 20% Vận dụng, 10% Vận dụng cao.
            2. **Phần 2: Tự luận**: Tạo **3 câu hỏi** tự luận (bài tập lớn, bài văn, hoặc câu hỏi giải thích sâu).
            3. **Nguồn đề**: Chọn ngẫu nhiên tên một trường Chuyên hoặc trường điểm uy tín tại Việt Nam (Ví dụ: THPT Chuyên Hà Nội - Amsterdam, THPT Chuyên Lam Sơn - Thanh Hóa, THPT Chuyên Trần Đại Nghĩa - TP.HCM, THCS & THPT Nguyễn Tất Thành, v.v.) để làm phong phú nguồn đề.
            4. Xuất ra định dạng JSON chuẩn.
            5. ${languageInstruction}
            6. Giải thích (explanation) và Đáp án mẫu (sampleAnswer) phải cực kỳ chi tiết, giúp học sinh hiểu bản chất vấn đề.
        `;

        const quizResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: quizGenerationPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sourceSchool: {
                            type: Type.STRING,
                            description: "Tên trường học thực tế tại Việt Nam (ngẫu nhiên)."
                        },
                        title: { type: Type.STRING, description: "Tiêu đề (VD: Đề thi thử vào 10)." },
                        timeLimit: { type: Type.STRING, description: "Thời gian làm bài." },
                        questions: {
                            type: Type.ARRAY,
                            description: "Danh sách câu hỏi trắc nghiệm",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: { type: Type.STRING },
                                    explanation: { type: Type.STRING }
                                },
                                required: ["question", "options", "correctAnswer", "explanation"]
                            }
                        },
                        essayQuestions: {
                            type: Type.ARRAY,
                            description: "Danh sách câu hỏi tự luận",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    sampleAnswer: { type: Type.STRING, description: "Hướng dẫn giải chi tiết" }
                                },
                                required: ["question", "sampleAnswer"]
                            }
                        }
                    },
                    required: ["sourceSchool", "questions"]
                }
            }
        });

        const jsonText = quizResponse.text?.trim();
        if (!jsonText) throw new Error("Empty response from AI");

        const quizData: Quiz = JSON.parse(jsonText);

        if (!quizData.sourceSchool || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
            throw new Error("Dữ liệu bài thi thử do AI tạo ra không hợp lệ.");
        }
        
        return quizData;

    } catch (error) {
        console.error("Gemini API call for mock exam generation failed:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Không thể tạo bài thi thử lúc này. Vui lòng thử lại sau.");
    }
};

export const generatePracticeExercises = async (subjectName: string, gradeName: string, lessonTitle: string): Promise<Quiz> => {
    try {
        const ai = getAiInstance();
        const isEnglishSubject = subjectName.toLowerCase().includes('tiếng anh') || subjectName.toLowerCase().includes('english');
        
        const languageInstruction = isEnglishSubject 
            ? "LƯU Ý: Môn Tiếng Anh. Câu hỏi và các lựa chọn phải bằng TIẾNG ANH. Giải thích bằng Tiếng Việt."
            : "";

        const generationPrompt = `
            Bạn là trợ giảng AI. Hãy tạo nhanh bài tập luyện tập cho học sinh.
            
            Thông tin:
            - Môn: ${subjectName}
            - Lớp: ${gradeName}
            - Bài: "${lessonTitle}"
            - Sách giáo khoa: Kết nối tri thức / Chân trời sáng tạo.

            Yêu cầu:
            1. **5 câu hỏi** trắc nghiệm bám sát nội dung bài học.
            2. Định dạng JSON chuẩn.
            3. "sourceSchool" ghi là "Hệ thống Tự luyện OnLuyen AI".
            4. ${languageInstruction}
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: generationPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sourceSchool: { type: Type.STRING },
                        title: { type: Type.STRING },
                        timeLimit: { type: Type.STRING },
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: { type: Type.STRING },
                                    explanation: { type: Type.STRING }
                                },
                                required: ["question", "options", "correctAnswer", "explanation"]
                            }
                        }
                    },
                    required: ["sourceSchool", "questions"]
                }
            }
        });

        const jsonText = response.text?.trim();
        if (!jsonText) throw new Error("Empty response from AI");

        const practiceData: Quiz = JSON.parse(jsonText);

        if (!practiceData.sourceSchool || !Array.isArray(practiceData.questions) || practiceData.questions.length === 0) {
            throw new Error("Dữ liệu bài tập do AI tạo ra không hợp lệ.");
        }
        
        return practiceData;

    } catch (error) {
        console.error("Gemini API call for practice exercise generation failed:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Không thể tạo bài tập lúc này. Vui lòng thử lại sau.");
    }
};