import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-background/80 backdrop-blur-xl border-border py-3 shadow-sm" 
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black text-foreground tracking-tighter">Content<span className="text-primary">Muse</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {isLanding && (
            <div className="flex items-center gap-6 mr-4">
              <a href="#features" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Features</a>
              <Link to="/how-it-works" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Neural Pipeline</Link>
            </div>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="gap-2 font-bold text-sm">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Button>
              </Link>
              <div className="h-4 w-[1px] bg-border mx-2" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-bold text-foreground">{user?.name || "Strategist"}</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Pro Member</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent p-[2px]">
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-xs font-bold">
                    {user?.name?.[0].toUpperCase() || "U"}
                  </div>
                </div>
                <Button onClick={logout} variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-all">Login</Link>
              <Link to="/register">
                <Button className="rounded-xl px-6 font-bold shadow-lg shadow-primary/20">
                  Get Started Free
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[72px] left-0 right-0 bottom-0 bg-background/95 backdrop-blur-2xl border-t border-border p-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {isLanding && (
              <div className="flex flex-col gap-4 border-b border-border/50 pb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product</p>
                <a href="#features" className="text-xl font-bold text-foreground" onClick={() => setMobileOpen(false)}>Features</a>
                <Link to="/how-it-works" className="text-xl font-bold text-foreground" onClick={() => setMobileOpen(false)}>Neural Pipeline</Link>
              </div>
            )}
            
            {isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Command Center</p>
                <Link to="/dashboard" className="flex items-center gap-3 text-xl font-bold text-foreground" onClick={() => setMobileOpen(false)}>
                  <LayoutDashboard className="h-5 w-5 text-primary" /> Dashboard
                </Link>
                <Link to="/generate" className="flex items-center gap-3 text-xl font-bold text-foreground" onClick={() => setMobileOpen(false)}>
                  <Sparkles className="h-5 w-5 text-amber-500" /> Muse Engine
                </Link>
                <Link to="/saved" className="flex items-center gap-3 text-xl font-bold text-foreground" onClick={() => setMobileOpen(false)}>
                  <LogOut className="h-5 w-5 text-purple-500 rotate-180" /> Tactical Vault
                </Link>
                <Link to="/profile" className="flex items-center gap-3 text-xl font-bold text-foreground" onClick={() => setMobileOpen(false)}>
                  <UserIcon className="h-5 w-5 text-muted-foreground" /> Settings
                </Link>
                <div className="h-[1px] bg-border/50 my-2" />
                <Button onClick={() => { logout(); setMobileOpen(false); }} variant="outline" className="w-full h-14 text-destructive border-destructive/20 bg-destructive/5 font-black text-lg rounded-2xl">
                  Logout System
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/login" className="text-xl font-bold text-foreground" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full h-14 font-black text-lg rounded-2xl shadow-xl shadow-primary/20">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

