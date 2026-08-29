import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth, WORKSPACES } from "@/contexts/AuthContext";
import { Check, Plus, Building2, User, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface WorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectWorkspace?: (role: "student" | "admin" | "teacher") => void;
}

export function WorkspaceModal({ open, onOpenChange, onSelectWorkspace }: WorkspaceModalProps) {
  const { currentWorkspace, switchWorkspace } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [newWsType, setNewWsType] = useState("School / Academy");

  const handleSelect = (ws: typeof WORKSPACES[0]) => {
    switchWorkspace(ws.id);
    if (onSelectWorkspace) {
      onSelectWorkspace(ws.role);
    }
    onOpenChange(false);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) return;
    toast.success(`Workspace "${newWsName}" created successfully!`);
    setShowAddForm(false);
    setNewWsName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope']">
            Workspaces & Organizations
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Switch between your personal student dashboard and institutional language center views.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {WORKSPACES.map((ws) => {
            const isSelected = ws.id === currentWorkspace.id;
            return (
              <button
                key={ws.id}
                onClick={() => handleSelect(ws)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-[#f5f6ff] border-[#6f63d9] shadow-sm ring-1 ring-[#6f63d9]"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/70"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl grid place-items-center font-bold text-sm ${
                    ws.role === "admin"
                      ? "bg-[#6f63d9] text-white"
                      : ws.role === "teacher"
                      ? "bg-[#45b58b] text-white"
                      : "bg-[#f7c948] text-[#202b5a]"
                  }`}
                >
                  {ws.role === "admin" ? (
                    <Building2 size={18} />
                  ) : ws.role === "teacher" ? (
                    <GraduationCap size={18} />
                  ) : (
                    <User size={18} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[#17203a] truncate font-['Manrope']">
                    {ws.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span>{ws.type}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="font-semibold text-[#6f63d9] capitalize">{ws.role} view</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#6f63d9] text-white grid place-items-center shrink-0">
                    <Check size={14} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {showAddForm ? (
          <form onSubmit={handleCreate} className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
            <h4 className="font-bold text-xs text-[#17203a] uppercase tracking-wider font-['Manrope']">
              Create New Organization
            </h4>
            <input
              type="text"
              required
              placeholder="e.g. Cambridge Language Center"
              value={newWsName}
              onChange={(e) => setNewWsName(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#6f63d9]"
            />
            <select
              value={newWsType}
              onChange={(e) => setNewWsType(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
            >
              <option value="Language Academy">Language Academy</option>
              <option value="K-12 School">K-12 International School</option>
              <option value="Tutoring Hub">Private Tutoring Hub</option>
            </select>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-gray-600 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#202b5a] rounded-lg hover:bg-[#2c3870]"
              >
                Create Workspace
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:text-[#202b5a] hover:border-gray-400 transition"
          >
            <Plus size={15} /> Join or create another workspace
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
