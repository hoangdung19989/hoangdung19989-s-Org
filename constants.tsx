
import type { Subject, Module, Course, Grade, PhetSimulation, LabCategory, TestSubject, TestGrade, SelfPracticeSubject, PracticeChapter, MockExamSubject, LectureSubject, TestType } from './types';
import { 
    BookOpenIcon, 
    BeakerIcon, 
    CalculatorIcon, 
    GlobeAltIcon, 
    CodeBracketIcon, 
    ChatBubbleLeftRightIcon, 
    DocumentTextIcon, 
    TowerIcon, 
    LeafIcon,
    HistoryIcon,
    ScienceIcon,
    VideoCameraIcon,
    PencilSquareIcon,
    ClockIcon,
    AcademicCapIcon
} from './components/icons';

export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Toán học',
    description: 'Giải phương trình, hình học và các khái niệm toán học.',
    color: 'bg-sky-500',
    icon: CalculatorIcon,
  },
  {
    id: 'physics',
    name: 'Vật lý',
    description: 'Khám phá các định luật về chuyển động, năng lượng và vũ trụ.',
    color: 'bg-indigo-500',
    icon: BookOpenIcon,
  },
  {
    id: 'chemistry',
    name: 'Hóa học',
    description: 'Tìm hiểu về các nguyên tố, hợp chất và phản ứng hóa học.',
    color: 'bg-emerald-500',
    icon: BeakerIcon,
  },
  {
    id: 'english',
    name: 'Tiếng Anh',
    description: 'Cải thiện ngữ pháp, từ vựng và kỹ năng viết.',
    color: 'bg-rose-500',
    icon: GlobeAltIcon,
  },
  {
    id: 'literature',
    name: 'Văn học',
    description: 'Phân tích tác phẩm, tìm hiểu tác giả và các trào lưu văn học.',
    color: 'bg-amber-500',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    id: 'programming',
    name: 'Tin học',
    description: 'Học các khái niệm lập trình, thuật toán và cấu trúc dữ liệu.',
    color: 'bg-fuchsia-500',
    icon: CodeBracketIcon,
  },
];

export const LECTURE_SUBJECTS: LectureSubject[] = [
  {
    id: 'lecture-math',
    name: 'Toán',
    icon: CalculatorIcon,
    description: 'Video bài giảng Đại số và Hình học trực quan, dễ hiểu.',
    tags: ['Lớp 6-9', 'Bám sát SGK', 'Video 4K'],
    color: 'bg-blue-500',
  },
  {
    id: 'lecture-literature',
    name: 'Ngữ văn',
    icon: DocumentTextIcon,
    description: 'Phân tích tác phẩm văn học và rèn luyện kỹ năng Tiếng Việt.',
    tags: ['Soạn văn', 'Văn mẫu', 'Tác giả'],
    color: 'bg-amber-500',
  },
  {
    id: 'lecture-english',
    name: 'Tiếng Anh',
    icon: TowerIcon,
    description: 'Học từ vựng, ngữ pháp và phát âm chuẩn bản xứ.',
    tags: ['Global Success', 'Nghe - Nói', 'Ngữ pháp'],
    color: 'bg-rose-500',
  },
];


export const MODULES: Module[] = [
  {
    id: 1,
    title: 'Bài giảng',
    description: 'Video bài giảng chi tiết, sinh động, giúp học sinh tự học và ôn tập hiệu quả.',
    icon: VideoCameraIcon,
    color: 'bg-blue-500',
    tags: ['Video', 'AI NotebookLM', 'Trực quan']
  },
  {
    id: 2,
    title: 'Tự luyện',
    description: 'Bài luyện được sắp xếp theo từng đơn vị kiến thức, từ dễ đến khó.',
    icon: PencilSquareIcon,
    color: 'bg-emerald-500',
    tags: ['Theo chủ đề', 'Luyện tập', 'Đáp án chi tiết']
  },
  {
    id: 3,
    title: 'Kiểm tra',
    description: 'Tập hợp đề thi, kiểm tra của các trường trên toàn tỉnh Tuyên Quang.',
    icon: ClockIcon,
    color: 'bg-orange-500',
    tags: ['15 Phút', '1 Tiết', 'Học kỳ']
  },
  {
    id: 4,
    title: 'Thi thử',
    description: 'Các kì thi thử do trường THCS Minh Thanh tổ chức.',
    icon: AcademicCapIcon,
    color: 'bg-purple-500',
    tags: ['Vào 10', 'Áp lực thời gian', 'Tổng hợp']
  },
  {
    id: 5,
    title: 'Phòng thí nghiệm',
    description: 'Phần mềm mô phỏng thí nghiệm giúp hiểu sâu, nhớ lâu các hiện tượng khoa học.',
    icon: BeakerIcon,
    color: 'bg-pink-500',
    tags: ['Mô phỏng PhET', 'Tương tác', 'Thực hành']
  },
];

