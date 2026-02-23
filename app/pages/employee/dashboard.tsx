import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  DollarSign, 
  Award,
  Target,
  Brain,
  LogOut,
  Bell,
  Settings,
  FileText,
  Briefcase
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  EmployeeDashboardData,
  EmployeeNotification,
  getEmployeeDashboard,
  getEmployeeNotifications,
  markEmployeeNotificationsRead,
} from "../../lib/employee-api";

export function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dashboardData, setDashboardData] = useState<EmployeeDashboardData | null>(null);
  const [notifications, setNotifications] = useState<EmployeeNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [dashboard, notificationData] = await Promise.all([
          getEmployeeDashboard(),
          getEmployeeNotifications(),
        ]);
        setDashboardData(dashboard);
        setNotifications(notificationData.notifications);
        setUnreadCount(notificationData.unreadCount);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [location.pathname]);

  async function handleMarkAllRead() {
    const data = await markEmployeeNotificationsRead();
    setNotifications(data.notifications);
    setUnreadCount(data.unreadCount);
  }

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-900 to-blue-950 border-r border-blue-800 flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">WorkConnect AI</div>
              <div className="text-xs text-blue-300">Employee Portal</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate("/employee")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === "/employee"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-blue-200 hover:text-white hover:bg-blue-800/50"
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">My Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/employee/jobs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === "/employee/jobs"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-blue-200 hover:text-white hover:bg-blue-800/50"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-medium">Job List</span>
          </button>
        </nav>

        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
              AK
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Alex Kim</div>
              <div className="text-xs text-blue-300">Software Engineer</div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-200 hover:text-white hover:bg-blue-800/50"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{dashboardData.welcomeTitle}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setNotificationOpen(true)}>
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/employee/settings")}>
              <Settings className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {/* Personal Performance Score */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Your Performance Score</h2>
                    <p className="text-blue-100 mb-4">Keep up the excellent work!</p>
                    <div className="text-6xl font-bold text-white">{dashboardData.performance.score}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">{dashboardData.performance.monthDelta}</span>
                  </div>
                  <p className="text-blue-100 text-sm mt-2">{dashboardData.performance.ranking}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-sm text-slate-600">Attendance</div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{dashboardData.stats.attendance}%</div>
                <p className="text-xs text-emerald-600 mt-1">Excellent record</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-sm text-slate-600">Leave Balance</div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{dashboardData.stats.leaveBalance}</div>
                <p className="text-xs text-slate-600 mt-1">Days remaining</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-sm text-slate-600">Goals Complete</div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{dashboardData.stats.goalsCompleted}</div>
                <p className="text-xs text-emerald-600 mt-1">Q2 2026</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-sm text-slate-600">Pending Tasks</div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{dashboardData.stats.pendingTasks}</div>
                <p className="text-xs text-orange-600 mt-1">Due this week</p>
              </div>
            </div>

            {/* AI Career Growth Suggestion */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Career Growth Suggestions</h3>
                  <p className="text-slate-700 mb-4">
                    Based on your performance and career trajectory, our AI recommends the following to accelerate your growth:
                  </p>
                  
                  <div className="space-y-3">
                    {dashboardData.careerSuggestions.map((item) => (
                      <div key={item.title} className={`p-4 rounded-xl border ${item.theme === "purple" ? "bg-purple-50 border-purple-200" : "bg-blue-50 border-blue-200"}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.theme === "purple" ? "bg-purple-100" : "bg-blue-100"}`}>
                            {item.theme === "purple" ? <Award className="w-4 h-4 text-purple-600" /> : <Target className="w-4 h-4 text-blue-600" />}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                            <p className="text-sm text-slate-600 mb-2">{item.details}</p>
                            <button className={`text-sm font-medium ${item.theme === "purple" ? "text-purple-600 hover:text-purple-700" : "text-blue-600 hover:text-blue-700"}`}>
                              {item.action} →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Trend & Leave/Payroll */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Performance Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dashboardData.performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" />
                    <YAxis stroke="#64748B" domain={[80, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#7C3AED" 
                      strokeWidth={3} 
                      dot={{ fill: '#7C3AED', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-6">
                {/* Leave Summary */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Leave</h3>
                  <div className="space-y-3">
                    {dashboardData.upcomingLeaves.map((leave) => (
                      <div key={`${leave.date}-${leave.type}`} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">{leave.date}</div>
                          <div className="text-sm text-slate-600">{leave.type}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          leave.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {leave.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Request New Leave
                  </button>
                </div>

                {/* Payslip Preview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Payslips</h3>
                  <div className="space-y-3">
                    {dashboardData.recentPayslips.map((payslip) => (
                      <div key={payslip.month} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">{payslip.month}</div>
                          <div className="text-sm text-slate-600">Net pay</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">{payslip.amount}</div>
                          <button className="text-xs text-blue-600 hover:text-blue-700">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Development */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Skill Development Progress</h3>
              
              <div className="space-y-4">
                {dashboardData.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm font-semibold text-slate-900">{skill.value}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          skill.name === "Technical Skills"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600"
                            : skill.name === "Leadership"
                              ? "bg-gradient-to-r from-purple-500 to-purple-600"
                              : skill.name === "Communication"
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                                : "bg-gradient-to-r from-orange-500 to-orange-600"
                        }`}
                        style={{ width: `${skill.value}%` }}
                      ></div>
                    </div>
                    {skill.highlight && <p className="text-xs text-purple-600 mt-1">📈 Recommended focus area</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
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
            <Button variant="ghost" size="sm" onClick={() => setNotificationOpen(false)}>Close</Button>
          </div>

          <div className="p-4 border-b border-slate-200">
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>Mark all as read</Button>
          </div>

          <div className="p-4 space-y-3 overflow-auto">
            {notifications.length ? notifications.map((item) => (
              <div key={item.id} className={`rounded-xl border p-3 ${item.read ? "border-slate-200 bg-white" : "border-blue-200 bg-blue-50"}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{item.message}</p>
              </div>
            )) : <p className="text-sm text-slate-500">No notifications yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
