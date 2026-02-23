import { useState } from "react";
import { useNavigate } from "react-router";
import { Brain, Shield, Fingerprint, Building2, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFA, setTwoFA] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Route based on selected role
    switch(selectedRole) {
      case "employer":
        navigate("/employer");
        break;
      case "employee":
        navigate("/employee");
        break;
      default:
        navigate("/employee");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 flex items-center justify-center p-8">
      <div className="w-full max-w-5xl grid grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-600 p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">WorkConnect AI</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Intelligent Workforce Management
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Secure enterprise login with multi-role access and AI-powered authentication.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <Shield className="w-5 h-5" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Fingerprint className="w-5 h-5" />
              <span>Biometric authentication</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Brain className="w-5 h-5" />
              <span>AI-powered access control</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600">
              Select your role and sign in to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="text-slate-700 mb-3 block font-semibold">
                Select Role
              </Label>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedRole === "employee" 
                      ? "border-blue-600 bg-blue-50" 
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}>
                    <RadioGroupItem value="employee" id="employee" />
                    <div className="flex items-center gap-2 flex-1">
                      <User className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-900">Employee</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedRole === "employer" 
                      ? "border-blue-600 bg-blue-50" 
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}>
                    <RadioGroupItem value="employer" id="employer" />
                    <div className="flex items-center gap-2 flex-1">
                      <Building2 className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-900">Employer</span>
                    </div>
                  </label>
                </div>
              </RadioGroup>
              <Button
                type="button"
                variant="link"
                className="px-0 mt-2 text-blue-600 hover:text-blue-700"
                onClick={() => navigate("/admin/login")}
              >
                Admin / Super Admin Login
              </Button>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-slate-700 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-slate-700 mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            {/* 2FA */}
            <div>
              <Label htmlFor="twofa" className="text-slate-700 mb-2 block">
                Two-Factor Authentication Code
              </Label>
              <Input
                id="twofa"
                type="text"
                placeholder="000000"
                value={twoFA}
                onChange={(e) => setTwoFA(e.target.value)}
                className="h-12 text-base font-mono"
                maxLength={6}
              />
              <p className="text-xs text-slate-500 mt-1">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {/* Biometric Option */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Fingerprint className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-slate-700">Use Biometric Login</span>
              </div>
              <Button type="button" variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                Enable
              </Button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <Button type="button" variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                Forgot password?
              </Button>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-900 to-purple-600 hover:from-blue-800 hover:to-purple-500 text-base font-semibold"
            >
              Sign In Securely
            </Button>

            {/* Enterprise Badge */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Enterprise Security Certified • SOC 2 Type II</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