export const SELF_PRACTICE_SUBJECTS: SelfPracticeSubject[] = [
  {
    id: 'sp-math',
    name: 'Toán',
    description: 'Đại số, Hình học và Thống kê.',
    icon: CalculatorIcon,
    tags: ['Lớp 6 - 9', '29 Chủ đề', 'Bám sát SGK'],
    color: 'bg-blue-500',
  },
  {
    id: 'sp-literature',
    name: 'Ngữ văn',
    description: 'Đọc hiểu văn bản và Tiếng Việt.',
    icon: DocumentTextIcon,
    tags: ['Lớp 6 - 9', '30 Chủ đề', 'Soạn văn'],
    color: 'bg-amber-500',
  },
  {
    id: 'sp-english',
    name: 'Tiếng Anh',
    description: 'Từ vựng, Ngữ pháp và Kỹ năng.',
    icon: TowerIcon,
    tags: ['Lớp 6 - 9', '54 Chủ đề', 'Global Success'],
    color: 'bg-rose-500',
  },
  {
    id: 'sp-science',
    name: 'Khoa học tự nhiên',
    description: 'Lý, Hóa, Sinh tích hợp.',
    icon: ScienceIcon,
    tags: ['Lớp 6 - 9', '40 Chủ đề', 'Thí nghiệm ảo'],
    color: 'bg-green-500',
  },
  {
    id: 'sp-history-geo',
    name: 'Lịch sử và Địa lí',
    description: 'Khám phá thế giới và quá khứ.',
    icon: HistoryIcon,
    tags: ['Lớp 6 - 9', '38 Chủ đề', 'Bản đồ số'],
    color: 'bg-orange-500',
  },
];

export const GRADES_BY_SUBJECT: Record<string, Grade[]> = {
  'lecture-math': [
    { id: 'math-6', name: 'Toán Lớp 6', courseId: 'math-6' },
    { id: 'math-7', name: 'Toán Lớp 7', courseId: 'math-7' },
    { id: 'math-8', name: 'Toán Lớp 8', courseId: 'math-8' },
    { id: 'math-9', name: 'Toán Lớp 9', courseId: 'math-9' },
  ],
  'lecture-literature': [
    { id: 'lit-6', name: 'Ngữ văn Lớp 6', courseId: 'lit-6' },
    { id: 'lit-7', name: 'Ngữ văn Lớp 7', courseId: 'lit-7' },
    { id: 'lit-8', name: 'Ngữ văn Lớp 8', courseId: 'lit-8' },
    { id: 'lit-9', name: 'Ngữ văn Lớp 9', courseId: 'lit-9' },
  ],
  'lecture-english': [
    { id: 'eng-6', name: 'Tiếng Anh Lớp 6', courseId: 'eng-6' },
    { id: 'eng-7', name: 'Tiếng Anh Lớp 7', courseId: 'eng-7' },
    { id: 'eng-8', name: 'Tiếng Anh Lớp 8', courseId: 'eng-8' },
    { id: 'eng-9', name: 'Tiếng Anh Lớp 9', courseId: 'eng-9' },
  ],
};


// --- COURSE DATA ---

// You can add more course data objects here.
// Just copy the structure, change the IDs, titles, and especially the `videoUrl`.

