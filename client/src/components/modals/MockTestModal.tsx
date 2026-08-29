import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Trophy, Clock, FileText, CheckCircle2, Play, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface MockTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MockTestModal({ open, onOpenChange }: MockTestModalProps) {
  const [selectedPaper, setSelectedPaper] = useState("listening");
  const [sampleAnswer, setSampleAnswer] = useState<string | null>(null);

  const startFullTest = () => {
    toast.success("Cambridge PET B1 Mock Test session initiated! Timer running.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8d6900] bg-[#fdf0b8] w-fit px-2.5 py-1 rounded-md">
            <Trophy size={13} /> CAMBRIDGE ARENA · ASSESSMENT
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope'] mt-2">
            B1 Preliminary (PET) Mock Exam
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Official Cambridge format simulation with timed sections and automated scoring rubrics.
          </DialogDescription>
        </DialogHeader>

        {/* Papers Selector */}
        <div className="grid grid-cols-4 gap-1.5 mt-3 text-xs font-bold">
          {[
            { id: "listening", name: "Listening", time: "30 min", q: "25 Qs" },
            { id: "reading", name: "Reading", time: "45 min", q: "32 Qs" },
            { id: "writing", name: "Writing", time: "45 min", q: "2 tasks" },
            { id: "speaking", name: "Speaking", time: "12 min", q: "4 parts" },
          ].map((paper) => (
            <button
              key={paper.id}
              onClick={() => setSelectedPaper(paper.id)}
              className={`p-2 rounded-xl border text-center transition ${
                selectedPaper === paper.id
                  ? "bg-[#202b5a] text-white border-[#202b5a]"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="text-[11px] truncate">{paper.name}</div>
              <small className="text-[9px] opacity-70 block font-normal">{paper.time}</small>
            </button>
          ))}
        </div>

        {/* Sample Interactive Question */}
        <div className="mt-3 p-4 bg-[#f8f9fe] rounded-xl border border-[#ececf7] space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-gray-500 text-[10px] font-bold">
            <span>SAMPLE DIAGNOSTIC QUESTION</span>
            <span className="text-[#6f63d9]">CEFR Level: B1</span>
          </div>

          <p className="font-semibold text-gray-800">
            “You will hear a teacher giving information about a visit to an art gallery. Where will students eat lunch?”
          </p>

          <div className="space-y-1.5 pt-1">
            {[
              { id: "a", text: "In the gallery café on the 2nd floor" },
              { id: "b", text: "In the museum sculpture garden outside", correct: true },
              { id: "c", text: "Back on the school bus" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSampleAnswer(opt.id)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-center justify-between ${
                  sampleAnswer === opt.id
                    ? opt.correct
                      ? "bg-[#eefaf5] border-[#45b58b] text-[#247b60] font-bold"
                      : "bg-[#fff2f2] border-red-300 text-red-700 font-bold"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{opt.text}</span>
                {sampleAnswer === opt.id && opt.correct && <CheckCircle2 size={15} className="text-[#45b58b]" />}
              </button>
            ))}
          </div>

          {sampleAnswer && (
            <p className="text-[11px] text-[#247b60] font-medium mt-1">
              ✓ Correct! The instructor notes: “If it stays sunny, we’ll sit on the lawn by the sculptures.”
            </p>
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            <Clock size={13} /> Full test duration: ~90 mins
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={startFullTest}
              className="px-4 py-1.5 text-xs font-bold text-[#202b5a] bg-[#f7c948] rounded-lg hover:bg-[#eab936] transition flex items-center gap-1.5 shadow-sm"
            >
              <Play size={13} fill="currentColor" /> Launch Full Mock Test
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
