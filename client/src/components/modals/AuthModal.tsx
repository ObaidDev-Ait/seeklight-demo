import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, User, Building2, GraduationCap, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({ open, onOpenChange, defaultTab = "login" }: AuthModalProps) {
  const { user, login, loginAs, register, logout } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState<"student" | "admin" | "teacher">("student");
  const [regExam, setRegExam] = useState("PET · B1 Preliminary");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, password);
    onOpenChange(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) return;
    register(regName, regEmail, regRole, regExam);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold tracking-widest text-[#6f63d9] uppercase">
              SEEK LIGHT AUTHENTICATION
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ShieldCheck size={13} /> Demo Security
            </div>
          </div>
          <DialogTitle className="text-2xl font-extrabold text-[#17203a] font-['Manrope'] mt-1">
            {tab === "login" ? "Welcome back" : "Create demo account"}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Experience Seeklight Cambridge preparation with role-based access.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Demo Role Switcher */}
        <div className="mt-4 p-3 bg-[#f7f8fc] rounded-xl border border-gray-200/80">
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-500 mb-2">
            One-Click Demo Roles
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                loginAs("admin");
                onOpenChange(false);
              }}
              className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#6f63d9] hover:bg-[#f5f6ff] transition"
            >
              <div className="w-7 h-7 rounded-lg bg-[#202b5a] text-[#f7c948] grid place-items-center">
                <Building2 size={15} />
              </div>
              <span className="text-[10px] font-extrabold text-[#17203a]">Center Admin</span>
              <small className="text-[9px] text-gray-400">Sarah J.</small>
            </button>

            <button
              onClick={() => {
                loginAs("student");
                onOpenChange(false);
              }}
              className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#f7c948] hover:bg-[#fffdf5] transition"
            >
              <div className="w-7 h-7 rounded-lg bg-[#f7c948] text-[#202b5a] grid place-items-center font-black text-xs">
                E
              </div>
              <span className="text-[10px] font-extrabold text-[#17203a]">Student</span>
              <small className="text-[9px] text-gray-400">Emma W.</small>
            </button>

            <button
              onClick={() => {
                loginAs("teacher");
                onOpenChange(false);
              }}
              className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#45b58b] hover:bg-[#f1faf6] transition"
            >
              <div className="w-7 h-7 rounded-lg bg-[#45b58b] text-white grid place-items-center">
                <GraduationCap size={15} />
              </div>
              <span className="text-[10px] font-extrabold text-[#17203a]">Instructor</span>
              <small className="text-[9px] text-gray-400">Liam P.</small>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-200 mt-4 text-xs font-bold">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 text-center border-b-2 transition ${
              tab === "login"
                ? "border-[#202b5a] text-[#202b5a]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2 text-center border-b-2 transition ${
              tab === "register"
                ? "border-[#202b5a] text-[#202b5a]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Create Account
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3 mt-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="name@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#202b5a] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#202b5a] focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#202b5a]" /> Remember me
              </label>
              <button
                type="button"
                onClick={() => toast("Password reset link sent to demo inbox!")}
                className="text-[#6f63d9] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-[#202b5a] text-white text-xs font-bold rounded-lg hover:bg-[#2c3870] transition flex items-center justify-center gap-1.5"
            >
              Sign In <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 mt-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Chen"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#202b5a]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Email address</label>
              <input
                type="email"
                required
                placeholder="maya@seeklight.io"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#202b5a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Role</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as any)}
                  className="w-full text-xs px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                >
                  <option value="student">Student</option>
                  <option value="admin">Center Admin</option>
                  <option value="teacher">Instructor</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Exam Level</label>
                <select
                  value={regExam}
                  onChange={(e) => setRegExam(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                >
                  <option value="KET · A2 Key">KET · A2 Key</option>
                  <option value="PET · B1 Preliminary">PET · B1 Preliminary</option>
                  <option value="FCE · B2 First">FCE · B2 First</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-[#f7c948] text-[#202b5a] text-xs font-bold rounded-lg hover:bg-[#eab936] transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              Create Account <CheckCircle2 size={14} />
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
