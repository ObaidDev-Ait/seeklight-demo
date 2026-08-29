// Style reminder: Campus Signal — every route keeps the indigo campus rail and beacon-led progression language.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/student" component={Home} />
      <Route path="/live-teaching" component={Home} />
      <Route path="/missions/ket" component={Home} />
      <Route path="/missions/pet" component={Home} />
      <Route path="/mission" component={Home} />
      <Route path="/cambridge-arena" component={Home} />
      <Route path="/b2b-center" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
