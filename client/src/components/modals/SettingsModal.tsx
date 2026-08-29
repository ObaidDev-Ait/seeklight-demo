import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Settings2, Globe, Bell, Volume2, Shield, Save } from "lucide-react";
import { toast } from "sonner";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [exam, setExam] = useState("PET · B1 Preliminary");
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState("English (UK)");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Preferences saved successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6f63d9] uppercase tracking-wider">
            <Settings2 size={15} /> Preferences
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope'] mt-1">
            Platform Settings
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Configure your learning target, audio feedback, and Cambridge exam pathway.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Globe size={13} /> Cambridge Target Qualification
            </label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium text-xs"
            >
              <option value="Starters">Young Learners · Starters (Pre-A1)</option>
              <option value="KET · A2 Key">A2 Key for Schools (KET)</option>
              <option value="PET · B1 Preliminary">B1 Preliminary for Schools (PET)</option>
              <option value="FCE · B2 First">B2 First for Schools (FCE)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Globe size={13} /> Interface Language & Accent
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium text-xs"
            >
              <option value="English (UK)">English (UK) — Received Pronunciation</option>
              <option value="English (US)">English (US) — General American</option>
              <option value="Français">Français (Interface guidance)</option>
            </select>
          </div>

          <div className="space-y-2 pt-1 border-t border-gray-100">
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="flex items-center gap-2 text-gray-700 font-medium">
                <Bell size={14} className="text-gray-400" /> Daily Mission Reminders
              </span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="rounded text-[#202b5a]"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span className="flex items-center gap-2 text-gray-700 font-medium">
                <Volume2 size={14} className="text-gray-400" /> Audio pronunciation & sound effects
              </span>
              <input
                type="checkbox"
                checked={soundEffects}
                onChange={(e) => setSoundEffects(e.target.checked)}
                className="rounded text-[#202b5a]"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3">
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
              <Save size={14} /> Save Preferences
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
