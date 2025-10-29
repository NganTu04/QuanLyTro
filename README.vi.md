Tài liệu tiếng Việt – Tổng quan dự án tro-quan-ly-xanh

Dự án là một ứng dụng React + TypeScript được scaffold bằng Vite, sử dụng hệ thống UI shadcn-ui (dựa trên Radix UI + Tailwind CSS) và quản lý truy vấn bằng @tanstack/react-query.

## Công nghệ chính
- Vite: công cụ build/dev server nhanh cho React + TS.
- React 18 + TypeScript: UI và type an toàn.
- shadcn-ui + Radix UI + Tailwind CSS: hệ thống component có thể tùy biến.
- React Router: điều hướng giữa các trang.
- @tanstack/react-query: quản lý trạng thái bất đồng bộ (data fetching, cache).

## Cấu trúc thư mục
- `src/main.tsx`: Điểm vào ứng dụng, mount React vào DOM và nạp `App`.
- `src/App.tsx`: Khởi tạo `QueryClientProvider`, `TooltipProvider`, hiển thị `Toaster` và định nghĩa router.
- `src/components/`: Component chia sẻ
  - `Layout.tsx`: khung bố cục bao quanh các trang.
  - `StatCard.tsx`: thẻ hiển thị số liệu.
  - `components/ui/*`: tập hợp component UI (button, card, dialog, accordion, ...).
- `src/pages/`: Các trang chính (Dashboard, Rooms, Tenants, NotFound).
- `src/lib/utils.ts`: Tiện ích `cn` để gộp class Tailwind an toàn.
- `index.html`: template HTML cho Vite.

## Luồng chạy chính
1. Trình duyệt tải `index.html` → Vite chèn bundle.
2. `src/main.tsx` gọi `createRoot(...).render(<App />)`.
3. `App.tsx` bọc toàn ứng dụng với các provider (query, tooltip, toaster) và thiết lập các tuyến (route) sử dụng `react-router-dom`.
4. Người dùng điều hướng các route → `Layout` bọc trang → trang cụ thể render các component UI.

## Styling
- Tailwind CSS: utility-first, cấu hình trong `tailwind.config.ts` và `postcss.config.js`.
- `src/index.css` + `src/App.css`: nơi import style và khai báo token/biến cần thiết.

## Alias đường dẫn
- Alias `@` trỏ tới `src`, cấu hình trong `vite.config.ts` và `tsconfig.app.json`.
- Ví dụ: `import { Button } from "@/components/ui/button"`.

## Build và chạy
- Cài đặt: `npm install` (đã cài sẵn trong repo này).
- Dev: `npm run dev` → mở `http://localhost:8080`.
- Build: `npm run build` → tạo output sản xuất (production) trong `dist/`.
- Preview: `npm run preview` để xem trước build.

## Ghi chú về UI shadcn/Radix
- Các component trong `src/components/ui/*` là wrapper/adapter của shadcn dựa trên Radix UI primitive, ví dụ `accordion`, `dialog`, `select`, v.v…
- Mẫu chung: import primitive từ `@radix-ui/…`, kết hợp Tailwind class và tiện ích `cn` để tạo component có style nhất quán.

## Nơi cần quan tâm khi mở rộng
- Thêm route mới: cập nhật trong `App.tsx` (bên trong `Routes`).
- Tạo component UI mới: theo mẫu trong `src/components/ui/*`.
- Gọi API/Query: dùng `@tanstack/react-query`, tạo hook riêng trong `src/hooks` (nếu cần) và bọc bởi `QueryClientProvider` (đã sẵn có).

## Bảo trì & lint/typecheck
- TypeScript: `npx tsc --noEmit` để kiểm tra type.
- ESLint: `npx eslint .` để kiểm tra style/lỗi code.


