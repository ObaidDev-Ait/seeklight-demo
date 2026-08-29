// Style reminder: Campus Signal — la progression est toujours visible, les panneaux sont asymétriques, l’indigo structure, le jaune oriente, le violet signale l’IA.
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Flame,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  Mic,
  MoreHorizontal,
  Play,
  Radio,
  Search,
  Send,
  Settings2,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const logo = "/seeklight-logo.svg";
const heroImage = "/student-hero.svg";
const missionImage = "/mission-card.svg";
const arenaImage = "/arena-banner.svg";

type Screen = "student" | "live" | "ket" | "pet" | "arena" | "center" | "mission";

const navGroups = [
  { label: "AGES 6–9", items: [{ id: "live", label: "Live Teaching Hub", icon: Radio }] },
  { label: "AGES 10–14", items: [{ id: "ket", label: "KET Missions", icon: Target }, { id: "pet", label: "PET Missions", icon: Zap }] },
  { label: "ASSESSMENT", items: [{ id: "arena", label: "Cambridge Arena", icon: Trophy }] },
  { label: "ADMINISTRATION", items: [{ id: "center", label: "B2B Center Dashboard", icon: BarChart3 }] },
] as const;

const skillData = [
  { name: "Listening", value: 72, color: "#6f63d9", icon: Headphones },
  { name: "Reading", value: 68, color: "#f7c948", icon: BookOpen },
  { name: "Writing", value: 54, color: "#ef8354", icon: Send },
  { name: "Speaking", value: 61, color: "#45b58b", icon: Mic },
];

function ProgressBar({ value, color = "#6f63d9" }: { value: number; color?: string }) {
  return <div className="progress-track"><span style={{ width: `${value}%`, background: color }} /></div>;
}

