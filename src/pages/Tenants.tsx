import { useMemo, useState } from "react";
import { Plus, Search, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

export default function Tenants() {
  const [searchTerm, setSearchTerm] = useState("");

  // State danh sách khách thuê (mock dữ liệu ban đầu)
  const [tenants, setTenants] = useState(
    () => [
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
    ],
  );

  const filteredTenants = useMemo(
    () =>
      tenants.filter(
        (tenant) =>
          tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tenant.phone.includes(searchTerm) ||
          tenant.room.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [tenants, searchTerm],
  );

  // State cho dialog và dữ liệu đang chọn
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<typeof tenants[number] | null>(null);

  // State form edit/add
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRoom, setFormRoom] = useState("");
  const [formCitizenId, setFormCitizenId] = useState("");
  const [formMoveInDate, setFormMoveInDate] = useState("");
  const [formContractEnd, setFormContractEnd] = useState("");
  const [formStatus, setFormStatus] = useState<"active" | "expiring">("active");

  const openViewDialog = (tenant: typeof tenants[number]) => {
    setSelectedTenant(tenant);
    setOpenView(true);
  };

  const openEditDialog = (tenant: typeof tenants[number]) => {
    setSelectedTenant(tenant);
    setFormName(tenant.name);
    setFormPhone(tenant.phone);
    setFormEmail(tenant.email);
    setFormRoom(tenant.room);
    setFormCitizenId(tenant.citizenId);
    setFormMoveInDate(tenant.moveInDate);
    setFormContractEnd(tenant.contractEnd);
    setFormStatus(tenant.status as any);
    setOpenEdit(true);
  };

  const openAddDialog = () => {
    setSelectedTenant(null);
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormRoom("");
    setFormCitizenId("");
    setFormMoveInDate("");
    setFormContractEnd("");
    setFormStatus("active");
    setOpenAdd(true);
  };

  const onSaveEdit = () => {
    if (!selectedTenant) return;
    setTenants((prev) =>
      prev.map((t) =>
        t.id === selectedTenant.id
          ? {
              ...t,
              name: formName.trim(),
              phone: formPhone.trim(),
              email: formEmail.trim(),
              room: formRoom.trim(),
              citizenId: formCitizenId.trim(),
              moveInDate: formMoveInDate.trim(),
              contractEnd: formContractEnd.trim(),
              status: formStatus,
            }
          : t,
      ),
    );
    setOpenEdit(false);
    toast("Đã lưu thông tin khách thuê");
  };

  const onSaveAdd = () => {
    if (!formName.trim() || !formPhone.trim() || !formRoom.trim()) {
      toast("Vui lòng nhập tối thiểu Tên, Số điện thoại và Mã phòng");
      return;
    }
    const nextId = tenants.reduce((m, t) => Math.max(m, t.id), 0) + 1;
    const created = {
      id: nextId,
      name: formName.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim(),
      room: formRoom.trim(),
      citizenId: formCitizenId.trim(),
      moveInDate: formMoveInDate.trim() || "",
      contractEnd: formContractEnd.trim() || "",
      status: formStatus,
    } as typeof tenants[number];
    setTenants((prev) => [...prev, created]);
    setOpenAdd(false);
    toast(`Đã thêm khách thuê ${created.name}`);
  };

  const openHistoryDialog = (tenant: typeof tenants[number]) => {
    setSelectedTenant(tenant);
    setOpenHistory(true);
  };

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
        <Button className="gap-2" onClick={openAddDialog}>
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
                <Button variant="outline" size="sm" onClick={() => openViewDialog(tenant)}>
                  Xem chi tiết
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEditDialog(tenant)}>
                  Sửa thông tin
                </Button>
                <Button variant="outline" size="sm" onClick={() => openHistoryDialog(tenant)}>
                  Lịch sử thanh toán
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Tenant Dialog */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin khách thuê</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Họ tên</span><span className="font-medium">{selectedTenant.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">SĐT</span><span className="font-medium">{selectedTenant.phone}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{selectedTenant.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phòng</span><span className="font-medium">{selectedTenant.room}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">CCCD/CMND</span><span className="font-medium">{selectedTenant.citizenId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Ngày vào ở</span><span className="font-medium">{selectedTenant.moveInDate || "-"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Hết hạn HĐ</span><span className="font-medium">{selectedTenant.contractEnd || "-"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Trạng thái</span><span className="font-medium">{selectedTenant.status === "active" ? "Đang ở" : "Sắp hết hạn"}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sửa thông tin khách thuê</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Họ tên</Label>
              <Input id="name" className="col-span-3" value={formName} onChange={(e) => setFormName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">SĐT</Label>
              <Input id="phone" className="col-span-3" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" className="col-span-3" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">Phòng</Label>
              <Input id="room" className="col-span-3" value={formRoom} onChange={(e) => setFormRoom(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="citizenId" className="text-right">CCCD/CMND</Label>
              <Input id="citizenId" className="col-span-3" value={formCitizenId} onChange={(e) => setFormCitizenId(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="moveInDate" className="text-right">Ngày vào ở</Label>
              <Input id="moveInDate" className="col-span-3" placeholder="dd/mm/yyyy" value={formMoveInDate} onChange={(e) => setFormMoveInDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contractEnd" className="text-right">Hết hạn HĐ</Label>
              <Input id="contractEnd" className="col-span-3" placeholder="dd/mm/yyyy" value={formContractEnd} onChange={(e) => setFormContractEnd(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Trạng thái</Label>
              <select id="status" className="col-span-3 rounded-md border border-input bg-background p-2" value={formStatus} onChange={(e) => setFormStatus(e.target.value as any)}>
                <option value="active">Đang ở</option>
                <option value="expiring">Sắp hết hạn</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenEdit(false)}>Hủy</Button>
            <Button onClick={onSaveEdit}>Lưu</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Tenant Dialog */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm khách mới</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">Họ tên</Label>
              <Input id="new-name" className="col-span-3" value={formName} onChange={(e) => setFormName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-phone" className="text-right">SĐT</Label>
              <Input id="new-phone" className="col-span-3" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-email" className="text-right">Email</Label>
              <Input id="new-email" className="col-span-3" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-room" className="text-right">Phòng</Label>
              <Input id="new-room" className="col-span-3" value={formRoom} onChange={(e) => setFormRoom(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-citizenId" className="text-right">CCCD/CMND</Label>
              <Input id="new-citizenId" className="col-span-3" value={formCitizenId} onChange={(e) => setFormCitizenId(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-moveInDate" className="text-right">Ngày vào ở</Label>
              <Input id="new-moveInDate" className="col-span-3" placeholder="dd/mm/yyyy" value={formMoveInDate} onChange={(e) => setFormMoveInDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-contractEnd" className="text-right">Hết hạn HĐ</Label>
              <Input id="new-contractEnd" className="col-span-3" placeholder="dd/mm/yyyy" value={formContractEnd} onChange={(e) => setFormContractEnd(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-status" className="text-right">Trạng thái</Label>
              <select id="new-status" className="col-span-3 rounded-md border border-input bg-background p-2" value={formStatus} onChange={(e) => setFormStatus(e.target.value as any)}>
                <option value="active">Đang ở</option>
                <option value="expiring">Sắp hết hạn</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenAdd(false)}>Hủy</Button>
            <Button onClick={onSaveAdd}>Thêm</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment History Dialog */}
      <Dialog open={openHistory} onOpenChange={setOpenHistory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lịch sử thanh toán {selectedTenant ? `- ${selectedTenant.name}` : ""}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            {/* Dữ liệu mẫu */}
            <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">10/10/2025</span><span className="font-medium">2.500.000đ</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">10/09/2025</span><span className="font-medium">2.500.000đ</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">10/08/2025</span><span className="font-medium">2.500.000đ</span></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
