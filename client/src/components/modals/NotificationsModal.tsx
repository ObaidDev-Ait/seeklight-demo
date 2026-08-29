import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Bell, Zap, Trophy, Radio, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface NotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: any;
  color: string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Mission 03 Completed!",
    desc: "Emma Wilson earned +240 XP on Planning a Trip.",
    time: "10m ago",
    icon: Zap,
    color: "#f7c948",
    unread: true,
  },
  {
    id: "2",
    title: "Live Class Reminder",
    desc: "Storytelling & phonics with Maya Chen starts in 45 minutes.",
    time: "45m ago",
    icon: Radio,
    color: "#45b58b",
    unread: true,
  },
  {
    id: "3",
    title: "Mock Test Graded",
    desc: "B1 Preliminary Listening mock score: 78/100 (CEFR Grade B1).",
    time: "2h ago",
    icon: Trophy,
    color: "#6f63d9",
    unread: false,
  },
];

export function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  const [list, setList] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setList((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success("All notifications marked as read!");
  };

  const clearAll = () => {
    setList([]);
    toast.info("Notifications cleared");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6f63d9]">
              ACTIVITY FEED
            </span>
            {list.some((n) => n.unread) && (
              <button
                onClick={markAllRead}
                className="text-[11px] font-bold text-[#6f63d9] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope'] mt-1">
            Notifications
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Recent updates on learner milestones, mock tests, and live teaching.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
          {list.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">
              No notifications right now.
            </div>
          ) : (
            list.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`flex gap-3 p-3 rounded-xl border transition ${
                    n.unread
                      ? "bg-[#f8f9fe] border-[#6f63d9]/30"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg grid place-items-center text-[#202b5a] shrink-0"
                    style={{ background: n.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex justify-between items-start">
                      <b className="font-bold text-[#17203a] font-['Manrope'] truncate">
                        {n.title}
                      </b>
                      <small className="text-[9px] text-gray-400 shrink-0">{n.time}</small>
                    </div>
                    <p className="text-gray-500 text-[11px] mt-0.5 leading-snug">{n.desc}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {list.length > 0 && (
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearAll}
              className="text-[11px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1"
            >
              <Trash2 size={12} /> Clear all
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="px-3.5 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