function Badge({ children, tone = "indigo" }: { children: React.ReactNode; tone?: "indigo" | "yellow" | "green" | "violet" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Sidebar({ screen, setScreen, open, close }: { screen: Screen; setScreen: (s: Screen) => void; open: boolean; close: () => void }) {
  return <>
    {open && <button className="drawer-scrim" onClick={close} aria-label="Fermer le menu" />}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand-lockup">
        <div className="brand-mark"><img src={logo} alt="Seeklight" /></div>
        <div><strong>SEEKLIGHT</strong><span>English, made clearer.</span></div>
        <button className="mobile-close" onClick={close} aria-label="Fermer"><X size={19} /></button>
      </div>
      <div className="workspace-switcher"><div className="avatar avatar-yellow">E</div><div><b>Emma's workspace</b><small>Student account</small></div><ChevronRight size={15} /></div>
      <nav className="sidebar-nav">
        <button className={`nav-item ${screen === "student" ? "active" : ""}`} onClick={() => { setScreen("student"); close(); }}><LayoutDashboard size={18} /><span>My dashboard</span></button>
        {navGroups.map((group) => <div className="nav-group" key={group.label}><p>{group.label}</p>{group.items.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${screen === id ? "active" : ""}`} onClick={() => { setScreen(id); close(); }}><Icon size={17} /><span>{label}</span>{id === "pet" && <span className="mini-dot green" />}</button>)}</div>)}
      </nav>
      <div className="sidebar-bottom"><button className="nav-item" onClick={() => toast("Centre d’aide — demo flow") }><LifeBuoy size={17} /><span>Help & support</span></button><button className="nav-item" onClick={() => toast("Settings — demo flow")}><Settings2 size={17} /><span>Settings</span></button><div className="sidebar-footer"><span className="status-dot" /> Demo environment <span className="footer-version">v0.9</span></div></div>
    </aside>
  </>;
}

function Topbar({ screen, onMenu }: { screen: Screen; onMenu: () => void }) {
  const titles: Record<Screen, string> = {
    center: "Student dashboard",
    student: "Student dashboard",
    live: "Live Teaching Hub",
    ket: "KET Missions",
    pet: "PET Missions",
    arena: "Cambridge Arena",
    mission: "Mission Activity",
  };
  return <header className="topbar"><button className="mobile-menu" onClick={onMenu} aria-label="Ouvrir le menu"><Menu size={21} /></button><div className="crumb"><span>Workspace</span><ChevronRight size={14} /><b>{titles[screen] || "Student dashboard"}</b></div><div className="topbar-actions"><button className="icon-button" aria-label="Recherche"><Search size={18} /></button><button className="icon-button has-notification" aria-label="Notifications"><Bell size={18} /></button><div className="top-avatar">E</div></div></header>;
}

function PageIntro({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>{action}</div>;
}

function StudentDashboard({ setScreen }: { setScreen: (s: Screen) => void }) {
  return <div className="page-wrap"><PageIntro eyebrow="MON PARCOURS · PET / B1" title="Good morning, Emma." copy="Your next step is already lit up." action={<button className="secondary-button" onClick={() => toast("Profile preview opened")}>View profile <ArrowRight size={16} /></button>} />
    <section className="dashboard-hero"><div className="hero-copy"><Badge tone="yellow"><Sparkles size={13} /> Your learning pulse</Badge><h2>Keep your momentum<br /><em>bright.</em></h2><p>You’re on a <strong>6 day streak</strong>. One small session today keeps your progress moving forward.</p><button className="primary-button" onClick={() => setScreen("mission")}>Continue mission <ArrowRight size={17} /></button><div className="hero-meta"><span><Flame size={16} /> 6 day streak</span><span><Zap size={16} /> 1,840 XP</span><span><Award size={16} /> 12 missions</span></div></div><div className="hero-art"><img src={heroImage} alt="Students learning together" /><div className="hero-art-caption"><span className="caption-dot" /> Live learning, your way</div></div></section>
    <div className="section-heading"><div><span className="eyebrow">AT A GLANCE</span><h3>Your progress</h3></div><button className="text-button" onClick={() => setScreen("arena")}>See full report <ArrowRight size={15} /></button></div>
    <section className="metrics-grid"><div className="metric-card overall"><div className="metric-card-head"><span>Overall progress</span><MoreHorizontal size={18} /></div><div className="ring-wrap"><div className="progress-ring"><span>64<small>%</small></span></div><div><b>On track</b><p>+8% this month</p></div></div><ProgressBar value={64} color="#f7c948" /></div>{skillData.map(({ name, value, color, icon: Icon }) => <div className="metric-card skill-card" key={name}><div className="skill-icon" style={{ color, background: `${color}18` }}><Icon size={17} /></div><div className="metric-card-head"><span>{name}</span><b>{value}%</b></div><ProgressBar value={value} color={color} /><small>+{name === "Writing" ? 4 : 7}% this month</small></div>)}</section>
    <section className="lower-grid"><div className="panel mission-panel"><div className="panel-heading"><div><span className="eyebrow">IN PROGRESS</span><h3>Current mission</h3></div><Badge tone="green">PET · B1</Badge></div><div className="mission-feature"><div className="mission-feature-image"><img src={missionImage} alt="Planning a trip" /><span className="mission-number">03</span></div><div className="mission-feature-copy"><h4>Planning a Trip</h4><p>Travel vocabulary, booking conversations and writing travel plans.</p><div className="mission-progress-label"><span>2 of 4 skills complete</span><b>50%</b></div><ProgressBar value={50} color="#45b58b" /><button className="dark-button" onClick={() => setScreen("mission")}>Resume mission <ArrowRight size={16} /></button></div></div></div><div className="panel seeker-panel"><div className="seeker-orbit"><BrainCircuit size={23} /></div><div className="panel-heading"><div><span className="eyebrow purple">SEEKER AI</span><h3>A note for you</h3></div><span className="online-pill">Online</span></div><p>“Your listening score went up this week. Want to try a quick challenge to keep the streak alive?”</p><button className="outline-purple" onClick={() => toast("Seeker: Let's practice 5 minutes together!")}>Ask Seeker <Send size={15} /></button></div></section>
  </div>;
}

function MissionLibrary({ type, setScreen }: { type: "ket" | "pet"; setScreen: (s: Screen) => void }) {
  const isPet = type === "pet";
  return <div className="page-wrap"><PageIntro eyebrow={isPet ? "AGES 10–14 · PET" : "AGES 10–14 · KET"} title={`${isPet ? "PET" : "KET"} Missions`} copy={isPet ? "B1 level · Build confidence for real-world English." : "A2 level · Make everyday English your superpower."} action={<div className={`level-switcher ${isPet ? "pet-selected" : ""}`}><button onClick={() => setScreen("ket")} className={!isPet ? "selected" : ""}>KET <small>A2</small></button><button onClick={() => setScreen("pet")} className={isPet ? "selected" : ""}>PET <small>B1</small></button></div>} />
    <div className={`mission-banner ${isPet ? "pet-banner" : ""}`}><div><Badge tone={isPet ? "green" : "violet"}>{isPet ? "B1 · INTERMEDIATE" : "A2 · ELEMENTARY"}</Badge><h2>{isPet ? "Practice for the world ahead." : "Start with what you know."}</h2><p>Complete four-skill missions with practice, feedback and mock exercises that move at your pace.</p><div className="banner-pills"><span><Headphones size={14} /> Listening</span><span><BookOpen size={14} /> Reading</span><span><Send size={14} /> Writing</span><span><Mic size={14} /> Speaking</span></div></div><div className="banner-score"><span>LEVEL PROGRESS</span><b>{isPet ? "42" : "76"}<small>%</small></b><ProgressBar value={isPet ? 42 : 76} color={isPet ? "#45b58b" : "#f7c948"} /></div></div>
    <div className="section-heading"><div><span className="eyebrow">YOUR CURRICULUM</span><h3>Mission map</h3></div><button className="filter-button"><Activity size={15} /> All missions <ChevronRight size={14} /></button></div>
    <section className="mission-grid">{(isPet ? ["Planning a Trip", "Digital Life", "Making a Difference"] : ["My Daily Routine", "Around Town", "A Day at School"]).map((title, index) => <article className={`mission-card ${index === 0 ? "mission-card-featured" : ""}`} key={title} onClick={() => index === 0 && setScreen("mission")}><div className={`mission-card-top ${isPet ? "pet-top" : ""}`}><span className="mission-card-index">0{index + 1}</span><span className="mission-card-status">{index === 0 ? "IN PROGRESS" : index === 1 ? "UP NEXT" : "LOCKED"}</span>{index === 0 && <img src={missionImage} alt="" />}</div><div className="mission-card-content"><div className="mission-card-title"><h4>{title}</h4>{index === 0 && <span className="play-circle"><Play size={14} fill="currentColor" /></span>}</div><p>{isPet ? "Travel vocabulary, booking conversations, reading itineraries and writing travel plans." : "Practice listening, reading, writing and speaking about everyday activities and school life."}</p><div className="skill-dots"><span className="done" /><span className={index === 0 ? "done" : ""} /><span /><span /><small>{index === 0 ? "2 of 4 skills" : "4 skills"}</small></div></div></article>)}</section>
  </div>;
}

function MissionExperience({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [step, setStep] = useState(0); const [answer, setAnswer] = useState(""); const [submitted, setSubmitted] = useState(false); const [writing, setWriting] = useState(""); const steps = ["Listening", "Reading", "Writing", "Speaking"]; const current = steps[step];
  const choose = (value: string) => { setAnswer(value); setSubmitted(true); };
  return <div className="page-wrap focus-page"><button className="back-button" onClick={() => setScreen("pet")}><ChevronRight size={15} className="rotate-180" /> Back to missions</button><div className="mission-header"><div><span className="eyebrow green-text">MISSION 03 · PLANNING A TRIP</span><h1>Planning a Trip</h1><p>Build your travel confidence, one skill at a time.</p></div><div className="mission-step-count"><span>MISSION PROGRESS</span><b>{step + 1}<small> / 4</small></b></div></div><div className="stepper">{steps.map((s, i) => <button key={s} className={`${i === step ? "current" : ""} ${i < step ? "complete" : ""}`} onClick={() => setStep(i)}><span>{i < step ? <Check size={14} /> : i + 1}</span>{s}</button>)}</div><div className="activity-card"><div className="activity-topline"><Badge tone={step === 2 ? "violet" : "green"}>{current.toUpperCase()}</Badge><span>~ 4 min</span></div>{step === 0 && <><h2>School trip announcement</h2><p>Listen and select where the school trip is going.</p><div className="audio-player"><button className="audio-play" onClick={() => toast("Playing demo audio: School trip announcement")}><Play size={20} fill="currentColor" /></button><div><b>School trip announcement</b><span>0:00 <i /><span className="audio-line" /> 0:42</span></div><div className="audio-wave">▁▂▃▅▇▆▅▃▂▁▃▅▆▅▃▂</div></div><div className="question-label">Where is the school trip going?</div><div className="answer-options">{["Zoo", "Museum", "Library"].map((a) => <button key={a} className={`${answer === a ? "chosen" : ""} ${submitted && a === "Museum" ? "correct" : ""}`} onClick={() => choose(a)}><span>{a[0]}</span>{a}{submitted && a === "Museum" && <Check size={17} />}</button>)}</div>{submitted && <div className={`feedback ${answer === "Museum" ? "feedback-good" : "feedback-try"}`}><div>{answer === "Museum" ? <Check size={18} /> : <CircleHelp size={18} />}</div><p><b>{answer === "Museum" ? "Great job, Emma!" : "Almost there."}</b>{answer === "Museum" ? " You caught the key detail." : " Listen again and try one more time."}</p></div>}</>}{step === 1 && <><h2>A quick reading check</h2><p className="reading-copy">Emma usually leaves school at 3:15 pm. On Tuesdays, she stays a little longer for the travel club, where she plans the next class trip with her friends.</p><div className="question-label">What time does Emma usually leave school?</div><div className="answer-options">{["2:45 pm", "3:15 pm", "4:00 pm"].map((a) => <button key={a} className={`${answer === a ? "chosen" : ""} ${submitted && a === "3:15 pm" ? "correct" : ""}`} onClick={() => choose(a)}><span>{a.split(":")[0]}</span>{a}{submitted && a === "3:15 pm" && <Check size={17} />}</button>)}</div>{submitted && <div className="feedback feedback-good"><div><Check size={18} /></div><p><b>Exactly right.</b> You found the detail in the second sentence.</p></div>}</>}{step === 2 && <><h2>Write your travel plan</h2><p>Write about your daily routine in 50–80 words.</p><textarea value={writing} onChange={(e) => setWriting(e.target.value)} placeholder="Start writing here…" /><div className="textarea-footer"><span>{writing.length} / 80 words</span><button className="primary-button" onClick={() => { setSubmitted(true); toast("Writing submitted for demo assessment"); }}>Submit writing <Send size={15} /></button></div>{submitted && <div className="assessment-result"><div className="assessment-score"><span>AI ASSESSMENT</span><b>78<small>/100</small></b><Badge tone="yellow">Strong start</Badge></div><div><h4>Writing feedback</h4><p>Your writing is clear and easy to understand. Try using more past-tense verbs.</p><div className="correction"><span>“I go”</span><ArrowRight size={13} /><b>“I went”</b></div><span className="seeker-inline"><Sparkles size={14} /> Seeker: You’re doing really well! Let’s improve those past-tense verbs together.</span></div></div>}</>}{step === 3 && <><h2>Tell me about your last weekend.</h2><p>Speak naturally for up to 60 seconds. You can try again before submitting.</p><div className="recording-stage"><div className="record-ring"><Mic size={29} /></div><span>Ready when you are</span><small>Your microphone is only used for this demo.</small></div><button className="record-button" onClick={() => { setSubmitted(!submitted); toast(submitted ? "Recording paused" : "Recording started"); }}><span className={submitted ? "recording-dot" : ""} />{submitted ? "Stop recording" : "Start recording"}</button>{submitted && <div className="speaking-feedback"><Badge tone="green">DEMO FEEDBACK</Badge><h4>Clear and confident</h4><p>Good pace and natural delivery. Try adding one more detail to make your answer richer.</p></div>}</>}</div><div className="activity-footer"><span><Sparkles size={15} /> Seeker is here if you need a hint.</span><button className="next-button" onClick={() => { if (step < 3) { setStep(step + 1); setAnswer(""); setSubmitted(false); } else { setScreen("student"); toast("Mission complete — +240 XP"); } }}>{step === 3 ? "Complete mission" : "Next skill"} <ArrowRight size={16} /></button></div></div>;
}

function Arena({ setScreen }: { setScreen: (s: Screen) => void }) {
  return <div className="page-wrap"><PageIntro eyebrow="ASSESSMENT · CAMBRIDGE" title="Cambridge Arena" copy="A calm place to see how ready you are." action={<button className="primary-button" onClick={() => toast("Mock test launched in demo mode")}>Start a mock test <ArrowRight size={16} /></button>} /><section className="arena-banner"><img src={arenaImage} alt="Abstract assessment arena" /><div className="arena-overlay"><Badge tone="yellow">YOUR NEXT MILESTONE</Badge><h2>Make your progress count.</h2><p>Mock tests bring every skill together, with feedback you can act on.</p></div></section><section className="arena-grid"><div className="panel readiness"><div className="panel-heading"><div><span className="eyebrow">READINESS SNAPSHOT</span><h3>PET B1</h3></div><span className="readiness-score">68%</span></div><ProgressBar value={68} color="#45b58b" /><div className="readiness-row"><span>Listening</span><b>Ready</b><span className="ready-check"><Check size={13} /></span></div><div className="readiness-row"><span>Reading</span><b>Ready</b><span className="ready-check"><Check size={13} /></span></div><div className="readiness-row"><span>Writing</span><b>Building</b><span className="building-dot" /></div></div><div className="panel mock-card"><div className="mock-icon"><Trophy size={21} /></div><span className="eyebrow">PRACTICE MODE</span><h3>Full PET mock test</h3><p>4 parts · 45 questions · ~90 minutes</p><button className="dark-button" onClick={() => toast("Mock test preview opened")}>View test format <ArrowRight size={15} /></button></div></section></div>;
}

function LiveTeaching({ setScreen }: { setScreen: (s: Screen) => void }) {
  const teachers = [{ name: "Maya Chen", role: "Storytelling & phonics", color: "#f7c948", initials: "MC" }, { name: "Liam Parker", role: "Confidence & speaking", color: "#6f63d9", initials: "LP" }, { name: "Sofia Mendes", role: "Reading adventures", color: "#45b58b", initials: "SM" }];
  return <div className="page-wrap"><PageIntro eyebrow="AGES 6–9 · STARTERS / MOVERS" title="Live Teaching Hub" copy="Students learn through live online classes with certified instructors." action={<button className="secondary-button" onClick={() => toast("Demo booking flow")}>View class calendar <CalendarDays size={16} /></button>} /><section className="live-banner"><div><Badge tone="yellow"><Radio size={13} /> LIVE LEARNING</Badge><h2>Small classes.<br /><em>Big confidence.</em></h2><p>Friendly, focused sessions that make English feel like a shared adventure.</p></div><div className="live-stat"><span>THIS WEEK</span><b>14</b><small>live sessions</small></div><div className="live-stat"><span>CLASS SIZE</span><b>6–8</b><small>students max</small></div></section><div className="section-heading"><div><span className="eyebrow">MEET THE TEAM</span><h3>Certified instructors</h3></div><span className="muted-note">All times shown in your timezone</span></div><section className="teacher-grid">{teachers.map((t) => <article className="teacher-card" key={t.name}><div className="teacher-avatar" style={{ background: t.color }}>{t.initials}</div><span className="teacher-live"><i /> Available this week</span><h4>{t.name}</h4><p>{t.role}</p><button className="outline-button" onClick={() => toast("Demo booking flow — choose a time")}>Book live class <ArrowRight size={15} /></button></article>)}</section></div>;
}

function CenterDashboard({ setScreen }: { setScreen: (s: Screen) => void }) {
  return <div className="page-wrap"><PageIntro eyebrow="ADMINISTRATION · B2B CENTER" title="Center dashboard" copy="A clear view of every learner, mission and milestone." action={<button className="secondary-button" onClick={() => toast("Export prepared in demo mode")}>Export report <ArrowRight size={16} /></button>} /><section className="admin-stats"><div><span>Active learners</span><b>248</b><small className="up">↑ 12% this month</small></div><div><span>Missions completed</span><b>1,840</b><small className="up">↑ 8% this month</small></div><div><span>Average progress</span><b>68%</b><small className="up">↑ 5% this month</small></div><div><span>Mock tests taken</span><b>94</b><small className="neutral">Across 4 centers</small></div></section><section className="admin-grid"><div className="panel learner-panel"><div className="panel-heading"><div><span className="eyebrow">LEARNER ACTIVITY</span><h3>Recent progress</h3></div><button className="text-button" onClick={() => toast("Learner directory opened")}>View all <ArrowRight size={15} /></button></div><div className="learner-table"><div className="table-row table-head"><span>Learner</span><span>Level</span><span>Progress</span><span>Status</span></div>{[{n:"Emma Wilson",l:"PET · B1",p:70,s:"On track",c:"green"},{n:"Noah Adams",l:"KET · A2",p:82,s:"On track",c:"green"},{n:"Mia Johnson",l:"PET · B1",p:48,s:"Needs focus",c:"yellow"},{n:"Leo Martin",l:"KET · A2",p:35,s:"Needs focus",c:"yellow"}].map(x => <div className="table-row" key={x.n}><span><i className="table-avatar">{x.n.split(" ").map(a=>a[0]).join("")}</i>{x.n}</span><span>{x.l}</span><span><ProgressBar value={x.p} color={x.c === "green" ? "#45b58b" : "#f7c948"} /><small>{x.p}%</small></span><Badge tone={x.c === "green" ? "green" : "yellow"}>{x.s}</Badge></div>)}</div></div><div className="panel center-action"><div className="action-icon"><Users size={21} /></div><span className="eyebrow">CENTER TOOLS</span><h3>Build your next cohort</h3><p>Assign a mission, review skills and keep every learner moving together.</p><button className="dark-button" onClick={() => toast("Cohort builder opened")}>Manage learners <ArrowRight size={15} /></button></div></section></div>;
}

const screenPaths: Record<Screen, string> = {
  center: "/b2b-center",
  student: "/student",
  live: "/live-teaching",
  ket: "/missions/ket",
  pet: "/missions/pet",
  arena: "/cambridge-arena",
  mission: "/mission",
};

export default function Home() {
  const [location, setLocation] = useLocation();
  const routeScreen = (path: string): Screen => {
    if (path === "/student") return "student";
    if (path === "/live-teaching") return "live";
    if (path === "/missions/ket") return "ket";
    if (path === "/missions/pet") return "pet";
    if (path === "/mission") return "mission";
    if (path === "/cambridge-arena") return "arena";
    if (path === "/b2b-center") return "center";
    // Default to "center" (B2B Center Dashboard) so visiting root / shows the exact requested screen
    return "center";
  };

  const [screen, setScreenState] = useState<Screen>(() => routeScreen(location));
  const [menuOpen, setMenuOpen] = useState(false);

  const setScreen = (s: Screen) => {
    setScreenState(s);
    const target = screenPaths[s];
    if (target && target !== location) {
      setLocation(target);
    }
  };

  useEffect(() => {
    setScreenState(routeScreen(location));
  }, [location]);

  const page = useMemo(() => ({
    student: <StudentDashboard setScreen={setScreen} />,
    ket: <MissionLibrary type="ket" setScreen={setScreen} />,
    pet: <MissionLibrary type="pet" setScreen={setScreen} />,
    mission: <MissionExperience setScreen={setScreen} />,
    arena: <Arena setScreen={setScreen} />,
    live: <LiveTeaching setScreen={setScreen} />,
    center: <CenterDashboard setScreen={setScreen} />
  }[screen]), [screen]);

  return <div className="app-shell"><Sidebar screen={screen} setScreen={setScreen} open={menuOpen} close={() => setMenuOpen(false)} /><main className="main-area"><Topbar screen={screen} onMenu={() => setMenuOpen(true)} />{page}</main></div>;
}
