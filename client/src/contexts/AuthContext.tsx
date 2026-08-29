import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "student" | "admin" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  workspace: string;
  workspaceType: string;
  targetExam?: string;
}

export interface Workspace {
  id: string;
  name: string;
  type: string;
  role: UserRole;
  avatar: string;
  badgeTone: "yellow" | "indigo" | "green";
}

export const WORKSPACES: Workspace[] = [
  {
    id: "ws-1",
    name: "Emma's workspace",
    type: "Student account",
    role: "student",
    avatar: "E",
    badgeTone: "yellow",
  },
  {
    id: "ws-2",
    name: "Cambridge English Hub — Oxford Center",
    type: "B2B Center Admin",
    role: "admin",
    avatar: "C",
    badgeTone: "indigo",
  },
  {
    id: "ws-3",
    name: "St. Jude Language School",
    type: "Instructor Team",
    role: "teacher",
    avatar: "S",
    badgeTone: "green",
  },
];

interface AuthContextType {
  user: User;
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  login: (email: string, pass: string) => boolean;
  loginAs: (role: UserRole) => void;
  register: (name: string, email: string, role: UserRole, targetExam?: string) => void;
  logout: () => void;
  switchWorkspace: (wsId: string) => void;
}

const defaultUser: User = {
  id: "u-1",
  name: "Emma Wilson",
  email: "emma.wilson@seeklight.io",
  role: "admin",
  avatar: "E",
  workspace: "Emma's workspace",
  workspaceType: "Student account",
  targetExam: "PET · B1 Preliminary",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem("seeklight_user");
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultUser;
  });

  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(() => {
    const saved = localStorage.getItem("seeklight_ws");
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return WORKSPACES[0];
  });

  useEffect(() => {
    localStorage.setItem("seeklight_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("seeklight_ws", JSON.stringify(currentWorkspace));
  }, [currentWorkspace]);

  const login = (email: string) => {
    const u: User = {
      id: "u-login",
      name: email.split("@")[0] || "Seeklight User",
      email,
      role: email.includes("admin") ? "admin" : "student",
      avatar: (email[0] || "U").toUpperCase(),
      workspace: currentWorkspace.name,
      workspaceType: currentWorkspace.type,
      targetExam: "PET · B1",
    };
    setUser(u);
    toast.success(`Welcome back, ${u.name}!`);
    return true;
  };

  const loginAs = (role: UserRole) => {
    if (role === "admin") {
      const u: User = {
        id: "u-admin",
        name: "Sarah Jenkins",
        email: "sarah.jenkins@oxfordcenter.ac.uk",
        role: "admin",
        avatar: "S",
        workspace: "Cambridge English Hub — Oxford Center",
        workspaceType: "B2B Center Admin",
        targetExam: "Cambridge Center Manager",
      };
      setUser(u);
      setCurrentWorkspace(WORKSPACES[1]);
      toast.success("Logged in as Center Administrator: Sarah Jenkins");
    } else if (role === "teacher") {
      const u: User = {
        id: "u-teacher",
        name: "Liam Parker",
        email: "liam.parker@seeklight.io",
        role: "teacher",
        avatar: "L",
        workspace: "St. Jude Language School",
        workspaceType: "Instructor Team",
        targetExam: "Lead Instructor · Speaking & Fluency",
      };
      setUser(u);
      setCurrentWorkspace(WORKSPACES[2]);
      toast.success("Logged in as Certified Instructor: Liam Parker");
    } else {
      const u: User = {
        id: "u-student",
        name: "Emma Wilson",
        email: "emma.wilson@seeklight.io",
        role: "student",
        avatar: "E",
        workspace: "Emma's workspace",
        workspaceType: "Student account",
        targetExam: "PET · B1 Preliminary",
      };
      setUser(u);
      setCurrentWorkspace(WORKSPACES[0]);
      toast.success("Logged in as Student: Emma Wilson");
    }
  };

  const register = (name: string, email: string, role: UserRole, targetExam = "PET · B1") => {
    const u: User = {
      id: "u-reg-" + Date.now(),
      name,
      email,
      role,
      avatar: (name[0] || "U").toUpperCase(),
      workspace: `${name}'s workspace`,
      workspaceType: role === "admin" ? "B2B Center Account" : "Student Account",
      targetExam,
    };
    setUser(u);
    toast.success(`Account created successfully! Welcome to Seeklight, ${name}.`);
  };

  const logout = () => {
    setUser({
      id: "u-guest",
      name: "Guest Learner",
      email: "guest@seeklight.io",
      role: "student",
      avatar: "G",
      workspace: "Demo Workspace",
      workspaceType: "Visitor Account",
    });
    toast.info("Logged out of session. Switched to guest demo mode.");
  };

  const switchWorkspace = (wsId: string) => {
    const found = WORKSPACES.find((w) => w.id === wsId);
    if (found) {
      setCurrentWorkspace(found);
      setUser((prev) => ({
        ...prev,
        workspace: found.name,
        workspaceType: found.type,
      }));
      toast.success(`Switched to "${found.name}"`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspaces: WORKSPACES,
        currentWorkspace,
        login,
        loginAs,
        register,
        logout,
        switchWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
