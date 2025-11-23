# Hướng dẫn triển khai ứng dụng lên Vercel (Cấu trúc Vite)

Với việc dự án đã được chuyển sang cấu trúc sử dụng Vite, quy trình triển khai lên Vercel trở nên cực kỳ đơn giản và chuẩn hóa. Vercel được thiết kế để nhận diện các dự án Vite một cách tự động.

---

### Bước 1: Chuẩn bị kho lưu trữ GitHub

Nếu bạn chưa đưa mã nguồn lên GitHub, hãy làm theo các bước sau:

1.  **Tạo một kho lưu trữ mới:**
    *   Trên GitHub, tạo một kho lưu trữ (repository) mới. Đặt tên cho nó, ví dụ: `onluyen-ai-tutor`.
    *   Đảm bảo nó là `Public`.

2.  **Tải mã nguồn của bạn lên:**
    *   Mở terminal (hoặc Git Bash trên Windows) tại thư mục dự án của bạn.
    *   Chạy các lệnh sau. Thay `<URL_KHO_LUU_TRU_CUA_BAN>` bằng URL bạn nhận được từ GitHub.
      ```bash
      git init -b main
      git add .
      git commit -m "Initial project setup with Vite"
      git remote add origin <URL_KHO_LUU_TRU_CUA_BAN>
      git push -u origin main
      ```

### Bước 2: Tạo tài khoản & Kết nối Vercel

1.  Truy cập [vercel.com](https://vercel.com).
2.  Nhấp vào **"Sign Up"** và chọn **"Continue with GitHub"**. Việc này sẽ liên kết tài khoản Vercel của bạn với GitHub, giúp quá trình triển khai diễn ra tự động.

### Bước 3: Tạo dự án mới trên Vercel

1.  Sau khi đăng nhập, bạn sẽ được đưa đến trang tổng quan (Dashboard).
2.  Nhấp vào nút **"Add New..."** và chọn **"Project"**.
3.  Vercel sẽ hiển thị danh sách các kho lưu trữ GitHub của bạn. Tìm kho lưu trữ `onluyen-ai-tutor` và nhấp vào nút **"Import"**.

### Bước 4: Cấu hình API Key và Triển khai

Đây là bước quan trọng nhất để sửa lỗi "màn hình trắng".

1.  Sau khi "Import", Vercel sẽ tự động nhận diện đây là một dự án **Vite**. Bạn không cần thay đổi bất kỳ cài đặt nào trong phần "Build & Development Settings".
2.  Mở rộng phần **"Environment Variables"** (Biến môi trường).
3.  Thêm một biến mới như sau:
    *   **NAME:** `VITE_API_KEY` (QUAN TRỌNG: Phải có tiền tố `VITE_`).
    *   **VALUE:** Dán chuỗi API Key Gemini của bạn vào đây.
4.  Nhấp vào nút **"Add"**.
5.  Cuối cùng, nhấp vào nút **"Deploy"**.

Vercel sẽ tự động chạy lệnh `npm install` để cài đặt các thư viện từ `package.json` và sau đó chạy `vite build` để build dự án của bạn. Quá trình này chỉ mất khoảng 1-2 phút.

### Bước 5: Hoàn tất!

Khi hoàn tất, Vercel sẽ hiển thị một màn hình chúc mừng. Bạn có thể nhấp vào URL được cung cấp để truy cập trang web đang hoạt động của mình.

Chúc mừng! Ứng dụng của bạn hiện đã được triển khai chuyên nghiệp và an toàn trên Vercel theo cách làm chuẩn nhất.