import { Home, Building2, Users, FileText, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: Home, label: "Tổng quan", path: "/" },
  { icon: Building2, label: "Quản lý phòng", path: "/rooms" },
  { icon: Users, label: "Khách thuê", path: "/tenants" },
  { icon: FileText, label: "Hóa đơn", path: "/invoices" },
  { icon: BarChart3, label: "Thống kê", path: "/statistics" },
  { icon: Settings, label: "Cài đặt", path: "/settings" },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="ml-3 text-xl font-bold text-foreground">Quản lý nhà trọ</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-semibold">CT</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-foreground">Chủ trọ</p>
                <p className="truncate text-xs text-muted-foreground">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
