import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, TrendingUp, PieChart as PieIcon, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Bar,
  BarChart,
  Legend,
} from "recharts";

export default function Statistics() {
  // Bộ lọc thời gian đơn giản (tháng/năm)
  const [month, setMonth] = useState<string>("10");
  const [year, setYear] = useState<string>("2025");

  // Dữ liệu mock theo tháng
  const revenueByDay = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        day: i + 1,
        revenue: Math.round(1_500_000 + Math.random() * 2_000_000),
      })),
    [month, year],
  );

  const occupancy = useMemo(
    () => [
      { name: "Đang thuê", value: 18 },
      { name: "Trống", value: 6 },
    ],
    [month, year],
  );

  const overdueByFloor = useMemo(
    () => [
      { floor: "Tầng 1", overdue: 2 },
      { floor: "Tầng 2", overdue: 1 },
      { floor: "Tầng 3", overdue: 0 },
    ],
    [month, year],
  );

  const totalRevenue = useMemo(
    () => revenueByDay.reduce((s, x) => s + x.revenue, 0),
    [revenueByDay],
  );
  const occupancyRate = useMemo(
    () => Math.round((occupancy[0].value / (occupancy[0].value + occupancy[1].value)) * 100),
    [occupancy],
  );
  const overdueTotal = useMemo(
    () => overdueByFloor.reduce((s, x) => s + x.overdue, 0),
    [overdueByFloor],
  );

  const COLORS = ["#10b981", "#F59F27"]; // xanh, cam 

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Thống kê</h1>
          <p className="mt-2 text-muted-foreground">Tổng quan hiệu quả và tình trạng vận hành</p>
        </div>
        <div className="flex items-end gap-3">
          <div>
            <Label className="text-sm text-muted-foreground">Tháng</Label>
            <Input value={month} onChange={(e) => setMonth(e.target.value)} className="w-24" placeholder="MM" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Năm</Label>
            <Input value={year} onChange={(e) => setYear(e.target.value)} className="w-28" placeholder="YYYY" />
          </div>
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" /> Áp dụng
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu tháng</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {totalRevenue.toLocaleString()}đ
            </div>
            <p className="text-xs text-muted-foreground">So với tháng trước: +8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỉ lệ lấp đầy</CardTitle>
            <PieIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">Tổng phòng: {occupancy[0].value + occupancy[1].value}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hóa đơn quá hạn</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdueTotal}</div>
            <p className="text-xs text-muted-foreground">Phân bố theo tầng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách mới</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground">Trong tháng {month}/{year}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueByDay} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <RTooltip formatter={(v: any) => `${Number(v).toLocaleString()}đ`} labelFormatter={(l) => `Ngày ${l}`} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỉ lệ lấp đầy</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancy} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {occupancy.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <RTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hóa đơn quá hạn theo tầng</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overdueByFloor} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="floor" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <RTooltip />
              <Bar dataKey="overdue" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}


