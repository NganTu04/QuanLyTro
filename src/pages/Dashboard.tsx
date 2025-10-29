import { Building2, Users, DollarSign, AlertCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Mock data
  const stats = {
    totalRooms: 24,
    occupiedRooms: 18,
    totalTenants: 22,
    monthlyRevenue: "45,600,000",
  };

  const recentActivities = [
    { id: 1, room: "P101", tenant: "Nguyễn Văn A", action: "Thanh toán tiền phòng", amount: "2,500,000", date: "28/10/2025" },
    { id: 2, room: "P203", tenant: "Trần Thị B", action: "Gia hạn hợp đồng", amount: "-", date: "27/10/2025" },
    { id: 3, room: "P305", tenant: "Lê Văn C", action: "Nhận phòng mới", amount: "3,000,000", date: "26/10/2025" },
  ];

  const overduePayments = [
    { id: 1, room: "P102", tenant: "Phạm Thị D", amount: "2,500,000", daysOverdue: 5 },
    { id: 2, room: "P207", tenant: "Hoàng Văn E", amount: "2,800,000", daysOverdue: 3 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tổng quan</h1>
        <p className="mt-2 text-muted-foreground">Xin chào! Đây là tổng quan về nhà trọ của bạn</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng số phòng"
          value={stats.totalRooms}
          icon={Building2}
          variant="default"
        />
        <StatCard
          title="Phòng đang thuê"
          value={stats.occupiedRooms}
          icon={Building2}
          trend={{ value: `${((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(0)}% đã cho thuê`, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Số khách thuê"
          value={stats.totalTenants}
          icon={Users}
          variant="info"
        />
        <StatCard
          title="Doanh thu tháng này"
          value={`${stats.monthlyRevenue}đ`}
          icon={DollarSign}
          trend={{ value: "+12% so với tháng trước", isPositive: true }}
          variant="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.room} - {activity.tenant}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{activity.amount !== "-" ? `${activity.amount}đ` : "-"}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Xem tất cả
            </Button>
          </CardContent>
        </Card>

        {/* Overdue Payments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Cảnh báo thanh toán</CardTitle>
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="h-3 w-3" />
                {overduePayments.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overduePayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between rounded-lg bg-destructive/10 p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {payment.room} - {payment.tenant}
                    </p>
                    <p className="text-xs text-muted-foreground">Quá hạn {payment.daysOverdue} ngày</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-destructive">{payment.amount}đ</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Nhắc nhở
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Tình trạng phòng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Phòng trống</span>
                <Badge variant="secondary">{stats.totalRooms - stats.occupiedRooms} phòng</Badge>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-secondary-foreground"
                  style={{ width: `${((stats.totalRooms - stats.occupiedRooms) / stats.totalRooms) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Đang thuê</span>
                <Badge className="bg-accent">{stats.occupiedRooms} phòng</Badge>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${(stats.occupiedRooms / stats.totalRooms) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sắp hết hạn</span>
                <Badge variant="outline">3 phòng</Badge>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-warning" style={{ width: "12.5%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
