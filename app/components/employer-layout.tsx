import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Bell,
  Brain,
  LayoutDashboard,
  LogOut,
  Settings,
  Briefcase,
  FileText,
  Columns,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  EmployerNotification,
  getEmployerNotifications,
  markEmployerNotificationsRead,
} from "../lib/employer-api";

interface EmployerLayoutProps {
  children: ReactNode;
  title: string;
}

export function EmployerLayout({ children, title }: EmployerLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<EmployerNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const menuItems = [
    { path: "/employer", label: "Dashboard", icon: LayoutDashboard },
    { path: "/employer/job-portal", label: "Job Portal", icon: Briefcase },
    { path: "/employer/applications", label: "Applications", icon: FileText },
    { path: "/employer/candidate-pipeline", label: "Candidate Pipeline", icon: Columns },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    getEmployerNotifications()
      .then((data) => {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      })
      .catch(() => {
        setNotifications([]);
        setUnreadCount(0);
      });
  }, [location.pathname]);

  async function handleMarkAllRead() {
    const data = await markEmployerNotificationsRead();
    setNotifications(data.notifications);
    setUnreadCount(data.unreadCount);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">WorkConnect AI</div>
              <div className="text-xs text-slate-400">Employer Portal</div>
            </div>
          </div>
        </div>

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

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">John Doe</div>
              <div className="text-xs text-slate-400">Engineering Manager</div>
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

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setNotificationOpen(true)}>
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/employer/settings")}>
              <Settings className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-30 transition-transform duration-300 ${
          notificationOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              <p className="text-xs text-slate-500">{unreadCount} unread</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setNotificationOpen(false)}>
              Close
            </Button>
          </div>

          <div className="p-4 border-b border-slate-200">
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>Mark all as read</Button>
          </div>

          <div className="p-4 space-y-3 overflow-auto">
            {notifications.length ? (
              notifications.map((item) => (
                <div key={item.id} className={`rounded-xl border p-3 ${item.read ? "border-slate-200 bg-white" : "border-blue-200 bg-blue-50"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.message}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No notifications yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
