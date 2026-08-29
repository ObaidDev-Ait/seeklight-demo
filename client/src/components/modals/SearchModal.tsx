import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, Radio, Trophy, Target, Users, BookOpen, ChevronRight } from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectRoute: (route: string) => void;
}

const SEARCH_ITEMS = [
  { id: "1", title: "B2B Center Dashboard", category: "Navigation", path: "/b2b-center", icon: Users },
  { id: "2", title: "Emma's Student Dashboard", category: "Navigation", path: "/student", icon: BookOpen },
  { id: "3", title: "PET Missions (B1 Preliminary)", category: "Curriculum", path: "/missions/pet", icon: Target },
  { id: "4", title: "KET Missions (A2 Key)", category: "Curriculum", path: "/missions/ket", icon: Target },
  { id: "5", title: "Planning a Trip (Mission 03)", category: "Active Mission", path: "/mission", icon: BookOpen },
  { id: "6", title: "Cambridge Arena Mock Tests", category: "Assessment", path: "/cambridge-arena", icon: Trophy },
  { id: "7", title: "Live Teaching Hub (Instructors)", category: "Classes", path: "/live-teaching", icon: Radio },
  { id: "8", title: "Emma Wilson (Student Progress)", category: "Learner", path: "/b2b-center", icon: Users },
  { id: "9", title: "Noah Adams (Student Progress)", category: "Learner", path: "/b2b-center", icon: Users },
];

export function SearchModal({ open, onOpenChange, onSelectRoute }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filtered = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    onSelectRoute(path);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-4 rounded-2xl border border-gray-100 shadow-2xl top-[25%] translate-y-0">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search missions, learners, mock tests..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs bg-transparent outline-none text-[#17203a] placeholder-gray-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[10px] bg-gray-200 hover:bg-gray-300 text-gray-600 px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-3 space-y-1 max-h-60 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-6 text-xs text-gray-400">
              No results for “{query}”
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f5f6ff] transition text-left text-xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-[#6f63d9] group-hover:text-white grid place-items-center text-gray-600 transition">
                      <Icon size={14} />
                    </div>
                    <div>
                      <b className="block text-[#17203a] font-['Manrope']">{item.title}</b>
                      <small className="text-[10px] text-gray-400">{item.category}</small>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-[#6f63d9]" />
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
