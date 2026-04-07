import { NavLink } from "react-router-dom";
import { LayoutDashboard, User, Sparkles, Bookmark, Zap, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/generate", label: "Muse Engine", icon: Sparkles },
  { to: "/saved", label: "Saved Vault", icon: Bookmark },
  { to: "/profile", label: "Settings", icon: User },
];

const AppSidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card/40 backdrop-blur-md lg:block sticky top-20 h-[calc(100vh-80px)]">
      <div className="flex h-full flex-col px-4 py-8">
        <div className="space-y-1 mb-8">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-4 mb-4">Content Menu</p>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all duration-300 group",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto space-y-6">
          {/* Pro Upgrade Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
              <Zap className="h-10 w-10 text-primary" />
            </div>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Current Plan</p>
            <h4 className="font-bold text-sm mb-3">Pro Strategist</h4>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-primary rounded-full" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">850 / 1000 generations used</p>
          </div>

          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="h-4 w-4" /> Support Center
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;

