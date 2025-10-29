import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const rooms = [
    { id: 1, code: "P101", area: 25, price: 2500000, status: "occupied", floor: 1, tenant: "Nguyễn Văn A" },
    { id: 2, code: "P102", area: 25, price: 2500000, status: "available", floor: 1, tenant: null },
    { id: 3, code: "P103", area: 30, price: 3000000, status: "occupied", floor: 1, tenant: "Trần Thị B" },
    { id: 4, code: "P201", area: 25, price: 2500000, status: "available", floor: 2, tenant: null },
    { id: 5, code: "P202", area: 25, price: 2500000, status: "occupied", floor: 2, tenant: "Lê Văn C" },
    { id: 6, code: "P203", area: 30, price: 3000000, status: "occupied", floor: 2, tenant: "Phạm Thị D" },
  ];

  const filteredRooms = rooms.filter(
    (room) =>
      room.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.tenant?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý phòng trọ</h1>
          <p className="mt-2 text-muted-foreground">Quản lý thông tin các phòng trọ</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm phòng mới
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo mã phòng hoặc tên khách thuê..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">Lọc</Button>
      </div>

      {/* Room Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Room Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{room.code}</h3>
                    <p className="text-sm text-muted-foreground">Tầng {room.floor}</p>
                  </div>
                  <Badge variant={room.status === "occupied" ? "default" : "secondary"}>
                    {room.status === "occupied" ? "Đang thuê" : "Trống"}
                  </Badge>
                </div>

                {/* Room Details */}
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Diện tích:</span>
                    <span className="font-medium text-foreground">{room.area}m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Giá thuê:</span>
                    <span className="font-semibold text-primary">{room.price.toLocaleString()}đ/tháng</span>
                  </div>
                  {room.tenant && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Khách thuê:</span>
                      <span className="font-medium text-foreground">{room.tenant}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-border pt-4">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Eye className="h-4 w-4" />
                    Xem
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Edit className="h-4 w-4" />
                    Sửa
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
