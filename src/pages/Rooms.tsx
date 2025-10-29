import { useMemo, useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");

  // State danh sách phòng (mock dữ liệu ban đầu)
  const [rooms, setRooms] = useState(
    () => [
      { id: 1, code: "P101", area: 25, price: 2500000, status: "occupied", floor: 1, tenant: "Nguyễn Văn A" },
      { id: 2, code: "P102", area: 25, price: 2500000, status: "available", floor: 1, tenant: null },
      { id: 3, code: "P103", area: 30, price: 3000000, status: "occupied", floor: 1, tenant: "Trần Thị B" },
      { id: 4, code: "P201", area: 25, price: 2500000, status: "available", floor: 2, tenant: null },
      { id: 5, code: "P202", area: 25, price: 2500000, status: "occupied", floor: 2, tenant: "Lê Văn C" },
      { id: 6, code: "P203", area: 30, price: 3000000, status: "occupied", floor: 2, tenant: "Phạm Thị D" },
    ] as Array<{
      id: number;
      code: string;
      area: number;
      price: number;
      status: "occupied" | "available";
      floor: number;
      tenant: string | null;
    }>,
  );

  const filteredRooms = useMemo(
    () =>
      rooms.filter(
        (room) =>
          room.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.tenant?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [rooms, searchTerm],
  );

  // State cho xem/sửa
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[number] | null>(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [editCode, setEditCode] = useState("");
  const [editAreaStr, setEditAreaStr] = useState("");
  const [editPriceStr, setEditPriceStr] = useState("");
  const [editFloor, setEditFloor] = useState(1);
  const [editStatus, setEditStatus] = useState<"occupied" | "available">("available");
  const [editTenant, setEditTenant] = useState<string | null>(null);

  // State cho thêm mới
  const [newCode, setNewCode] = useState("");
  const [newAreaStr, setNewAreaStr] = useState("");
  const [newPriceStr, setNewPriceStr] = useState("");
  const [newFloor, setNewFloor] = useState(1);
  const [newStatus, setNewStatus] = useState<"occupied" | "available">("available");
  const [newTenant, setNewTenant] = useState<string | null>(null);

  // Helpers: format và parse số theo bàn phím (cho phép dấu . , khoảng trắng)
  const formatNumber = (n: number) => (Number.isFinite(n) ? n.toLocaleString("vi-VN") : "");
  const parseNumber = (s: string) => {
    const digits = (s ?? "").toString().replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const onView = (room: typeof rooms[number]) => {
    setSelectedRoom(room);
    setOpenView(true);
  };

  const onEdit = (room: typeof rooms[number]) => {
    setSelectedRoom(room);
    setEditCode(room.code);
    setEditAreaStr(formatNumber(room.area));
    setEditPriceStr(formatNumber(room.price));
    setEditFloor(room.floor);
    setEditStatus(room.status);
    setEditTenant(room.tenant ?? "");
    setOpenEdit(true);
  };

  const onDelete = (room: typeof rooms[number]) => {
    const ok = window.confirm(`Bạn có chắc chắn muốn xóa phòng ${room.code}?`);
    if (!ok) return;
    setRooms((prev) => prev.filter((r) => r.id !== room.id));
    toast(`Đã xóa phòng ${room.code}`);
  };

  const onSaveEdit = () => {
    if (!selectedRoom) return;
    const area = parseNumber(editAreaStr);
    const price = parseNumber(editPriceStr);
    setRooms((prev) =>
      prev.map((r) =>
        r.id === selectedRoom.id
          ? {
              ...r,
              code: editCode.trim(),
              area,
              price,
              floor: Number(editFloor) || 1,
              status: editStatus,
              tenant: editStatus === "occupied" ? (editTenant && editTenant.trim() ? editTenant.trim() : r.tenant) : null,
            }
          : r,
      ),
    );
    setOpenEdit(false);
    toast("Lưu thay đổi phòng thành công");
  };

  const onSaveAdd = () => {
    const code = newCode.trim();
    if (!code) {
      toast("Vui lòng nhập mã phòng");
      return;
    }
    const nextId = rooms.reduce((max, r) => Math.max(max, r.id), 0) + 1;
    const created = {
      id: nextId,
      code,
      area: parseNumber(newAreaStr),
      price: parseNumber(newPriceStr),
      floor: Number(newFloor) || 1,
      status: newStatus,
      tenant: newStatus === "occupied" ? (newTenant && newTenant.trim() ? newTenant.trim() : null) : null,
    } as typeof rooms[number];
    setRooms((prev) => [...prev, created]);
    setOpenAdd(false);
    // reset form
    setNewCode("");
    setNewAreaStr("");
    setNewPriceStr("");
    setNewFloor(1);
    setNewStatus("available");
    setNewTenant(null);
    toast(`Đã thêm phòng ${created.code}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý phòng trọ</h1>
          <p className="mt-2 text-muted-foreground">Quản lý thông tin các phòng trọ</p>
        </div>
        <Button className="gap-2" onClick={() => setOpenAdd(true)}>
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
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => onView(room)}>
                    <Eye className="h-4 w-4" />
                    Xem
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => onEdit(room)}>
                    <Edit className="h-4 w-4" />
                    Sửa
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => onDelete(room)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Xóa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Dialog */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin phòng {selectedRoom?.code}</DialogTitle>
          </DialogHeader>
          {selectedRoom && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Tầng</span><span className="font-medium">{selectedRoom.floor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Diện tích</span><span className="font-medium">{selectedRoom.area}m²</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Giá thuê</span><span className="font-semibold text-primary">{selectedRoom.price.toLocaleString()}đ/tháng</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Trạng thái</span><span className="font-medium">{selectedRoom.status === "occupied" ? "Đang thuê" : "Trống"}</span></div>
              {selectedRoom.tenant && (
                <div className="flex justify-between"><span className="text-muted-foreground">Khách thuê</span><span className="font-medium">{selectedRoom.tenant}</span></div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sửa thông tin phòng {selectedRoom?.code}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">Mã phòng</Label>
              <Input id="code" className="col-span-3" value={editCode} onChange={(e) => setEditCode(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="floor" className="text-right">Tầng</Label>
              <Input id="floor" type="number" className="col-span-3" value={editFloor} onChange={(e) => setEditFloor(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="area" className="text-right">Diện tích (m²)</Label>
              <Input
                id="area"
                className="col-span-3"
                inputMode="numeric"
                value={editAreaStr}
                onChange={(e) => setEditAreaStr(e.target.value)}
                onBlur={() => setEditAreaStr(formatNumber(parseNumber(editAreaStr)))}
                placeholder="vd: 25"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Giá thuê (đ/tháng)</Label>
              <Input
                id="price"
                className="col-span-3"
                inputMode="numeric"
                value={editPriceStr}
                onChange={(e) => setEditPriceStr(e.target.value)}
                onBlur={() => setEditPriceStr(formatNumber(parseNumber(editPriceStr)))}
                placeholder="vd: 2.500.000"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Trạng thái</Label>
              <select id="status" className="col-span-3 rounded-md border border-input bg-background p-2" value={editStatus} onChange={(e) => setEditStatus(e.target.value as any)}>
                <option value="available">Trống</option>
                <option value="occupied">Đang thuê</option>
              </select>
            </div>
            {editStatus === "occupied" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenant" className="text-right">Khách thuê</Label>
                <Input id="tenant" className="col-span-3" value={editTenant ?? ""} onChange={(e) => setEditTenant(e.target.value)} />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenEdit(false)}>Hủy</Button>
            <Button onClick={onSaveEdit}>Lưu</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm phòng mới</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-code" className="text-right">Mã phòng</Label>
              <Input id="new-code" className="col-span-3" value={newCode} onChange={(e) => setNewCode(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-floor" className="text-right">Tầng</Label>
              <Input id="new-floor" type="number" className="col-span-3" value={newFloor} onChange={(e) => setNewFloor(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-area" className="text-right">Diện tích (m²)</Label>
              <Input
                id="new-area"
                className="col-span-3"
                inputMode="numeric"
                value={newAreaStr}
                onChange={(e) => setNewAreaStr(e.target.value)}
                onBlur={() => setNewAreaStr(formatNumber(parseNumber(newAreaStr)))}
                placeholder="vd: 25"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-price" className="text-right">Giá thuê (đ/tháng)</Label>
              <Input
                id="new-price"
                className="col-span-3"
                inputMode="numeric"
                value={newPriceStr}
                onChange={(e) => setNewPriceStr(e.target.value)}
                onBlur={() => setNewPriceStr(formatNumber(parseNumber(newPriceStr)))}
                placeholder="vd: 2.500.000"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-status" className="text-right">Trạng thái</Label>
              <select id="new-status" className="col-span-3 rounded-md border border-input bg-background p-2" value={newStatus} onChange={(e) => setNewStatus(e.target.value as any)}>
                <option value="available">Trống</option>
                <option value="occupied">Đang thuê</option>
              </select>
            </div>
            {newStatus === "occupied" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-tenant" className="text-right">Khách thuê</Label>
                <Input id="new-tenant" className="col-span-3" value={newTenant ?? ""} onChange={(e) => setNewTenant(e.target.value)} />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenAdd(false)}>Hủy</Button>
            <Button onClick={onSaveAdd}>Thêm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
