import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, FileSpreadsheet, FileText, Check, Calendar, Filter } from "lucide-react";
import { toast } from "sonner";

interface ExportReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportReportModal({ open, onOpenChange }: ExportReportModalProps) {
  const [format, setFormat] = useState<"csv" | "pdf">("csv");
  const [timeRange, setTimeRange] = useState("30");
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      if (format === "csv") {
        const csvContent =
          "data:text/csv;charset=utf-8," +
          "Learner,Level,Progress,Status,XP,Missions Completed\n" +
          "Emma Wilson,PET - B1,70%,On track,1840,12\n" +
          "Noah Adams,KET - A2,82%,On track,2150,15\n" +
          "Mia Johnson,PET - B1,48%,Needs focus,980,6\n" +
          "Leo Martin,KET - A2,35%,Needs focus,720,4\n" +
          "Lucas Vance,PET - B1,89%,On track,2400,18\n" +
          "Sophia Patel,KET - A2,65%,On track,1430,9\n";

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Seeklight_Center_Report_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("CSV report downloaded successfully!");
      } else {
        toast.success("PDF report generated and opened!");
      }
      setIsExporting(false);
      onOpenChange(false);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6f63d9] uppercase tracking-wider">
            <FileText size={15} /> Center Analytics
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope']">
            Export Cohort & Learner Report
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Generate an official Cambridge progress summary report for your language center or school board.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Calendar size={13} /> Time Period
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none"
            >
              <option value="30">Last 30 Days (Current Cycle)</option>
              <option value="90">Last Quarter (90 Days)</option>
              <option value="365">Academic Year 2025 - 2026</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Filter size={13} /> Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat("csv")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                  format === "csv"
                    ? "bg-[#f5f6ff] border-[#6f63d9] ring-1 ring-[#6f63d9]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <FileSpreadsheet className="text-[#45b58b]" size={22} />
                <div>
                  <b className="block text-xs text-[#17203a]">CSV / Excel</b>
                  <small className="text-[10px] text-gray-500">Full raw data</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat("pdf")}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                  format === "pdf"
                    ? "bg-[#f5f6ff] border-[#6f63d9] ring-1 ring-[#6f63d9]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <FileText className="text-[#ef8354]" size={22} />
                <div>
                  <b className="block text-xs text-[#17203a]">PDF Document</b>
                  <small className="text-[10px] text-gray-500">Presentation summary</small>
                </div>
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#f8f9fe] rounded-xl border border-[#ececf7] space-y-1.5 text-xs">
            <span className="font-bold text-[#202b5a] block">Report Highlights</span>
            <div className="flex justify-between text-gray-600">
              <span>Active learners</span>
              <b>248 students</b>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Missions completed</span>
              <b>1,840 missions</b>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Average readiness</span>
              <b className="text-emerald-600">68% on track</b>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isExporting}
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-bold text-white bg-[#202b5a] rounded-lg hover:bg-[#2c3870] transition flex items-center gap-2 shadow-sm"
            >
              <Download size={14} /> {isExporting ? "Generating..." : "Download Report"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
