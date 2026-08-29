import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LifeBuoy, HelpCircle, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSent(true);
    toast.success("Question submitted to Cambridge academic advisor!");
    setTimeout(() => {
      setSent(false);
      setQuestion("");
      onOpenChange(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-bold text-[#45b58b] uppercase tracking-wider">
            <LifeBuoy size={15} /> Support Center
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope'] mt-1">
            Help & Academic Support
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Frequently asked questions and direct line to Seeklight learning advisors.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3 text-xs">
          <div className="space-y-2">
            {[
              {
                q: "How are Cambridge exam scores calculated?",
                a: "Scores are aligned with the Cambridge English Scale (120-140 for KET A2, 140-160 for PET B1), evaluating Listening, Reading, Writing, and Speaking separately.",
              },
              {
                q: "Can I retake a completed mission?",
                a: "Yes! All mission activities can be reviewed anytime. Your highest score and XP points will be preserved.",
              },
              {
                q: "Are the live instructors Cambridge certified?",
                a: "Every instructor on Seeklight holds official Cambridge CELTA or DELTA qualifications with specialized training for young learners.",
              },
            ].map((faq, i) => (
              <details key={i} className="p-3 bg-[#f8f9fe] rounded-xl border border-gray-100 cursor-pointer group">
                <summary className="font-bold text-[#17203a] list-none flex justify-between items-center font-['Manrope']">
                  <span>{faq.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition">▾</span>
                </summary>
                <p className="text-gray-600 mt-2 leading-relaxed text-[11px]">{faq.a}</p>
              </details>
            ))}
          </div>

          <form onSubmit={handleSend} className="pt-2 space-y-2">
            <label className="block font-bold text-gray-700">Need personal assistance?</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask our academic support team..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#6f63d9]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#202b5a] text-white font-bold rounded-lg hover:bg-[#2c3870] transition flex items-center gap-1.5 shrink-0"
              >
                {sent ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Send size={14} />} Send
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
