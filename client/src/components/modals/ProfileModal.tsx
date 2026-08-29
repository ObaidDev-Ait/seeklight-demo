import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Award, Zap, Flame, Target, BookOpen, LogOut, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenAuth: () => void;
}

export function ProfileModal({ open, onOpenChange, onOpenAuth }: ProfileModalProps) {
  const { user, logout } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6f63d9]">
              LEARNER PROFILE
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#fdf0b8] text-[#8d6900]">
              {user.targetExam || "PET · B1 Preliminary"}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-12 rounded-2xl bg-[#f7c948] text-[#202b5a] font-extrabold text-lg grid place-items-center shadow-md">
              {user.avatar}
            </div>
            <div>
              <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope']">
                {user.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                {user.email} · <span className="text-[#6f63d9] font-semibold">{user.workspaceType}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Gamification Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="p-3 bg-[#fffdf5] border border-[#f7c948]/40 rounded-xl">
            <Flame className="mx-auto text-[#f7c948] mb-1" size={18} />
            <b className="block text-sm font-extrabold text-[#17203a] font-['Manrope']">6 Days</b>
            <small className="text-[10px] text-gray-500">Active Streak</small>
          </div>
          <div className="p-3 bg-[#f6f5ff] border border-[#6f63d9]/30 rounded-xl">
            <Zap className="mx-auto text-[#6f63d9] mb-1" size={18} />
            <b className="block text-sm font-extrabold text-[#17203a] font-['Manrope']">1,840</b>
            <small className="text-[10px] text-gray-500">Total XP</small>
          </div>
          <div className="p-3 bg-[#f1faf6] border border-[#45b58b]/30 rounded-xl">
            <Award className="mx-auto text-[#45b58b] mb-1" size={18} />
            <b className="block text-sm font-extrabold text-[#17203a] font-['Manrope']">12</b>
            <small className="text-[10px] text-gray-500">Missions</small>
          </div>
        </div>

        {/* Skill Progress */}
        <div className="mt-4 p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-2.5 text-xs">
          <span className="font-extrabold text-[#17203a] block font-['Manrope']">
            Cambridge 4-Skill Mastery
          </span>
          {[
            { name: "Listening", val: 72, color: "#6f63d9" },
            { name: "Reading", val: 68, color: "#f7c948" },
            { name: "Writing", val: 54, color: "#ef8354" },
            { name: "Speaking", val: 61, color: "#45b58b" },
          ].map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-[11px] font-semibold text-gray-700 mb-1">
                <span>{s.name}</span>
                <span>{s.val}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${s.val}%`, background: s.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Account Actions */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => {
              onOpenChange(false);
              onOpenAuth();
            }}
            className="text-xs font-bold text-[#6f63d9] hover:underline"
          >
            Switch account / role
          </button>
          <button
            onClick={() => {
              logout();
              onOpenChange(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
