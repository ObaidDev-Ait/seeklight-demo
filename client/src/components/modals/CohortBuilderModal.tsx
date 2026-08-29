import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Users, Sparkles, Check, Plus, Calendar, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface CohortBuilderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CANDIDATE_STUDENTS = [
  { id: "1", name: "Emma Wilson", level: "PET · B1", score: "70%" },
  { id: "2", name: "Noah Adams", level: "KET · A2", score: "82%" },
  { id: "3", name: "Mia Johnson", level: "PET · B1", score: "48%" },
  { id: "4", name: "Leo Martin", level: "KET · A2", score: "35%" },
  { id: "5", name: "Lucas Vance", level: "PET · B1", score: "89%" },
  { id: "6", name: "Sophia Patel", level: "KET · A2", score: "65%" },
];

export function CohortBuilderModal({ open, onOpenChange }: CohortBuilderModalProps) {
  const [cohortName, setCohortName] = useState("Spring 2026 Intensive B1");
  const [examLevel, setExamLevel] = useState("PET · B1");
  const [instructor, setInstructor] = useState("Liam Parker");
  const [selectedStudents, setSelectedStudents] = useState<string[]>(["1", "3", "5"]);

  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohortName.trim()) return;
    toast.success(`Cohort "${cohortName}" created with ${selectedStudents.length} learners assigned!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6f63d9] uppercase tracking-wider">
            <Users size={15} /> Center Tools
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope'] mt-1">
            Build Your Next Cohort
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Assign missions, set a target milestone, and monitor group progress.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="space-y-3.5 mt-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Cohort Name</label>
            <input
              type="text"
              required
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#6f63d9]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Target Exam</label>
              <select
                value={examLevel}
                onChange={(e) => setExamLevel(e.target.value)}
                className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium"
              >
                <option value="PET · B1">PET · B1 Preliminary</option>
                <option value="KET · A2">KET · A2 Key</option>
                <option value="Starters">Young Learners · Starters</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Lead Instructor</label>
              <select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium"
              >
                <option value="Liam Parker">Liam Parker</option>
                <option value="Maya Chen">Maya Chen</option>
                <option value="Sofia Mendes">Sofia Mendes</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-gray-700">
                Enroll Learners ({selectedStudents.length} selected)
              </label>
              <button
                type="button"
                onClick={() => setSelectedStudents(CANDIDATE_STUDENTS.map((s) => s.id))}
                className="text-[11px] font-bold text-[#6f63d9] hover:underline"
              >
                Select all
              </button>
            </div>
            <div className="border border-gray-200 rounded-xl max-h-40 overflow-y-auto divide-y divide-gray-100 bg-gray-50/50">
              {CANDIDATE_STUDENTS.map((st) => {
                const checked = selectedStudents.includes(st.id);
                return (
                  <label
                    key={st.id}
                    className="flex items-center justify-between p-2.5 hover:bg-white cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleStudent(st.id)}
                        className="rounded text-[#202b5a]"
                      />
                      <span className="font-bold text-gray-800 font-['Manrope']">{st.name}</span>
                      <small className="text-gray-400">({st.level})</small>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {st.score}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-3.5 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-[#202b5a] rounded-lg hover:bg-[#2c3870] transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} /> Create Cohort
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
