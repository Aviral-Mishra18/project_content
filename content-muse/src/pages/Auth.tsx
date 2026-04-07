import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleAuth = async (isLogin: boolean) => {
    if (!email || !password || (!isLogin && !name)) {
      toast({ 
        title: "Missing Information", 
        description: "Please fill in all required fields.", 
        variant: "destructive" 
      });
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const { data } = await api.post(endpoint, payload);
      
      login(data);
      toast({ 
        title: isLogin ? "Welcome Back!" : "Account Created", 
        description: isLogin ? "Redirecting to your dashboard..." : "Let's start creating some magic!" 
      });
      
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error: any) {
      console.error("Auth error:", error);
      const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || "An unexpected error occurred. Please try again.";
      toast({ 
        title: "Authentication Failed", 
        description: message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Branding & Trust */}
        <div className="hidden lg:block space-y-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/40 group-hover:scale-110 transition-transform">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tight text-foreground">ContentMuse</span>
            </Link>
            <h1 className="text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60">
              The Blueprint of Modern <span className="text-primary">Content.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Join 5,000+ creators using ContentMuse to dominate social algorithms with precision AI strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { icon: Zap, title: "Hyper-Performance", desc: "Optimized for raw engagement and reach." },
              { icon: ShieldCheck, title: "Tactical Safety", desc: "Enterprise-grade data encryption and privacy." },
              { icon: Globe, title: "Cross-Platform", desc: "Native strategies for X, IG, FB & LinkedIn." }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-card/40 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl shadow-black/20 rounded-3xl overflow-hidden">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="text-center pt-10 px-10">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl h-12 mb-8 bg-muted/50 p-1">
                <TabsTrigger value="login" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-lg">Log In</TabsTrigger>
                <TabsTrigger value="register" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-lg">Join ContentMuse</TabsTrigger>
              </TabsList>
              <CardTitle className="text-3xl font-black mb-2">Welcome to ContentMuse.</CardTitle>
              <CardDescription className="text-sm font-medium">Log in to your tactical command center.</CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Terminal</Label>
                  <Input 
                    id="email-login" 
                    type="email" 
                    placeholder="name@contentmuse.ai" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="password-login" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Access Key</Label>
                    <a href="#" className="text-[10px] font-black uppercase text-primary hover:underline">Reset?</a>
                  </div>
                  <Input 
                    id="password-login" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-medium" 
                  />
                </div>
                <Button 
                  className="w-full h-12 mt-4 text-md font-black gap-2 shadow-xl shadow-primary/20 rounded-xl"
                  onClick={() => handleAuth(true)}
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : <>Access Dashboard <ArrowRight className="h-4 w-4" /></>}
                </Button>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-register" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Identity</Label>
                  <Input 
                    id="name-register" 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Terminal</Label>
                  <Input 
                    id="email-register" 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Define Access Key</Label>
                  <Input 
                    id="password-register" 
                    type="password" 
                    placeholder="Create a strong password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-medium" 
                  />
                </div>
                <Button 
                  className="w-full h-12 mt-4 text-md font-black gap-2 shadow-xl shadow-primary/20 rounded-xl"
                  onClick={() => handleAuth(false)}
                  disabled={isLoading}
                >
                  {isLoading ? "Deploying..." : <>Initialize Account <ArrowRight className="h-4 w-4" /></>}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground font-medium px-4 leading-relaxed mt-4">
                  By joining, you agree to our <span className="text-primary underline cursor-pointer">Protocol</span> and <span className="text-primary underline cursor-pointer">Data Privacy</span>.
                </p>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
