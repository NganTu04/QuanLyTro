import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Activities() {
  const navigate = useNavigate();

  const activities = [
    { id: 1, room: "P101", tenant: "Nguyễn Văn A", action: "Thanh toán tiền phòng", amount: "2,500,000", date: "28/10/2025" },
    { id: 2, room: "P203", tenant: "Trần Thị B", action: "Gia hạn hợp đồng", amount: "-", date: "27/10/2025" },
    { id: 3, room: "P305", tenant: "Lê Văn C", action: "Nhận phòng mới", amount: "3,000,000", date: "26/10/2025" },
    { id: 4, room: "P102", tenant: "Phạm Thị D", action: "Quá hạn thanh toán", amount: "2,500,000", date: "23/10/2025" },
    { id: 5, room: "P207", tenant: "Hoàng Văn E", action: "Nhắc nhở thanh toán", amount: "2,800,000", date: "22/10/2025" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tất cả hoạt động</h1>
          <p className="mt-2 text-muted-foreground">Nhật ký sự kiện gần đây trong hệ thống</p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hoạt động</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
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
        </CardContent>
      </Card>
    </div>
  );
}


