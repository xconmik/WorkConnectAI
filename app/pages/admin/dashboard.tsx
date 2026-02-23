import { AdminLayout } from "../../components/admin-layout";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function AdminDashboard() {
  // Mock data for charts
  const workforceHealthData = [
    { month: "Jan", score: 88 },
    { month: "Feb", score: 91 },
    { month: "Mar", score: 89 },
    { month: "Apr", score: 93 },
    { month: "May", score: 94 },
    { month: "Jun", score: 94 },
  ];

  const attritionData = [
    { month: "Jan", risk: 12 },
    { month: "Feb", risk: 10 },
    { month: "Mar", risk: 15 },
    { month: "Apr", risk: 13 },
    { month: "May", risk: 18 },
    { month: "Jun", risk: 18 },
  ];

  const productivityData = [
    { day: "Mon", value: 85 },
    { day: "Tue", value: 88 },
    { day: "Wed", value: 92 },
    { day: "Thu", value: 89 },
    { day: "Fri", value: 87 },
    { day: "Sat", value: 78 },
  ];

  const payrollData = [
    { month: "Jan", amount: 450 },
    { month: "Feb", amount: 460 },
    { month: "Mar", amount: 470 },
    { month: "Apr", amount: 480 },
    { month: "May", amount: 485 },
    { month: "Jun", amount: 492 },
  ];

  const attendanceData = [
    { name: "On Time", value: 856, color: "#10B981" },
    { name: "Late", value: 34, color: "#F59E0B" },
    { name: "Absent", value: 12, color: "#EF4444" },
  ];

  const departmentPerformance = [
    { dept: "Engineering", score: 94, trend: "up" },
    { dept: "Sales", score: 87, trend: "down" },
    { dept: "Marketing", score: 91, trend: "up" },
    { dept: "Operations", score: 89, trend: "up" },
    { dept: "Finance", score: 92, trend: "up" },
    { dept: "HR", score: 88, trend: "stable" },
  ];

  const aiRecommendations = [
    {
      priority: "high",
      title: "Sales Team Burnout Risk",
      description: "AI detected increased overtime and decreased productivity in Sales team. Recommend wellness intervention.",
      action: "Schedule team review"
    },
    {
      priority: "medium",
      title: "Engineering Hiring Opportunity",
      description: "Optimal hiring window detected. Market competition is 23% lower than average.",
      action: "Post positions"
    },
    {
      priority: "low",
      title: "Training Impact Positive",
      description: "Recent leadership training increased team performance by 12% on average.",
      action: "Continue program"
    }
  ];

  return (
    <AdminLayout title="AI Overview Dashboard">
      <div className="p-8 space-y-6">
        {/* Top AI Insight Cards */}
        <div className="grid grid-cols-5 gap-6">
          {/* Workforce Health Score */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            
            <div className="text-3xl font-bold text-slate-900 mb-1">94</div>
            <div className="text-sm text-slate-600 mb-3">Workforce Health Score</div>
            
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={workforceHealthData}>
                <Area type="monotone" dataKey="score" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="mt-3 text-xs text-slate-500 leading-relaxed">
              <span className="text-emerald-600 font-semibold">+3% this month</span> • Overall workforce engagement and health improving
            </div>
          </div>

          {/* Attrition Risk */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            
            <div className="text-3xl font-bold text-slate-900 mb-1">18%</div>
            <div className="text-sm text-slate-600 mb-3">Attrition Risk</div>
            
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={attritionData}>
                <Line type="monotone" dataKey="risk" stroke="#F97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-3 text-xs text-slate-500 leading-relaxed">
              <span className="text-orange-600 font-semibold">+8% increase</span> • Risk of turnover increased this month
            </div>
          </div>

          {/* Productivity Index */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            
            <div className="text-3xl font-bold text-slate-900 mb-1">87.5</div>
            <div className="text-sm text-slate-600 mb-3">Productivity Index</div>
            
            <ResponsiveContainer width="100%" height={40}>
              <BarChart data={productivityData}>
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-3 text-xs text-slate-500 leading-relaxed">
              <span className="text-blue-600 font-semibold">Above target</span> • Team efficiency exceeding goals
            </div>
          </div>

          {/* Payroll Forecast */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            
            <div className="text-3xl font-bold text-slate-900 mb-1">$492K</div>
            <div className="text-sm text-slate-600 mb-3">Next Month Forecast</div>
            
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={payrollData}>
                <Area type="monotone" dataKey="amount" stroke="#9333EA" fill="#9333EA" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="mt-3 text-xs text-slate-500 leading-relaxed">
              <span className="text-purple-600 font-semibold">+1.4% projected</span> • Within budget parameters
            </div>
          </div>

          {/* Attendance Anomaly */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            
            <div className="text-3xl font-bold text-slate-900 mb-1">95%</div>
            <div className="text-sm text-slate-600 mb-3">Attendance Rate</div>
            
            <ResponsiveContainer width="100%" height={40}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={12}
                  outerRadius={20}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-3 text-xs text-slate-500 leading-relaxed">
              <span className="text-emerald-600 font-semibold">Normal range</span> • No anomalies detected
            </div>
          </div>
        </div>

        {/* AI Recommendations Section */}
        <div className="bg-gradient-to-br from-blue-900 to-purple-600 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI-Powered Recommendations</h2>
              <p className="text-blue-100 text-sm">Smart insights and suggested actions</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    rec.priority === "high" 
                      ? "bg-red-500/20 text-red-200" 
                      : rec.priority === "medium"
                      ? "bg-yellow-500/20 text-yellow-200"
                      : "bg-green-500/20 text-green-200"
                  }`}>
                    {rec.priority.toUpperCase()}
                  </span>
                  <Brain className="w-4 h-4 text-white/70" />
                </div>
                <h3 className="font-semibold text-white mb-2">{rec.title}</h3>
                <p className="text-sm text-blue-100 mb-4 leading-relaxed">{rec.description}</p>
                <button className="text-sm font-medium text-white hover:text-blue-200 transition-colors flex items-center gap-1">
                  {rec.action} →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance & Recent Activity */}
        <div className="grid grid-cols-2 gap-6">
          {/* Department Performance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Department Performance</h3>
            <div className="space-y-4">
              {departmentPerformance.map((dept, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{dept.dept}</span>
                      <span className="text-sm font-semibold text-slate-900">{dept.score}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${dept.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    {dept.trend === "up" && <TrendingUp className="w-5 h-5 text-emerald-500" />}
                    {dept.trend === "down" && <TrendingDown className="w-5 h-5 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Real-Time Activity Feed</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">New employee onboarded: <span className="font-semibold">Sarah Johnson</span></p>
                  <p className="text-xs text-slate-500 mt-1">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">AI detected performance improvement in <span className="font-semibold">Engineering</span></p>
                  <p className="text-xs text-slate-500 mt-1">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">Payroll anomaly detected and resolved</p>
                  <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">New recruitment campaign launched for <span className="font-semibold">Senior Developer</span></p>
                  <p className="text-xs text-slate-500 mt-1">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-slate-300 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">Weekly performance reports generated</p>
                  <p className="text-xs text-slate-500 mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
