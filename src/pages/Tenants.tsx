import { useState } from "react";
import { Plus, Search, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Tenants() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const tenants = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0912345678",
      email: "nguyenvana@email.com",
      room: "P101",
      citizenId: "001234567890",
      moveInDate: "01/01/2025",
      contractEnd: "01/01/2026",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@email.com",
      room: "P103",
      citizenId: "009876543210",
      moveInDate: "15/02/2025",
      contractEnd: "15/02/2026",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn C",
      phone: "0901234567",
      email: "levanc@email.com",
      room: "P202",
      citizenId: "001122334455",
      moveInDate: "10/03/2025",
      contractEnd: "10/12/2025",
      status: "expiring",
    },
  ];

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone.includes(searchTerm) ||
      tenant.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(-2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý khách thuê</h1>
          <p className="mt-2 text-muted-foreground">Thông tin và quản lý khách thuê trọ</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm khách mới
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên, số điện thoại hoặc mã phòng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">Lọc</Button>
      </div>

      {/* Tenants List */}
      <div className="space-y-4">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="border-b border-border bg-card pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                      {getInitials(tenant.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{tenant.name}</h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {tenant.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {tenant.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={tenant.status === "active" ? "default" : "secondary"}>
                    {tenant.status === "active" ? "Đang ở" : "Sắp hết hạn"}
                  </Badge>
                  <Badge variant="outline">{tenant.room}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">CCCD/CMND</p>
                  <p className="font-medium text-foreground">{tenant.citizenId}</p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Ngày vào ở
                  </p>
                  <p className="font-medium text-foreground">{tenant.moveInDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Hết hạn hợp đồng
                  </p>
                  <p className="font-medium text-foreground">{tenant.contractEnd}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2 border-t border-border pt-4">
                <Button variant="outline" size="sm">
                  Xem chi tiết
                </Button>
                <Button variant="outline" size="sm">
                  Sửa thông tin
                </Button>
                <Button variant="outline" size="sm">
                  Lịch sử thanh toán
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
