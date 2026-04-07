import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, ArrowRight, Github } from "lucide-react";

import api from "@/lib/api";
import { toast } from "@/hooks/use-toast";

import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      login(data);
      toast({
        title: "Account created!",
        description: "Welcome to Content-AI.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Register Error:", error);
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Registration error. Email might be in use.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">SocialContent-AI</span>
          </Link>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create account</CardTitle>
            <CardDescription className="text-center">
              Let&apos;s get you set up to create viral content
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-background/50" />
              </div>
              <div className="flex items-center space-x-2 py-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link to="#" className="text-primary underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>
              <Button type="submit" className="w-full gap-2 py-6 text-lg font-semibold" disabled={loading}>
                {loading ? "Creating..." : "Register"} <ArrowRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </form>
          <div className="px-6 pb-6 pt-0">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2 border-border/50 bg-background/50">
              <Github className="h-4 w-4" /> Github
            </Button>
          </div>
          <CardFooter className="flex flex-wrap justify-center gap-1 text-sm text-muted-foreground border-t border-border/50 pt-6">
            Already have an account?
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Login here
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
