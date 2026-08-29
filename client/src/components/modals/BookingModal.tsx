import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Radio, Calendar, Clock, CheckCircle2, User } from "lucide-react";
import { toast } from "sonner";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultInstructor?: string;
}

const INSTRUCTORS = [
  { name: "Maya Chen", role: "Storytelling & phonics", color: "#f7c948", initials: "MC" },
  { name: "Liam Parker", role: "Confidence & speaking", color: "#6f63d9", initials: "LP" },
  { name: "Sofia Mendes", role: "Reading adventures", color: "#45b58b", initials: "SM" },
];

const TIME_SLOTS = [
  "10:00 AM – 10:45 AM",
  "02:30 PM – 03:15 PM",
  "04:45 PM – 05:30 PM",
  "06:15 PM – 07:00 PM",
];

export function BookingModal({ open, onOpenChange, defaultInstructor }: BookingModalProps) {
  const [selectedInstructor, setSelectedInstructor] = useState(defaultInstructor || "Maya Chen");
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[1]);
  const [selectedDate, setSelectedDate] = useState("Tomorrow (Saturday)");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Live class booked with ${selectedInstructor} for ${selectedDate} at ${selectedSlot.split("–")[0]}!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-bold text-[#f7c948] bg-[#202b5a] w-fit px-2.5 py-1 rounded-md">
            <Radio size={13} /> LIVE TEACHING
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope'] mt-2">
            Book a Live Online Session
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Small group classes (max 6-8 students) led by Cambridge certified instructors.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBooking} className="space-y-4 mt-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-2">Select Instructor</label>
            <div className="grid grid-cols-3 gap-2">
              {INSTRUCTORS.map((ins) => (
                <button
                  key={ins.name}
                  type="button"
                  onClick={() => setSelectedInstructor(ins.name)}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    selectedInstructor === ins.name
                      ? "bg-[#f5f6ff] border-[#6f63d9] ring-1 ring-[#6f63d9]"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg mx-auto mb-1.5 grid place-items-center font-bold text-xs"
                    style={{ background: ins.color, color: ins.color === "#f7c948" ? "#202b5a" : "white" }}
                  >
                    {ins.initials}
                  </div>
                  <b className="block text-[11px] text-[#17203a] truncate">{ins.name.split(" ")[0]}</b>
                  <small className="text-[9px] text-gray-400 block truncate">{ins.role.split("&")[0]}</small>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Calendar size={13} /> Day
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium"
            >
              <option value="Tomorrow (Saturday)">Tomorrow (Saturday, Aug 30)</option>
              <option value="Monday (Sept 1)">Monday, Sept 1</option>
              <option value="Wednesday (Sept 3)">Wednesday, Sept 3</option>
              <option value="Next Saturday (Sept 6)">Saturday, Sept 6</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Clock size={13} /> Available Time Slots (Your Timezone)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-2.5 text-[11px] rounded-lg border font-semibold transition ${
                    selectedSlot === slot
                      ? "bg-[#202b5a] text-white border-[#202b5a]"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {slot}
                </button>
              ))}
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
              className="px-4 py-2 font-bold text-[#202b5a] bg-[#f7c948] rounded-lg hover:bg-[#e6b939] transition flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 size={14} /> Confirm Reservation
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
