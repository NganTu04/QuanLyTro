import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { useTheme } from "next-themes";

export default function Settings() {
  // General
  const [propertyName, setPropertyName] = useState("Nhà trọ Xanh");
  const [propertyAddress, setPropertyAddress] = useState("123 Đường ABC, Quận 1, TP.HCM");

  // Appearance
  const { theme, setTheme } = useTheme();

  // Localization
  const [currency, setCurrency] = useState("VND");
  const [locale, setLocale] = useState("vi-VN");
  const [dateFormat, setDateFormat] = useState("dd/MM/yyyy");
  const [timeFormat, setTimeFormat] = useState("24h");

  // Notifications
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [notifyOverdue, setNotifyOverdue] = useState(true);

  // Billing
  const [autoGenerateInvoices, setAutoGenerateInvoices] = useState(true);
  const [autoReminderDays, setAutoReminderDays] = useState("3");

  // Account
  const [ownerName, setOwnerName] = useState("Chủ trọ");
  const [ownerEmail, setOwnerEmail] = useState("admin@example.com");

  const saveGeneral = () => {
    toast("Đã lưu thông tin chung");
  };
  const saveAppearance = () => {
    toast("Đã lưu cài đặt giao diện");
  };
  const saveLocalization = () => {
    toast("Đã lưu cài đặt ngôn ngữ & định dạng");
  };
  const saveNotifications = () => {
    toast("Đã lưu cài đặt thông báo");
  };
  const saveBilling = () => {
    toast("Đã lưu cài đặt hóa đơn");
  };
  const saveAccount = () => {
    toast("Đã lưu thông tin tài khoản");
  };

  const exportData = () => {
    toast("Đang xuất dữ liệu (mẫu)...");
  };
  const importData = () => {
    toast("Đang nhập dữ liệu (mẫu)...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cài đặt</h1>
        <p className="mt-2 text-muted-foreground">Quản lý cài đặt hệ thống và thông tin tài khoản</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin chung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="propertyName" className="text-right">Tên nhà trọ</Label>
              <Input id="propertyName" className="col-span-3" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="propertyAddress" className="text-right">Địa chỉ</Label>
              <Input id="propertyAddress" className="col-span-3" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button onClick={saveGeneral}>Lưu</Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Giao diện</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Chủ đề</Label>
              <Select value={theme} onValueChange={(v) => setTheme(v)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn chủ đề" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Sáng</SelectItem>
                  <SelectItem value="dark">Tối</SelectItem>
                  <SelectItem value="system">Theo hệ thống</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button onClick={saveAppearance}>Lưu</Button>
            </div>
          </CardContent>
        </Card>

        {/* Localization */}
        <Card>
          <CardHeader>
            <CardTitle>Ngôn ngữ & Định dạng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tiền tệ</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND">VND</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ngôn ngữ</Label>
              <Select value={locale} onValueChange={setLocale}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi-VN">Tiếng Việt</SelectItem>
                  <SelectItem value="en-US">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Định dạng ngày</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                  <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Định dạng giờ</Label>
              <Select value={timeFormat} onValueChange={setTimeFormat}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 giờ</SelectItem>
                  <SelectItem value="12h">12 giờ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button onClick={saveLocalization}>Lưu</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Thông báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">Gửi email nhắc nhở & cập nhật</p>
              </div>
              <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">SMS</p>
                <p className="text-xs text-muted-foreground">Nhắn tin SMS khi đến hạn</p>
              </div>
              <Switch checked={notifySms} onCheckedChange={setNotifySms} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Nhắc quá hạn</p>
                <p className="text-xs text-muted-foreground">Tự động nhắc nợ quá hạn</p>
              </div>
              <Switch checked={notifyOverdue} onCheckedChange={setNotifyOverdue} />
            </div>
            <div className="flex justify-end">
              <Button onClick={saveNotifications}>Lưu</Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing */}
        <Card>
          <CardHeader>
            <CardTitle>Hóa đơn & Nhắc nợ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Tạo hóa đơn tự động</p>
                <p className="text-xs text-muted-foreground">Sinh hóa đơn mỗi đầu tháng</p>
              </div>
              <Switch checked={autoGenerateInvoices} onCheckedChange={setAutoGenerateInvoices} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="remindDays" className="text-right">Nhắc trước (ngày)</Label>
              <Input id="remindDays" className="col-span-3" value={autoReminderDays} onChange={(e) => setAutoReminderDays(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button onClick={saveBilling}>Lưu</Button>
            </div>
          </CardContent>
        </Card>

        {/* Data */}
        <Card>
          <CardHeader>
            <CardTitle>Dữ liệu</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={exportData}>Xuất dữ liệu</Button>
            <Button variant="outline" onClick={importData}>Nhập dữ liệu</Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tài khoản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ownerName" className="text-right">Họ tên</Label>
              <Input id="ownerName" className="col-span-3" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ownerEmail" className="text-right">Email</Label>
              <Input id="ownerEmail" className="col-span-3" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Đổi mật khẩu</Button>
              <Button onClick={saveAccount}>Lưu</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


