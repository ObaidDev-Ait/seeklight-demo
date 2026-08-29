import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, Filter, Mail, Send, Award, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

interface Learner {
  name: string;
  email: string;
  level: string;
  progress: number;
  status: "On track" | "Needs focus";
  xp: number;
  missions: number;
}

const ALL_LEARNERS: Learner[] = [
  { name: "Emma Wilson", email: "emma.w@school.uk", level: "PET · B1", progress: 70, status: "On track", xp: 1840, missions: 12 },
  { name: "Noah Adams", email: "noah.a@school.uk", level: "KET · A2", progress: 82, status: "On track", xp: 2150, missions: 15 },
  { name: "Mia Johnson", email: "mia.j@school.uk", level: "PET · B1", progress: 48, status: "Needs focus", xp: 980, missions: 6 },
  { name: "Leo Martin", email: "leo.m@school.uk", level: "KET · A2", progress: 35, status: "Needs focus", xp: 720, missions: 4 },
  { name: "Lucas Vance", email: "lucas.v@school.uk", level: "PET · B1", progress: 89, status: "On track", xp: 2400, missions: 18 },
  { name: "Sophia Patel", email: "sophia.p@school.uk", level: "KET · A2", progress: 65, status: "On track", xp: 1430, missions: 9 },
  { name: "Oliver Brown", email: "oliver.b@school.uk", level: "PET · B1", progress: 54, status: "Needs focus", xp: 1100, missions: 7 },
  { name: "Ava Davies", email: "ava.d@school.uk", level: "KET · A2", progress: 91, status: "On track", xp: 2600, missions: 20 },
];

interface LearnerDirectoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LearnerDirectoryModal({ open, onOpenChange }: LearnerDirectoryModalProps) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = ALL_LEARNERS.filter((l) => {
    const matchName = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === "all" || (levelFilter === "pet" && l.level.includes("PET")) || (levelFilter === "ket" && l.level.includes("KET"));
    const matchStatus = statusFilter === "all" || (statusFilter === "ontrack" && l.status === "On track") || (statusFilter === "needsfocus" && l.status === "Needs focus");
    return matchName && matchLevel && matchStatus;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6f63d9]">
              LEARNER ACTIVITY & COHORTS
            </span>
            <span className="text-xs font-bold bg-[#f5f6ff] text-[#6f63d9] px-2.5 py-0.5 rounded-full">
              {filtered.length} Learners Found
            </span>
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope'] mt-1">
            Learner Directory
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Real-time Cambridge exam readiness and active learner skill progression.
          </DialogDescription>
        </DialogHeader>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#6f63d9]"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="text-xs px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium"
            >
              <option value="all">All Levels</option>
              <option value="pet">PET · B1</option>
              <option value="ket">KET · A2</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium"
            >
              <option value="all">All Status</option>
              <option value="ontrack">On Track</option>
              <option value="needsfocus">Needs Focus</option>
            </select>
          </div>
        </div>

        {/* Learners Table */}
        <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f9fe] border-b border-gray-200 text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="py-2.5 px-3">Student</th>
                <th className="py-2.5 px-2">Level</th>
                <th className="py-2.5 px-2">Progress</th>
                <th className="py-2.5 px-2">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((l) => (
                <tr key={l.name} className="hover:bg-gray-50/70 transition">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#eceaff] text-[#6f63d9] font-black text-[10px] grid place-items-center">
                        {l.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <b className="block text-xs text-[#17203a] font-['Manrope']">{l.name}</b>
                        <small className="text-[10px] text-gray-400">{l.email}</small>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="font-semibold text-gray-700">{l.level}</span>
                  </td>
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${l.progress}%`,
                            background: l.status === "On track" ? "#45b58b" : "#f7c948",
                          }}
                        />
                      </div>
                      <span className="font-bold text-[10px] text-gray-600">{l.progress}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide ${
                        l.status === "On track"
                          ? "bg-[#def6ed] text-[#247b60]"
                          : "bg-[#fdf0b8] text-[#8d6900]"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => toast.success(`Assigned new Cambridge Mission to ${l.name}`)}
                      className="text-[11px] font-bold text-[#6f63d9] hover:text-[#534ab0] hover:underline"
                    >
                      Assign mission
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
