# Photo Picsum — Hướng dẫn chạy

Ứng dụng React nhỏ hiển thị ảnh từ Lorem Picsum, có infinite scroll và trang chi tiết ảnh.

Tính năng
- Danh sách ảnh responsive (grid)
- Infinite scroll (tải thêm khi cuộn)
- Trang chi tiết ảnh (/photos/:id) hiển thị ảnh full, tác giả, kích thước và mô tả (placeholder nếu không có)
- Sử dụng Bootstrap cho layout và styles

Yêu cầu
- Node.js (thường >= 16, khuyến nghị LTS)
- npm

Cài đặt
Mở PowerShell trong thư mục dự án và chạy:

```powershell
npm install
```

Chạy ở môi trường phát triển (dev)

```powershell
npm run dev
```

Mở trình duyệt tại: http://localhost:5173/photos


Routes chính
- `/photos` — trang danh sách ảnh (infinite scroll)
- `/photos/:id` — trang chi tiết ảnh

