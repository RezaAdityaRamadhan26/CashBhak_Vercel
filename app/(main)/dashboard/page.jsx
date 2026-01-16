"use client";

import { useState, useEffect, useMemo } from "react";
import {
  DollarSign,
  ClipboardList,
  Package,
  Calendar,
  Download,
  Loader2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { fetchTransactionsForDashboard } from "@/lib/action";

// Modern Stat Card Component
const StatCard = ({ title, value, icon, iconBg, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-[var(--black-custom)]">{value}</h3>
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
            {trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="font-medium">{trend}</span>
            <span className="text-gray-400 text-xs">vs bulan lalu</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl ${iconBg}`}>{icon}</div>
    </div>
  </div>
);

// Modern Monthly Sales Chart
const MonthlySalesChart = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--black-custom)]">Penjualan Bulanan</h3>
          <p className="text-sm text-gray-500">Tahun ini</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-600">+12.5%</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 h-52">
        {data.map((d, index) => {
          const heightPercent = (d.total / maxValue) * 100;
          return (
            <div key={d.month} className="flex flex-col items-center justify-end gap-2 flex-1 h-full group">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 absolute -mt-10 text-xs bg-gray-900 text-white px-2 py-1 rounded transition-opacity whitespace-nowrap z-10">
                Rp {(d.total / 1000).toFixed(0)}k
              </div>
              {/* Bar */}
              <div
                className="w-full max-w-[28px] bg-gradient-to-t from-[var(--primary-custom)] to-[var(--primary-custom)]/60 rounded-t-lg transition-all duration-500 hover:from-[var(--primary-custom)] hover:to-[var(--blue-custom)] cursor-pointer"
                style={{ height: `${Math.max(heightPercent, 4)}%` }}
              />
              {/* Month Label */}
              <span className="text-xs text-gray-400 font-medium">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Modern Pie Chart
const SalesSourceChart = ({ data, totalAmount }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const cashEnd = data.cash;
  const bankEnd = cashEnd + data.bank;

  const sources = [
    { label: "Cash", value: data.cash, color: "bg-[var(--primary-custom)]", ring: "ring-[var(--primary-custom)]" },
    { label: "Card", value: data.bank, color: "bg-blue-500", ring: "ring-blue-500" },
    { label: "E-Wallet", value: data.ewallet, color: "bg-yellow-400", ring: "ring-yellow-400" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--black-custom)]">Sumber Penjualan</h3>
        <p className="text-sm text-gray-500">Berdasarkan metode pembayaran</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">Total Penjualan</p>
        <p className="text-3xl font-bold text-[var(--black-custom)]">{formatRupiah(totalAmount)}</p>
      </div>

      <div className="flex justify-center mb-6">
        <div
          className="relative w-36 h-36 rounded-full"
          style={{
            background: `conic-gradient(
              var(--primary-custom) 0% ${cashEnd}%, 
              #3B82F6 ${cashEnd}% ${bankEnd}%, 
              #FACC15 ${bankEnd}% 100%
            )`,
          }}
        >
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-[var(--black-custom)]">100%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
              <span className="text-sm font-medium text-gray-700">{source.label}</span>
            </div>
            <span className="text-sm font-bold text-[var(--black-custom)]">{source.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function DashboardPage() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatRupiah = (number) => {
    if (isNaN(number)) return "Rp. 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const formatTanggal = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("id-ID", {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit",
      });
    } catch (e) { return dateString; }
  };

  useEffect(() => {
    async function getOrderHistory() {
      setIsLoading(true);
      try {
        const data = await fetchTransactionsForDashboard();
        setOrderHistory(data || []);

        if (data && data.length > 0) {
          const today = new Date();
          const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          setStartDate(firstDay.toLocaleDateString('en-CA'));
          setEndDate(today.toLocaleDateString('en-CA'));
        }
      } catch (error) {
        console.error("Gagal mengambil riwayat pesanan:", error);
        setOrderHistory([]);
        setMessage({ type: "error", text: "Gagal memuat riwayat pesanan." });
      } finally {
        setIsLoading(false);
      }
    }
    getOrderHistory();
  }, []);

  const { filteredData, stats, monthlyData, sourceData } = useMemo(() => {
    let filtered = orderHistory;

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      filtered = orderHistory.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }

    const totalSale = filtered.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalItems = filtered.reduce((sum, item) => sum + Number(item.qty), 0);
    const uniqueTransactions = new Set(filtered.map(item => item.id)).size;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyCounts = Array(12).fill(0);

    const targetYear = endDate ? new Date(endDate).getFullYear() : new Date().getFullYear();

    filtered.forEach(item => {
      const d = new Date(item.date);
      if (d.getFullYear() === targetYear) {
        monthlyCounts[d.getMonth()] += Number(item.amount);
      }
    });
    const monthlyStats = months.map((m, i) => ({ month: m, total: monthlyCounts[i] }));

    let cash = 0, bank = 0, ewallet = 0;
    filtered.forEach(item => {
      const method = item.sales ? item.sales.toLowerCase() : "";
      if (method.includes("cash")) cash += Number(item.amount);
      else if (method.includes("bank") || method.includes("card")) bank += Number(item.amount);
      else ewallet += Number(item.amount);
    });

    const totalForPie = cash + bank + ewallet || 1;
    const pieStats = {
      cash: (cash / totalForPie) * 100,
      bank: (bank / totalForPie) * 100,
      ewallet: (ewallet / totalForPie) * 100
    };

    return {
      filteredData: filtered,
      stats: { totalSale, totalItems, uniqueTransactions },
      monthlyData: monthlyStats,
      sourceData: pieStats
    };
  }, [orderHistory, startDate, endDate]);

  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      setMessage({ type: "error", text: "Tidak ada data untuk diekspor." });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const tableRows = filteredData.map((order) => `
        <tr>
          <td>#${order.id}</td>
          <td>${order.name}</td>
          <td>${order.qty}</td>
          <td>${formatRupiah(order.amount)}</td>
          <td>${order.sales}</td>
          <td>${formatTanggal(order.date)}</td>
        </tr>`
    ).join("");

    const printContent = `
      <html>
        <head><title>Riwayat Pesanan</title>
        <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; }
        </style></head>
        <body>
          <h2 style="text-align:center">Laporan Riwayat Pesanan</h2>
          <p>Periode: ${startDate} s/d ${endDate}</p>
          <table>
            <thead><tr><th>ID</th><th>Item</th><th>Qty</th><th>Amount</th><th>Method</th><th>Date</th></tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>`;

    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Alert Message */}
      {message && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white flex items-center gap-3`}>
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="font-bold hover:opacity-80">✕</button>
        </div>
      )}

      {/* Date Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Penjualan"
          value={formatRupiah(stats.totalSale)}
          icon={<DollarSign className="h-6 w-6 text-yellow-600" />}
          iconBg="bg-yellow-100"
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard
          title="Total Transaksi"
          value={stats.uniqueTransactions}
          icon={<ClipboardList className="h-6 w-6 text-[var(--primary-custom)]" />}
          iconBg="bg-[var(--primary-custom)]/20"
          trend="+8.2%"
          trendUp={true}
        />
        <StatCard
          title="Item Terjual"
          value={stats.totalItems}
          icon={<Package className="h-6 w-6 text-blue-500" />}
          iconBg="bg-blue-100"
          trend="+15.3%"
          trendUp={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlySalesChart data={monthlyData} />
        </div>
        <div className="lg:col-span-1">
          <SalesSourceChart data={sourceData} totalAmount={stats.totalSale} />
        </div>
      </div>

      {/* Order History Table */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--black-custom)]">Riwayat Pesanan</h2>
            <p className="text-sm text-gray-500">Daftar transaksi terbaru</p>
          </div>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-custom)] text-white rounded-xl hover:bg-[var(--primary-custom)]/90 transition-all font-medium shadow-lg shadow-[var(--primary-custom)]/30"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Jumlah</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Metode</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
              </tr>
            </thead>
            <tbody className="text-[var(--black-custom)]">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[var(--primary-custom)]" />
                    <p className="text-sm text-gray-500 mt-2">Memuat data...</p>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Tidak ada data pada rentang tanggal ini</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((order, index) => (
                  <tr key={`${order.id}-${order.name}-${index}`} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-sm">#{order.id}</td>
                    <td className="py-4 px-4 text-sm">{order.name}</td>
                    <td className="py-4 px-4 text-sm">{order.qty}</td>
                    <td className="py-4 px-4 text-sm font-semibold">{formatRupiah(order.amount)}</td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.sales?.toUpperCase().includes("E-WALLET")
                          ? "bg-blue-100 text-blue-700"
                          : order.sales?.toUpperCase().includes("CASH")
                            ? "bg-[var(--primary-custom)]/10 text-[var(--primary-custom)]"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {order.sales}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 hidden md:table-cell">{formatTanggal(order.date)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}