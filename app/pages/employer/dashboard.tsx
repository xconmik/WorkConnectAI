import { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  Calendar, 
  Brain
} from "lucide-react";
import { EmployerLayout } from "../../components/employer-layout";
import { EmployerDashboardData, getEmployerDashboard } from "../../lib/employer-api";

export function EmployerDashboard() {
  const [dashboardData, setDashboardData] = useState<EmployerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEmployerDashboard();
        setDashboardData(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading || !dashboardData) {
    return (
      <EmployerLayout title="Team Dashboard">
        <div className="p-8 text-slate-500">Loading dashboard...</div>
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout title="Team Dashboard">
      <div className="p-8 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-sm text-slate-600">Team Size</div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{dashboardData.metrics.teamSize}</div>
                <p className="text-xs text-emerald-600 mt-1">{dashboardData.metrics.teamSizeDelta}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-sm text-slate-600">Team Performance</div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{dashboardData.metrics.teamPerformance}%</div>
                <p className="text-xs text-purple-600 mt-1">Above target</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-sm text-slate-600">Attendance Rate</div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{dashboardData.metrics.attendanceRate}%</div>
                <p className="text-xs text-emerald-600 mt-1">Excellent</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-sm text-slate-600">Pending Leaves</div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{dashboardData.metrics.pendingLeaves}</div>
                <p className="text-xs text-orange-600 mt-1">Requires approval</p>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">AI Recommendations for Your Team</h3>
                  <div className="space-y-2">
                    {dashboardData.recommendations.map((item) => (
                      <p key={item} className="text-blue-100 text-sm">• {item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Team Productivity Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dashboardData.charts.productivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="day" stroke="#64748B" />
                    <YAxis stroke="#64748B" domain={[80, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={3} dot={{ fill: '#7C3AED', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Attendance Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dashboardData.charts.attendance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="week" stroke="#64748B" />
                    <YAxis stroke="#64748B" domain={[90, 100]} />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Team Members Overview</h3>
              <div className="space-y-3">
                {dashboardData.teamMembers.map((member) => (
                  <div key={member.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">{member.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            member.status === 'present' ? 'bg-emerald-100 text-emerald-700' :
                            member.status === 'remote' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600">Performance</div>
                        <div className="text-lg font-bold text-slate-900">{member.performance}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payroll Overview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Payroll Overview</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">Current Month</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{dashboardData.payroll.currentMonth}</div>
                  <p className="text-xs text-slate-600 mt-1">Team payroll total</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-slate-600">Overtime Hours</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{dashboardData.payroll.overtimeHours}</div>
                  <p className="text-xs text-slate-600 mt-1">Within normal range</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-slate-600">Budget Status</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{dashboardData.payroll.budgetStatus}</div>
                  <p className="text-xs text-slate-600 mt-1">Of allocated budget</p>
                </div>
              </div>
            </div>
      </div>
    </EmployerLayout>
  );
}
