import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Tenants from "./pages/Tenants";
import NotFound from "./pages/NotFound";
import Activities from "./pages/Activities";
import Invoices from "./pages/Invoices";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

// Khởi tạo QueryClient để quản lý cache và trạng thái bất đồng bộ (React Query)
const queryClient = new QueryClient();

// Ứng dụng chính:
// - Bọc toàn bộ app trong QueryClientProvider (React Query)
// - Cung cấp TooltipProvider và hai hệ thống toast (shadcn Toaster và sonner)
// - Thiết lập định tuyến bằng react-router-dom
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/activities" element={<Layout><Activities /></Layout>} />
          <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
          <Route path="/tenants" element={<Layout><Tenants /></Layout>} />
          <Route path="/invoices" element={<Layout><Invoices /></Layout>} />
          <Route path="/statistics" element={<Layout><Statistics /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          {/* Các route mới nên được thêm phía trên route bắt tất cả "*" */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
