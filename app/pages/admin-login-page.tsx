import { useState } from "react";
import { useNavigate } from "react-router";
import { Brain, Shield, Fingerprint, UserCog, Crown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFA, setTwoFA] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    switch (selectedRole) {
      case "admin":
      case "superadmin":
      default:
        navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 flex items-center justify-center p-8">
      <div className="w-full max-w-5xl grid grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-700 p-12 flex flex-col justify-between relative overflow-hidden">
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

            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">Admin Control Access</h1>
            <p className="text-slate-200 text-lg leading-relaxed">
              Dedicated secure sign-in for Admin and Super Admin access.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <Shield className="w-5 h-5" />
              <span>Privileged administrative access</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Fingerprint className="w-5 h-5" />
              <span>Two-factor verification</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Brain className="w-5 h-5" />
              <span>AI-guarded control surface</span>
            </div>
          </div>
        </div>

        <div className="p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Administrator Login</h2>
            <p className="text-slate-600">Select role and sign in</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label className="text-slate-700 mb-3 block font-semibold">Select Role</Label>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRole === "admin"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <RadioGroupItem value="admin" id="admin" />
                    <div className="flex items-center gap-2 flex-1">
                      <UserCog className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-900">Admin</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRole === "superadmin"
                        ? "border-purple-600 bg-purple-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <RadioGroupItem value="superadmin" id="superadmin" />
                    <div className="flex items-center gap-2 flex-1">
                      <Crown className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-slate-900">Super Admin</span>
                    </div>
                  </label>
                </div>
              </RadioGroup>
              <Button type="button" variant="link" className="px-0 mt-2 text-blue-600" onClick={() => navigate("/login")}>Back to Employee / Employer Login</Button>
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-700 mb-2 block">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700 mb-2 block">Password</Label>
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

            <div>
              <Label htmlFor="twofa" className="text-slate-700 mb-2 block">Two-Factor Authentication Code</Label>
              <Input
                id="twofa"
                type="text"
                placeholder="000000"
                value={twoFA}
                onChange={(e) => setTwoFA(e.target.value)}
                className="h-12 text-base font-mono"
                maxLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-slate-900 to-purple-700 hover:from-slate-800 hover:to-purple-600 text-base font-semibold"
            >
              Sign In to Admin Console
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