const MATH_7_COURSE_DATA: Course = {
    id: 'math-7',
    subjectName: 'Toán',
    gradeLevel: 7,
    title: 'Kết nối tri thức với cuộc sống',
    chapters: [
        {
            id: 'm7-chapter-1',
            title: 'Chương I. Số hữu tỉ',
            lessons: [
                { id: 'm7-l1-1', title: 'Bài 1. Tập hợp các số hữu tỉ', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=sv0bUBo180M' },
                { id: 'm7-l1-2', title: 'Kiến thức cần nhớ về tập hợp số hữu tỉ', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
                { id: 'm7-l1-3', title: 'Bài tập củng cố về số hữu tỉ', type: 'text' },
                { id: 'm7-l1-4', title: 'Tập hợp các số hữu tỉ', type: 'quiz' },
                { id: 'm7-l1-5', title: 'Bài 2. Cộng, trừ, nhân, chia số hữu tỉ', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
                { id: 'm7-l1-6', title: 'Kiến thức cần nhớ về các phép tính với số hữu tỉ', type: 'text' },
                { id: 'm7-l1-7', title: 'Các bài tập củng cố về phép tính số hữu tỉ', type: 'quiz' },
                { id: 'm7-l1-8', title: 'Cộng, trừ, nhân, chia số hữu tỉ', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
                { id: 'm7-l1-9', title: 'Bài 3. Lũy thừa với số mũ tự nhiên của một số hữu tỉ', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'},
            ]
        },
        {
            id: 'm7-chapter-2',
            title: 'Chương II. Số thực',
            lessons: [
                { id: 'm7-l2-1', title: 'Bài 4. Căn bậc hai số học', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
                { id: 'm7-l2-2', title: 'Bài 5. Làm quen với số thập phân vô hạn tuần hoàn', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
                { id: 'm7-l2-3', title: 'Bài 6. Số vô tỉ. Số thực', type: 'text' },
                { id: 'm7-l2-4', title: 'Bài 7. Tập hợp các số thực', type: 'quiz' },
            ]
        }
    ]
};

const MATH_6_COURSE_DATA: Course = {
    id: 'math-6',
    subjectName: 'Toán',
    gradeLevel: 6,
    title: 'Chân trời sáng tạo',
    chapters: [
        {
            id: 'm6-chapter-1',
            title: 'Chương I. Số tự nhiên',
            lessons: [
                { id: 'm6-l1-1', title: 'Bài 1. Tập hợp. Phần tử của tập hợp', type: 'video', videoUrl: 'https://atm305057-s3user.vcos.cloudstorage.com.vn/1-bucket-1111/T%E1%BA%ADp_h%E1%BB%A3p_c%C3%A1c_s%E1%BB%91_t%E1%BB%B1_nhi%C3%AAn.mp4' },
                { id: 'm6-l1-2', title: 'Bài 2. Cách ghi số tự nhiên', type: 'video', videoUrl: 'https://vcos.cloudstorage.com.vn/1-bucket-1111/Gi%E1%BA%A3i_M%C3%A3_Nh%E1%BB%AFng_Con_S%E1%BB%91.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=atm305057-s3user%2F20251121%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251121T115015Z&X-Amz-Expires=600&X-Amz-Signature=e3add22b68cdf3ee021644f9ea0acddc330088d02f24af5a001face42b6e9b5c&X-Amz-SignedHeaders=host' },
                { id: 'm6-l1-3', title: 'Bài 3. Tập hợp. Phần tử của tập hợp', type: 'video', videoUrl: 'https://vcos.cloudstorage.com.vn/1-bucket-1111/Th%E1%BB%A9_T%E1%BB%B1_C%C3%A1c_S%E1%BB%91_T%E1%BB%B1_Nhi%C3%AAn.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=atm305057-s3user%2F20251121%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251121T114845Z&X-Amz-Expires=600&X-Amz-Signature=33d5d405b37bb55348c27d524e63459ed5cc639913d79394ea14918a4a2afdac&X-Amz-SignedHeaders=host' },
            ]
        },
        {
            id: 'm6-chapter-2',
            title: 'Chương II. Tính chia hết trong tập hợp số tự nhiên',
            lessons: [
                { id: 'm6-l2-1', title: 'Bài 6. Chia hết và chia có dư. Tính chất chia hết của một tổng', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
                { id: 'm6-l2-2', title: 'Bài 7. Dấu hiệu chia hết cho 2, cho 5', type: 'video', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
            ]
        }
    ]
};


// This is the "master map" of all available courses.
// App.tsx uses this to find the correct course data based on the user's selection.
export const ALL_COURSES: Record<string, Course> = {
  'math-6': MATH_6_COURSE_DATA,
  'math-7': MATH_7_COURSE_DATA,
  // 'math-8': MATH_8_COURSE_DATA, // Add this when you have data for Math 8
  // 'math-9': MATH_9_COURSE_DATA, // Add this when you have data for Math 9
  // Add more course data here for other subjects and grades as it becomes available
};


// --- LABORATORY DATA ---

export const LAB_CATEGORIES: LabCategory[] = [
  {
    id: 'physics',
    name: 'Vật lý',
    description: 'Khám phá các định luật về chuyển động, năng lượng, sóng, điện và vũ trụ.',
    icon: BookOpenIcon,
    color: 'bg-indigo-500',
    subcategories: [
      { id: 'physics-mechanics', name: 'Cơ học' },
      { id: 'physics-sound-waves', name: 'Âm học & Sóng' },
      { id: 'physics-energy', name: 'Công, năng lượng & công suất' },
      { id: 'physics-thermo', name: 'Nhiệt & Nhiệt động lực học' },
      { id: 'physics-quantum', name: 'Hiện tượng lượng tử' },
      { id: 'physics-light-radiation', name: 'Ánh sáng & Bức xạ' },
      { id: 'physics-electricity', name: 'Điện, Từ & Mạch điện' },
    ],
  },
  {
    id: 'chemistry',
    name: 'Hoá học',
    description: 'Tìm hiểu về nguyên tử, phân tử, phản ứng và các thuộc tính của vật chất.',
    icon: BeakerIcon,
    color: 'bg-emerald-500',
    subcategories: [
      { id: 'chem-general', name: 'Hoá đại cương' },
      { id: 'chem-quantum', name: 'Hoá lượng tử' },
    ],
  },
  {
    id: 'biology',
    name: 'Sinh học',
    description: 'Nghiên cứu về sự sống, từ gen đến hệ sinh thái và chọn lọc tự nhiên.',
    icon: LeafIcon,
    color: 'bg-lime-500',
    subcategories: [
        { id: 'biology-main', name: 'Các quá trình sinh học' },
    ]
  },
  {
    id: 'math',
    name: 'Toán và Thống kê',
    description: 'Nắm vững các khái niệm, đồ thị và ứng dụng của toán học trong thực tế.',
    icon: CalculatorIcon,
    color: 'bg-sky-500',
    subcategories: [
      { id: 'math-concepts', name: 'Khái niệm toán học' },
      { id: 'math-applications', name: 'Ứng dụng toán học' },
    ],
  },
  {
    id: 'earth-science',
    name: 'Khoa học Trái đất',
    description: 'Tìm hiểu về hành tinh của chúng ta, từ kiến tạo mảng đến hiệu ứng nhà kính.',
    icon: GlobeAltIcon,
    color: 'bg-teal-500',
    subcategories: [
       { id: 'earth-science-main', name: 'Trái đất và Không gian' },
    ]
  },
];


// --- PhET SIMULATIONS DATA (Categorized) ---
export const PHET_SIMULATIONS: Record<string, PhetSimulation[]> = {
  // Vật lý
  'physics-mechanics': [
    {
      id: 'phet-forces-and-motion',
      title: 'Lực và Chuyển động: Cơ bản',
      description: 'Khám phá các lực khi tác động lên một vật và xem chúng làm thay đổi chuyển động của vật như thế nào.',
      embedUrl: 'https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_vi.html',
    },
    {
      id: 'phet-pendulum-lab',
      title: 'Con lắc đơn',
      description: 'Thí nghiệm với một hoặc hai con lắc, tìm hiểu các yếu tố ảnh hưởng đến chu kỳ dao động của con lắc.',
      embedUrl: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_vi.html',
    },
    {
      id: 'phet-density',
      title: 'Khối lượng riêng',
      description: 'Tại sao các vật thể lại nổi hoặc chìm? Thả các vật có khối lượng riêng khác nhau vào chất lỏng để tìm hiểu.',
      embedUrl: 'https://phet.colorado.edu/sims/html/density/latest/density_vi.html',
    },
  ],
  'physics-sound-waves': [
     {
      id: 'phet-wave-on-a-string',
      title: 'Sóng trên dây',
      description: 'Tạo ra các loại sóng khác nhau trên một sợi dây và quan sát các đặc tính như biên độ, tần số và bước sóng.',
      embedUrl: 'https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_vi.html',
    },
    {
      id: 'phet-sound',
      title: 'Âm thanh',
      description: 'Tìm hiểu cách các tần số và biên độ khác nhau ảnh hưởng đến âm thanh bạn nghe được.',
      embedUrl: 'https://phet.colorado.edu/sims/html/sound/latest/sound_vi.html',
    },
  ],
  'physics-energy': [
    {
      id: 'phet-energy-skate-park',
      title: 'Năng lượng trong Sân trượt ván',
      description: 'Tìm hiểu về bảo toàn năng lượng với một vận động viên trượt ván! Xây dựng các đường trượt, dốc và nhảy cho ván trượt.',
      embedUrl: 'https://phet.colorado.edu/sims/html/energy-skate-park-basics/latest/energy-skate-park-basics_vi.html',
    },
  ],
  'physics-thermo': [
    {
      id: 'phet-states-of-matter',
      title: 'Các trạng thái của vật chất',
      description: 'Quan sát các phân tử di chuyển ở trạng thái rắn, lỏng và khí. Thêm hoặc bớt nhiệt và xem sự thay đổi trạng thái.',
      embedUrl: 'https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_vi.html',
    },
    {
      id: 'phet-gas-properties',
      title: 'Tính chất của chất khí',
      description: 'Bơm các phân tử khí vào một hộp và xem điều gì xảy ra khi bạn thay đổi thể tích, thêm hoặc bớt nhiệt, và nhiều hơn nữa.',
      embedUrl: 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_vi.html',
    },
  ],
  'physics-quantum': [
    {
      id: 'phet-quantum-wave-interference',
      title: 'Giao thoa sóng lượng tử',
      description: 'Khám phá hiện tượng giao thoa khi các hạt lượng tử như electron đi qua hai khe hẹp.',
      embedUrl: 'https://phet.colorado.edu/sims/html/quantum-wave-interference/latest/quantum-wave-interference_vi.html',
    },
  ],
  'physics-light-radiation': [
     {
      id: 'phet-bending-light',
      title: 'Khúc xạ ánh sáng',
      description: 'Quan sát hiện tượng khúc xạ khi ánh sáng đi qua các môi trường khác nhau như không khí, nước, và thủy tinh.',
      embedUrl: 'https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_vi.html',
    },
     {
      id: 'phet-molecules-and-light',
      title: 'Phân tử và Ánh sáng',
      description: 'Tìm hiểu cách ánh sáng tương tác với các phân tử trong khí quyển.',
      embedUrl: 'https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_vi.html',
    },
  ],
  'physics-electricity': [
    {
      id: 'phet-circuit-construction-kit',
      title: 'Bộ xây dựng mạch điện: DC',
      description: 'Xây dựng các mạch điện với điện trở, bóng đèn, pin và công tắc. Thực hiện các phép đo bằng ampe kế và vôn kế.',
      embedUrl: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_vi.html',
    },
    {
      id: 'phet-balloons-and-static-electricity',
      title: 'Tĩnh điện và bóng bay',
      description: 'Chà quả bóng bay vào áo len, sau đó quan sát cách quả bóng bay có thể dính vào tường hoặc hút các vật thể khác.',
      embedUrl: 'https://phet.colorado.edu/sims/html/balloons-and-static-electricity/latest/balloons-and-static-electricity_vi.html',
    },
    {
      id: 'phet-ohms-law',
      title: 'Định luật Ôm',
      description: 'Xem mối quan hệ giữa hiệu điện thế, cường độ dòng điện và điện trở trong một mạch điện đơn giản.',
      embedUrl: 'https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_vi.html',
    },
  ],
  
  // Hóa học
  'chem-general': [
    {
      id: 'phet-build-an-atom',
      title: 'Xây dựng một nguyên tử',
      description: 'Xây dựng một nguyên tử từ các proton, neutron và electron, và xem nguyên tố, điện tích và khối lượng thay đổi như thế nào.',
      embedUrl: 'https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_vi.html',
    },
    {
      id: 'phet-balancing-chemical-equations',
      title: 'Cân bằng phương trình hóa học',
      description: 'Làm thế nào để bạn cân bằng một phương trình hóa học? Tìm hiểu các chiến lược để tìm ra hệ số cho toàn bộ phương trình.',
      embedUrl: 'https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations_vi.html',
    },
    {
      id: 'phet-ph-scale',
      title: 'Thang đo pH',
      description: 'Kiểm tra độ pH của các chất lỏng khác nhau như cà phê, nước bọt và xà phòng để xác định chúng là axit, bazơ hay trung tính.',
      embedUrl: 'https://phet.colorado.edu/sims/html/ph-scale-basics/latest/ph-scale-basics_vi.html',
    },
    {
      id: 'phet-build-a-molecule',
      title: 'Xây dựng một phân tử',
      description: 'Ghép các nguyên tử lại với nhau để tạo thành các phân tử như nước, oxy, carbon dioxide và nhiều hơn nữa!',
      embedUrl: 'https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule_vi.html',
    },
    {
      id: 'phet-concentration',
      title: 'Nồng độ',
      description: 'Pha các dung dịch có nồng độ khác nhau. Tìm hiểu mối quan hệ giữa lượng chất tan, thể tích dung môi và nồng độ.',
      embedUrl: 'https://phet.colorado.edu/sims/html/concentration/latest/concentration_vi.html',
    },
  ],
  'chem-quantum': [
    // Placeholder - find a relevant simulation
  ],

  // Toán học
  'math-concepts': [
    {
      id: 'phet-fraction-matcher',
      title: 'Ghép phân số',
      description: 'Ghép các hình dạng và số phân số để kiếm sao trong trò chơi phân số này.',
      embedUrl: 'https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher_vi.html',
    },
    {
      id: 'phet-graphing-lines',
      title: 'Vẽ đồ thị đường thẳng',
      description: 'Khám phá mối quan hệ giữa phương trình đường thẳng và đồ thị của nó. Thao tác với độ dốc và giao điểm y.',
      embedUrl: 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_vi.html',
    },
    {
      id: 'phet-area-builder',
      title: 'Xây dựng diện tích',
      description: 'Tạo các hình dạng với diện tích và chu vi cho trước. Tìm hiểu về mối quan hệ giữa diện tích và chu vi.',
      embedUrl: 'https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_vi.html',
    },
    {
      id: 'phet-vector-addition',
      title: 'Cộng vectơ',
      description: 'Tìm hiểu cách cộng các vectơ. Kéo các vectơ vào đồ thị, thay đổi độ lớn và hướng của chúng, và tìm tổng.',
      embedUrl: 'https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_vi.html',
    },
  ],
  'math-applications': [
    {
      id: 'phet-graphing-quadratics',
      title: 'Vẽ đồ thị hàm số bậc hai',
      description: 'Khám phá đồ thị của hàm số bậc hai. Thay đổi các hệ số trong phương trình và xem đồ thị thay đổi như thế nào.',
      embedUrl: 'https://phet.colorado.edu/sims/html/graphing-quadratics/latest/graphing-quadratics_vi.html',
    },
    {
      id: 'phet-plinko-probability',
      title: 'Xác suất Plinko',
      description: 'Thả các quả bóng qua một trường các chốt tam giác để xem chúng rơi vào các thùng bên dưới. Khám phá xác suất và phân phối chuẩn.',
      embedUrl: 'https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability_vi.html',
    },
    {
      id: 'phet-calculus-grapher',
      title: 'Vẽ đồ thị giải tích',
      description: 'Khám phá mối liên hệ giữa một hàm và đạo hàm của nó thông qua việc vẽ đồ thị.',
      embedUrl: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_vi.html',
    },
  ],

  // Khoa học Trái đất
  'earth-science-main': [
    {
      id: 'phet-plate-tectonics',
      title: 'Kiến tạo mảng',
      description: 'Khám phá cách các mảng kiến tạo di chuyển trên bề mặt Trái Đất. Thay đổi nhiệt độ, thành phần và độ dày của các mảng.',
      embedUrl: 'https://phet.colorado.edu/sims/html/plate-tectonics/latest/plate-tectonics_vi.html',
    },
    {
      id: 'phet-greenhouse-effect',
      title: 'Hiệu ứng nhà kính',
      description: 'Tìm hiểu xem hiệu ứng nhà kính ảnh hưởng đến nhiệt độ của Trái Đất như thế nào.',
      embedUrl: 'https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_vi.html',
    },
  ],

  // Sinh học
  'biology-main': [
    {
      id: 'phet-natural-selection',
      title: 'Chọn lọc tự nhiên',
      description: 'Khám phá cơ chế chọn lọc tự nhiên bằng cách điều khiển môi trường và gây ra các đột biến ở thỏ.',
      embedUrl: 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_vi.html',
    },
    {
      id: 'phet-gene-expression',
      title: 'Biểu hiện gen',
      description: 'Tìm hiểu về mối quan hệ giữa gen và các đặc điểm bằng cách quan sát các protein được tạo ra.',
      embedUrl: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_vi.html',
    },
  ],
};

// --- TEST/EXAM DATA ---

export const TEST_SUBJECTS: TestSubject[] = [
  { 
    id: 'test-math', 
    name: 'Toán', 
    icon: CalculatorIcon,
    description: 'Kiểm tra 15 phút, 1 tiết và đề thi học kỳ.',
    tags: ['15 Phút', '45 Phút', 'Học Kỳ'],
    color: 'bg-blue-500'
  },
  { 
    id: 'test-literature', 
    name: 'Ngữ văn', 
    icon: DocumentTextIcon,
    description: 'Đọc hiểu văn bản, Tiếng Việt và Làm văn.',
    tags: ['Đọc hiểu', 'Nghị luận', 'Tự sự'],
    color: 'bg-amber-500'
  },
  { 
    id: 'test-english', 
    name: 'Tiếng Anh', 
    icon: TowerIcon,
    description: 'Ngữ pháp, Từ vựng, Đọc hiểu và Viết.',
    tags: ['Grammar', 'Reading', 'Writing'],
    color: 'bg-rose-500'
  },
  { 
    id: 'test-science', 
    name: 'Khoa học tự nhiên', 
    icon: ScienceIcon,
    description: 'Lý - Hóa - Sinh tích hợp theo chương trình mới.',
    tags: ['KHTN 6-9', 'Trắc nghiệm', 'Thí nghiệm'],
    color: 'bg-green-500'
  },
  { 
    id: 'test-history-geo', 
    name: 'Lịch sử và Địa lí', 
    icon: HistoryIcon,
    description: 'Kiểm tra kiến thức Lịch sử và Địa lí.',
    tags: ['Lịch sử', 'Địa lí', 'Trắc nghiệm'],
    color: 'bg-orange-500'
  },
];

export const TEST_TYPES: TestType[] = [
    {
        id: '15-minute',
        name: 'Kiểm tra 15 phút',
        duration: '15 Phút',
        description: 'Bài kiểm tra ngắn để ôn tập kiến thức vừa học.',
        questionCount: 10,
        essayCount: 0,
        color: 'bg-sky-500'
    },
    {
        id: '45-minute',
        name: 'Kiểm tra 1 tiết',
        duration: '45 Phút',
        description: 'Bài kiểm tra định kỳ, bao gồm cả trắc nghiệm và tự luận.',
        questionCount: 25,
        essayCount: 2,
        color: 'bg-orange-500'
    },
    {
        id: 'semester',
        name: 'Thi Học kỳ',
        duration: '60-90 Phút',
        description: 'Đề thi tổng hợp kiến thức toàn học kỳ. Thời gian tuỳ môn học.',
        questionCount: 40,
        essayCount: 3,
        color: 'bg-purple-500'
    }
];

export const MOCK_EXAM_SUBJECTS: MockExamSubject[] = [
  { 
    id: 'mock-math', 
    name: 'Toán', 
    icon: CalculatorIcon,
    description: 'Đề thi thử vào 10, thi thử THPTQG.',
    tags: ['Thi vào 10', 'Chuyên Toán', '90 Phút'],
    color: 'bg-blue-500'
  },
  { 
    id: 'mock-literature', 
    name: 'Ngữ văn', 
    icon: DocumentTextIcon,
    description: 'Đề thi thử Văn vào lớp 10 các trường chuyên.',
    tags: ['Vào 10', 'Văn mẫu', '120 Phút'],
    color: 'bg-amber-500'
  },
  { 
    id: 'mock-english', 
    name: 'Tiếng Anh', 
    icon: TowerIcon,
    description: 'Đề thi thử chuẩn form vào lớp 10 và THPTQG.',
    tags: ['Đề chuyên', 'IELTS form', '60 Phút'],
    color: 'bg-rose-500'
  },
  { 
    id: 'mock-science', 
    name: 'Khoa học tự nhiên', 
    icon: ScienceIcon,
    description: 'Đề thi thử tổng hợp KHTN.',
    tags: ['Thi vào 10', 'Đánh giá năng lực'],
    color: 'bg-green-500'
  },
  { 
    id: 'mock-history-geo', 
    name: 'Lịch sử và Địa lí', 
    icon: HistoryIcon,
    description: 'Đề thi thử Sử - Địa.',
    tags: ['Thi vào 10', 'Tổng hợp'],
    color: 'bg-orange-500'
  },
];

export const TEST_GRADES: TestGrade[] = [
  { id: 'grade-6', name: 'Lớp 6' },
  { id: 'grade-7', name: 'Lớp 7' },
  { id: 'grade-8', name: 'Lớp 8' },
  { id: 'grade-9', name: 'Lớp 9' },
];

// --- SOUNDS ---
// Placeholder Base64 audio strings (silent/minimal) for UI feedback
export const CORRECT_ANSWER_SOUND = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACAgICAgICAgICAgICAgICA'; 
export const INCORRECT_ANSWER_SOUND = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACAgICAgICAgICAgICAgICA';

// --- PRACTICE LESSONS DATA ---
export const PRACTICE_LESSONS_DATA: Record<string, PracticeChapter[]> = {
    // Mathematics
    'sp-math-grade-6': [
        {
            id: 'sp-m6-c1',
            title: 'Chương 1: Tập hợp các số tự nhiên',
            lessons: [
                { id: 'sp-m6-l1', title: 'Tập hợp' },
                { id: 'sp-m6-l2', title: 'Cách ghi số tự nhiên' },
                { id: 'sp-m6-l3', title: 'Thứ tự trong tập hợp các số tự nhiên' },
                { id: 'sp-m6-l4', title: 'Phép cộng và phép trừ số tự nhiên' },
                { id: 'sp-m6-l5', title: 'Phép nhân và phép chia số tự nhiên' },
            ]
        },
        {
             id: 'sp-m6-c2',
            title: 'Chương 2: Tính chia hết trong tập hợp số tự nhiên',
            lessons: [
                { id: 'sp-m6-l6', title: 'Quan hệ chia hết và tính chất' },
                { id: 'sp-m6-l7', title: 'Dấu hiệu chia hết cho 2, 5' },
                { id: 'sp-m6-l8', title: 'Dấu hiệu chia hết cho 3, 9' },
                 { id: 'sp-m6-l9', title: 'Số nguyên tố' },
            ]
        }
    ],
    'sp-math-grade-7': [
        {
            id: 'sp-m7-c1',
            title: 'Chương 1: Số hữu tỉ',
            lessons: [
                { id: 'sp-m7-l1', title: 'Tập hợp các số hữu tỉ' },
                { id: 'sp-m7-l2', title: 'Cộng, trừ, nhân, chia số hữu tỉ' },
                { id: 'sp-m7-l3', title: 'Lũy thừa với số mũ tự nhiên của một số hữu tỉ' },
            ]
        },
        {
            id: 'sp-m7-c2',
            title: 'Chương 2: Số thực',
            lessons: [
                 { id: 'sp-m7-l4', title: 'Số vô tỉ. Căn bậc hai số học' },
                { id: 'sp-m7-l5', title: 'Số thực' },
            ]
        }
    ],
    // Literature
     'sp-literature-grade-6': [
        {
            id: 'sp-lit6-c1',
            title: 'Bài 1: Lắng nghe lịch sử nước mình',
            lessons: [
                { id: 'sp-lit6-l1', title: 'Thánh Gióng' },
                { id: 'sp-lit6-l2', title: 'Sự tích Hồ Gươm' },
            ]
        }
    ],
    'sp-literature-grade-7': [
        {
            id: 'sp-lit7-c1',
            title: 'Bài 1: Bầu trời tuổi thơ',
            lessons: [
                { id: 'sp-lit7-l1', title: 'Bầy chim chìa vôi' },
                { id: 'sp-lit7-l2', title: 'Đi lấy mật' },
            ]
        }
    ],
    // English
    'sp-english-grade-6': [
         {
            id: 'sp-eng6-c1',
            title: 'Unit 1: My New School',
            lessons: [
                { id: 'sp-eng6-l1', title: 'Vocabulary & Pronunciation' },
                { id: 'sp-eng6-l2', title: 'Grammar: Present Simple' },
            ]
        }
    ],
    'sp-english-grade-7': [
         {
            id: 'sp-eng7-c1',
            title: 'Unit 1: Hobbies',
            lessons: [
                { id: 'sp-eng7-l1', title: 'Vocabulary & Pronunciation' },
                { id: 'sp-eng7-l2', title: 'Grammar: Present Simple & Future Simple' },
            ]
        }
    ]
};
