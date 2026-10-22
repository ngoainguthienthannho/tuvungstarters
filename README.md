# Vườn từ vựng Starters

Website tự học từ vựng Cambridge Starters dành cho thiếu nhi.

Đây là bản web tĩnh; xuất bản bằng GitHub Pages từ nhánh `main`, thư mục gốc (`/`). Không cần bước build hay khóa API.

Bao gồm hình ảnh, bộ âm thanh và quy trình học 5 bước. Tiến bộ được lưu trong trình duyệt theo tên miền website.

## Cánh đồng hoa

Mỗi từ mới được đánh dấu đã thuộc hoặc vượt qua lượt nhớ lại độc lập (đã học nghĩa) nhận một bông hoa, tối đa một hoa cho mỗi từ. Hoa là phần thưởng lâu dài; ôn lại hoặc bật/tắt đã thuộc không cộng trùng. Vườn, vị trí trồng và tiến bộ được lưu cùng dữ liệu trình duyệt. Không có máy chủ hoặc tài khoản trò chơi.

Cảnh 3D dùng Three.js 0.186.1, lưu tại `vendor/three/` với giấy phép MIT đi kèm; không cần CDN. Nếu WebGL không khả dụng, các ô đất vẫn sử dụng được bằng nút.

Khi đến hạn ôn (hoặc cần luyện lại), từ không còn tính là đã thuộc và hoa héo. Tưới hoa bằng cách gõ đúng xác nhận lượt ôn, làm tươi hoa và cập nhật lịch; tưới trước hạn không hoãn lịch cũ. Ba lỗi gõ liên tiếp của cùng một từ được lưu lại và hiện gợi ý học lại từ bước nghe. Lượt nhớ lại độc lập đúng hoặc tưới đúng sẽ xóa chuỗi lỗi.
