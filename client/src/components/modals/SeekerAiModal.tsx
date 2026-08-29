import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BrainCircuit, Send, Sparkles, Bot, User } from "lucide-react";

interface Message {
  sender: "seeker" | "user";
  text: string;
}

interface SeekerAiModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SeekerAiModal({ open, onOpenChange }: SeekerAiModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "seeker",
      text: "Hi Emma! Your Cambridge listening score increased by +8% this week. Would you like a 2-minute quick vocabulary challenge or feedback on past-tense verbs?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsgs: Message[] = [...messages, { sender: "user", text: userText }];
    setMessages(newMsgs);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let reply = "That's fantastic practice! For Cambridge B1, remember that irregular past tenses like 'went', 'bought', and 'caught' appear frequently in the listening paper.";
      if (userText.toLowerCase().includes("listening")) {
        reply = "Great choice! In the PET listening exam, always read the questions during the 45-second pause before the audio begins to highlight keywords!";
      } else if (userText.toLowerCase().includes("streak") || userText.toLowerCase().includes("xp")) {
        reply = "You're on a 6-day streak with 1,840 XP! Complete one mission activity today to reach Level 4 badge status!";
      }
      setMessages([...newMsgs, { sender: "seeker", text: reply }]);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6f63d9]">
              <BrainCircuit size={16} /> SEEKER AI TUTOR
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
              ● Active B1 Companion
            </span>
          </div>
          <DialogTitle className="text-xl font-extrabold text-[#17203a] font-['Manrope'] mt-1">
            Ask Seeker
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Personalized Cambridge exam guidance and instant grammar hints.
          </DialogDescription>
        </DialogHeader>

        {/* Message Thread */}
        <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2 text-xs ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "seeker" && (
                <div className="w-6 h-6 rounded-full bg-[#6f63d9] text-white grid place-items-center shrink-0 text-[10px]">
                  <Sparkles size={13} />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-[85%] ${
                  m.sender === "user"
                    ? "bg-[#202b5a] text-white rounded-br-none"
                    : "bg-[#f5f6ff] text-[#2c3454] border border-[#e1e4fc] rounded-bl-none leading-relaxed"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {[
            "Give me a quick listening tip",
            "Explain irregular past verbs",
            "How do I improve my writing score?",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="text-[10px] font-semibold bg-gray-100 hover:bg-[#ece9ff] hover:text-[#6f63d9] text-gray-600 px-2.5 py-1 rounded-full transition"
            >
              + {chip}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2 mt-3"
        >
          <input
            type="text"
            placeholder="Ask Seeker anything about your English..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#6f63d9] focus:bg-white"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-[#6f63d9] text-white rounded-lg hover:bg-[#594ebf] transition"
          >
            <Send size={14} />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
