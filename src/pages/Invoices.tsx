import { useMemo, useState } from "react";
import { Plus, Search, Eye, Edit, Trash2, CheckCircle2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type InvoiceStatus = "unpaid" | "paid" | "overdue";

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | InvoiceStatus>("all");

  // State danh sách hóa đơn (mock ban đầu)
  const [invoices, setInvoices] = useState(
    () => [
      { id: 1, room: "P101", tenant: "Nguyễn Văn A", amount: 2500000, dueDate: "10/11/2025", status: "unpaid" as InvoiceStatus },
      { id: 2, room: "P203", tenant: "Phạm Thị D", amount: 3000000, dueDate: "10/11/2025", status: "overdue" as InvoiceStatus },
      { id: 3, room: "P103", tenant: "Trần Thị B", amount: 2500000, dueDate: "10/10/2025", status: "paid" as InvoiceStatus },
    ],
  );

  const filtered = useMemo(() => {
    const text = searchTerm.toLowerCase();
    return invoices.filter((iv) => {
      const matchesText = iv.room.toLowerCase().includes(text) || iv.tenant.toLowerCase().includes(text) || iv.status.includes(text as any);
      const matchesStatus = statusFilter === "all" ? true : iv.status === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [invoices, searchTerm, statusFilter]);

  // State dialog
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selected, setSelected] = useState<typeof invoices[number] | null>(null);

  // Helpers format/parse số
  const formatNumber = (n: number) => (Number.isFinite(n) ? n.toLocaleString("vi-VN") : "");
  const parseNumber = (s: string) => {
    const digits = (s ?? "").toString().replace(/[^0-9]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  // Form state
  const [formRoom, setFormRoom] = useState("");
  const [formTenant, setFormTenant] = useState("");
  const [formAmountStr, setFormAmountStr] = useState("");
  const [formDue, setFormDue] = useState("");
  const [formStatus, setFormStatus] = useState<InvoiceStatus>("unpaid");

  const openViewDialog = (iv: typeof invoices[number]) => {
    setSelected(iv);
    setOpenView(true);
  };

  const openEditDialog = (iv: typeof invoices[number]) => {
    setSelected(iv);
    setFormRoom(iv.room);
    setFormTenant(iv.tenant);
    setFormAmountStr(formatNumber(iv.amount));
    setFormDue(iv.dueDate);
    setFormStatus(iv.status);
    setOpenEdit(true);
  };

  const openAddDialog = () => {
    setSelected(null);
    setFormRoom("");
    setFormTenant("");
    setFormAmountStr("");
    setFormDue("");
    setFormStatus("unpaid");
    setOpenAdd(true);
  };

  const onSaveEdit = () => {
    if (!selected) return;
    const amount = parseNumber(formAmountStr);
    setInvoices((prev) =>
      prev.map((iv) =>
        iv.id === selected.id
          ? { ...iv, room: formRoom.trim(), tenant: formTenant.trim(), amount, dueDate: formDue.trim(), status: formStatus }
          : iv,
      ),
    );
    setOpenEdit(false);
    toast("Đã lưu hóa đơn");
  };

  const onSaveAdd = () => {
    if (!formRoom.trim() || !formTenant.trim()) {
      toast("Vui lòng nhập Phòng và Khách thuê");
      return;
    }
    const amount = parseNumber(formAmountStr);
    const nextId = invoices.reduce((m, x) => Math.max(m, x.id), 0) + 1;
    const created = {
      id: nextId,
      room: formRoom.trim(),
      tenant: formTenant.trim(),
      amount,
      dueDate: formDue.trim() || "",
      status: formStatus,
    } as typeof invoices[number];
    setInvoices((prev) => [...prev, created]);
    setOpenAdd(false);
    toast("Đã tạo hóa đơn mới");
  };

  const onMarkPaid = (iv: typeof invoices[number]) => {
    if (iv.status === "paid") return;
    setInvoices((prev) => prev.map((x) => (x.id === iv.id ? { ...x, status: "paid" as InvoiceStatus } : x)));
    toast(`Đã ghi nhận thanh toán cho ${iv.tenant}`);
  };

  const onDelete = (iv: typeof invoices[number]) => {
    const ok = window.confirm(`Xóa hóa đơn phòng ${iv.room} - ${iv.tenant}?`);
    if (!ok) return;
    setInvoices((prev) => prev.filter((x) => x.id !== iv.id));
    toast("Đã xóa hóa đơn");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hóa đơn</h1>
          <p className="mt-2 text-muted-foreground">Quản lý hóa đơn tiền phòng</p>
        </div>
        <Button className="gap-2" onClick={openAddDialog}>
          <Plus className="h-4 w-4" />
          Tạo hóa đơn
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên khách, số phòng hoặc trạng thái..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: "all", label: "Tất cả" },
            { key: "unpaid", label: "Chưa thanh toán" },
            { key: "paid", label: "Đã thanh toán" },
            { key: "overdue", label: "Quá hạn" },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={statusFilter === (tab.key as any) ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(tab.key as any)}
              className="rounded-full"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách hóa đơn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((iv) => (
              <div
                key={iv.id}
                className="grid grid-cols-1 sm:grid-cols-12 items-start gap-3 rounded-md border border-border p-3"
              >
                {/* Left: room + tenant (clickable room to view) */}
                <div className="sm:col-span-4">
                  <button
                    className="font-semibold text-foreground hover:underline"
                    onClick={() => openViewDialog(iv)}
                  >
                    {iv.room}
                  </button>
                  <div className="text-sm text-foreground">{iv.tenant}</div>
                  <div className="text-xs text-muted-foreground">Hóa đơn tiền phòng tháng này</div>
                </div>

                {/* Middle: amount + due date */}
                <div className="sm:col-span-4">
                  <div className="font-bold text-emerald-600">{iv.amount.toLocaleString()}đ</div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {iv.dueDate || "-"}
                  </div>
                </div>

                {/* Right: status + actions */}
                <div className="sm:col-span-4 flex items-center justify-between sm:justify-end gap-4">
                  <div className="shrink-0">
                    <span
                      className={
                        iv.status === "paid"
                          ? "inline-flex items-center rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200"
                          : iv.status === "overdue"
                          ? "inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-200"
                          : "inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200"
                      }
                    >
                      {iv.status === "paid" ? "Đã thanh toán" : iv.status === "overdue" ? "Quá hạn" : "Chưa thanh toán"}
                    </span>
                  </div>
                  <div className="flex flex-nowrap items-center gap-2 sm:ml-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openViewDialog(iv)} className="h-8 w-8 p-0 shrink-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Xem chi tiết</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(iv)} className="h-8 w-8 p-0 shrink-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Sửa hóa đơn</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onMarkPaid(iv)}
                          disabled={iv.status === "paid"}
                          className="text-emerald-600 h-8 w-8 p-0 shrink-0"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Ghi nhận thanh toán</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => onDelete(iv)} className="text-destructive h-8 w-8 p-0 shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Xóa hóa đơn</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết hóa đơn</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="rounded-md border border-border">
              {/* header row to mirror list columns */}
              <div className="hidden sm:grid grid-cols-12 items-center gap-2 border-b border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                <div className="col-span-2">Phòng</div>
                <div className="col-span-3">Khách thuê</div>
                <div className="col-span-2">Số tiền</div>
                <div className="col-span-2">Hạn thanh toán</div>
                <div className="col-span-1">Trạng thái</div>
                <div className="col-span-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 p-3">
                <div className="sm:col-span-2 font-medium text-foreground">{selected.room}</div>
                <div className="sm:col-span-3 text-foreground">{selected.tenant}</div>
                <div className="sm:col-span-2 font-semibold text-primary min-w-0 truncate">{selected.amount.toLocaleString()}đ</div>
                <div className="sm:col-span-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {selected.dueDate || "-"}
                </div>
                <div className="sm:col-span-1">
                  <Badge variant={selected.status === "paid" ? "default" : selected.status === "overdue" ? "destructive" : "secondary"}>
                    {selected.status === "paid" ? "Đã thanh toán" : selected.status === "overdue" ? "Quá hạn" : "Chưa thanh toán"}
                  </Badge>
                </div>
                <div className="sm:col-span-2"></div>
              </div>
              <div className="border-t border-border p-3 text-sm text-muted-foreground">
                Thông tin hiển thị theo cùng độ rộng và lưới 12 cột như danh sách để đảm bảo nhất quán giao diện.
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sửa hóa đơn</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">Phòng</Label>
              <Input id="room" className="col-span-3" value={formRoom} onChange={(e) => setFormRoom(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenant" className="text-right">Khách thuê</Label>
              <Input id="tenant" className="col-span-3" value={formTenant} onChange={(e) => setFormTenant(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Số tiền (đ)</Label>
              <Input id="amount" className="col-span-3" inputMode="numeric" value={formAmountStr} onChange={(e) => setFormAmountStr(e.target.value)} onBlur={() => setFormAmountStr(formatNumber(parseNumber(formAmountStr)))} placeholder="vd: 2.500.000" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="due" className="text-right">Hạn thanh toán</Label>
              <Input id="due" className="col-span-3" placeholder="dd/mm/yyyy" value={formDue} onChange={(e) => setFormDue(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Trạng thái</Label>
              <select id="status" className="col-span-3 rounded-md border border-input bg-background p-2" value={formStatus} onChange={(e) => setFormStatus(e.target.value as InvoiceStatus)}>
                <option value="unpaid">Chưa thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="overdue">Quá hạn</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenEdit(false)}>Hủy</Button>
            <Button onClick={onSaveEdit}>Lưu</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo hóa đơn</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-room" className="text-right">Phòng</Label>
              <Input id="new-room" className="col-span-3" value={formRoom} onChange={(e) => setFormRoom(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tenant" className="text-right">Khách thuê</Label>
              <Input id="new-tenant" className="col-span-3" value={formTenant} onChange={(e) => setFormTenant(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-amount" className="text-right">Số tiền (đ)</Label>
              <Input id="new-amount" className="col-span-3" inputMode="numeric" value={formAmountStr} onChange={(e) => setFormAmountStr(e.target.value)} onBlur={() => setFormAmountStr(formatNumber(parseNumber(formAmountStr)))} placeholder="vd: 2.500.000" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-due" className="text-right">Hạn thanh toán</Label>
              <Input id="new-due" className="col-span-3" placeholder="dd/mm/yyyy" value={formDue} onChange={(e) => setFormDue(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-status" className="text-right">Trạng thái</Label>
              <select id="new-status" className="col-span-3 rounded-md border border-input bg-background p-2" value={formStatus} onChange={(e) => setFormStatus(e.target.value as InvoiceStatus)}>
                <option value="unpaid">Chưa thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="overdue">Quá hạn</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenAdd(false)}>Hủy</Button>
            <Button onClick={onSaveAdd}>Tạo</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


