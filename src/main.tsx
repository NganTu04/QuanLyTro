import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Khởi tạo ứng dụng React:
// - Lấy phần tử DOM có id="root" từ index.html
// - Tạo React Root và render component App (điểm vào chính của ứng dụng)
createRoot(document.getElementById("root")!).render(<App />);
