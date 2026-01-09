"use client";

import { useState, useEffect, useMemo } from "react";
import {
  DollarSign,
  ClipboardList,
  Package,
  Calendar,
  Download,
  Loader2,
} from "lucide-react";
import { fetchTransactionsForDashboard } from "@/lib/action";

// --- 1. KOMPONEN STAT CARD ---
const StatCard = ({ title, value, icon, iconBg }) => (
  <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm flex items-center justify-between">
    <div className="flex-1 min-w-0">
      <div className="text-xs sm:text-sm text-gray-500">{title}</div>
      <div className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--black-custom)] truncate">
        {value}
      </div>
    </div>
    <div className={`p-2 md:p-3 rounded-full flex-shrink-0 ${iconBg}`}>{icon}</div>
  </div>
);

// --- 2. KOMPONEN MONTHLY SALES CHART (PERBAIKAN CSS) ---
const MonthlySalesChart = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm h-full flex flex-col">
      <h3 className="text-base md:text-lg font-semibold text-[var(--black-custom)] mb-4 md:mb-6">
        Monthly Sales (Tahun Terfilter)
      </h3>
      {/* Hapus 'items-end' di sini, biarkan anak elemen mengatur tingginya */}
      <div className="flex justify-between flex-1 px-2 gap-1 sm:gap-2 h-48 sm:h-56 md:h-64">
        {data.map((d) => {
          const heightPercent = (d.total / maxValue) * 100;

          return (
            // PERBAIKAN DI SINI: 
            // - h-full: Agar container memenuhi tinggi chart
            // - justify-end: Agar bar turun ke bawah (seperti grafik batang pada umumnya)
            <div key={d.month} className="flex flex-col items-center justify-end gap-1 sm:gap-2 w-full h-full group relative">

              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 text-xs bg-gray-800 text-white px-2 py-1 rounded transition-opacity pointer-events-none whitespace-nowrap z-10">
                Rp {(d.total / 1000).toFixed(0)}k
              </div>

              {/* Bar Batang */}
              <div
                className="w-full max-w-[20px] sm:max-w-[30px] bg-[#D1F2EB] rounded-t-lg transition-all duration-500 hover:bg-[var(--primary-custom)]/40"
                style={{ height: `${heightPercent}%` }}
              ></div>

              {/* Label Bulan */}
              <span className="text-[10px] sm:text-xs text-gray-400">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- 3. KOMPONEN PIE CHART ---
const SalesSourceChart = ({ data, totalAmount }) => {
  const cashEnd = data.cash;
  const bankEnd = cashEnd + data.bank;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm h-full flex flex-col justify-between">
      <div className="mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-semibold text-[var(--black-custom)]">
          Origin of sales
        </h3>
        <span className="text-xs text-gray-400">Based on filtered date</span>
      </div>

      <div className="text-2xl md:text-3xl font-bold text-[var(--black-custom)] mb-4 md:mb-6">
        {formatRupiah(totalAmount)}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <div
          className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full flex-shrink-0 transition-all duration-500"
          style={{
            background: `conic-gradient(
              #EF4444 0% ${cashEnd}%, 
              #3B82F6 ${cashEnd}% ${bankEnd}%, 
              #FACC15 ${bankEnd}% 100%
            )`,
          }}
        >
          <div className="absolute inset-3 bg-white rounded-full shadow-inner"></div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="text-sm text-gray-500">Cash</span>
            </div>
            <span className="text-sm font-bold text-[var(--black-custom)]">
              {data.cash.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500"></span>
              <span className="text-sm text-gray-500">Card</span>
            </div>
            <span className="text-sm font-bold text-[var(--black-custom)]">
              {data.bank.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="text-sm text-gray-500">E-Wallet</span>
            </div>
            <span className="text-sm font-bold text-[var(--black-custom)]">
              {data.ewallet.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN COMPONENT ---
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
          // Format YYYY-MM-DD untuk input
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
    <div className="w-full relative">
      {message && (
        <div className={`fixed top-20 sm:top-24 right-3 sm:right-6 z-50 p-3 sm:p-4 rounded-lg shadow-lg text-sm sm:text-base ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-2 sm:ml-4 font-bold">X</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1">
          <label className="block text-xs sm:text-sm font-medium text-[var(--black-custom)] mb-1">Start Date</label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg bg-white outline-none focus:border-[var(--primary-custom)] transition-colors"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs sm:text-sm font-medium text-[var(--black-custom)] mb-1">End Date</label>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg bg-white outline-none focus:border-[var(--primary-custom)] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <StatCard
          title="Total Sale"
          value={formatRupiah(stats.totalSale)}
          icon={<DollarSign className="h-6 w-6 text-yellow-600" />}
          iconBg="bg-yellow-100"
        />
        <StatCard
          title="Total Transaction"
          value={stats.uniqueTransactions}
          icon={<ClipboardList className="h-6 w-6 text-[var(--primary-custom)]" />}
          iconBg="bg-[var(--primary-custom)]/20"
        />
        <StatCard
          title="Total Items Sold"
          value={stats.totalItems}
          icon={<Package className="h-6 w-6 text-blue-500" />}
          iconBg="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <MonthlySalesChart data={monthlyData} />
        </div>
        <div className="lg:col-span-1">
          <SalesSourceChart data={sourceData} totalAmount={stats.totalSale} />
        </div>
      </div>

      <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-[var(--black-custom)]">Order History</h2>
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-[var(--primary-custom)] text-white rounded-lg hover:opacity-90 transition-opacity">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Print / Save as PDF</span><span className="sm:hidden">Export</span>
          </button>
        </div>
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600 uppercase text-xs sm:text-sm">
                  <th className="py-2 sm:py-3 px-2 sm:px-4">ID</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4">Items</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4">Qty</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4">Amount</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">Sales</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="text-[var(--black-custom)]">
                {isLoading ? (
                  <tr><td colSpan="6" className="text-center py-6 sm:py-10 text-gray-500"><Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin mx-auto" /><span className="text-xs sm:text-sm">Memuat data...</span></td></tr>
                ) : filteredData.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-6 sm:py-10 text-xs sm:text-sm text-gray-500">Tidak ada data pada rentang tanggal ini.</td></tr>
                ) : (
                  filteredData.map((order, index) => (
                    <tr key={`${order.id}-${order.name}-${index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">#{order.id}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{order.name}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{order.qty}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{formatRupiah(order.amount)}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.sales?.toUpperCase().includes("E-WALLET") ? "bg-blue-100 text-blue-600" :
                          order.sales?.toUpperCase().includes("CASH") ? "bg-[var(--primary-custom)]/20 text-[var(--primary-custom)]" : "bg-yellow-100 text-yellow-700"
                          }`}>
                          {order.sales}
                        </span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 hidden md:table-cell">{formatTanggal(order.date)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}