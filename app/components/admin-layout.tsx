import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { 
  Brain, 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  DollarSign, 
  UserPlus, 
  AlertTriangle, 
  FileText, 
  Settings, 
  Shield,
  LogOut,
  Bell,
  Search,
  Briefcase,
  Columns
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "AI Overview", icon: LayoutDashboard },
    { path: "/admin/workforce-analytics", label: "Workforce Analytics", icon: TrendingUp },
    { path: "/admin/predictive-insights", label: "Predictive Insights", icon: Brain },
    { path: "/admin/payroll-intelligence", label: "Payroll Intelligence", icon: DollarSign },
    { path: "/admin/recruitment-ai", label: "Recruitment AI", icon: UserPlus },
    { path: "/admin/job-portal", label: "Job Portal", icon: Briefcase },
    { path: "/admin/applications", label: "Applications", icon: FileText },
    { path: "/admin/candidate-pipeline", label: "Candidate Pipeline", icon: Columns },
    { path: "/admin/risk-detection", label: "Risk Detection", icon: AlertTriangle },
    { path: "/admin/role-management", label: "Role & Access", icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Dark Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">WorkConnect AI</div>
              <div className="text-xs text-slate-400">Super Admin</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
              SA
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Super Admin</div>
              <div className="text-xs text-slate-400">admin@company.com</div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="Search..." 
                className="w-64 pl-10 h-9 bg-slate-50 border-slate-200"
              />
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
