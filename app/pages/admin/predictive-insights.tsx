import { AdminLayout } from "../../components/admin-layout";
import { Brain, AlertTriangle, TrendingUp, Users, Zap } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function PredictiveInsights() {
  const churnPredictionData = [
    { month: "Jan", predicted: 8, actual: 7 },
    { month: "Feb", predicted: 10, actual: 9 },
    { month: "Mar", predicted: 12, actual: 13 },
    { month: "Apr", predicted: 15, actual: 14 },
    { month: "May", predicted: 18, actual: 17 },
    { month: "Jun", predicted: 16, actual: 0 },
    { month: "Jul", predicted: 14, actual: 0 },
  ];

  const burnoutHeatmapData = [
    { dept: "Engineering", risk: 45, employees: 120 },
    { dept: "Sales", risk: 78, employees: 85 },
    { dept: "Marketing", risk: 32, employees: 60 },
    { dept: "Operations", risk: 55, employees: 95 },
    { dept: "Finance", risk: 28, employees: 45 },
    { dept: "HR", risk: 38, employees: 35 },
    { dept: "Customer Success", risk: 62, employees: 70 },
  ];

  const absenteeismData = [
    { week: "W1", rate: 3.2 },
    { week: "W2", rate: 2.8 },
    { week: "W3", rate: 4.5 },
    { week: "W4", rate: 3.9 },
    { week: "W5", rate: 5.2 },
    { week: "W6", rate: 4.8 },
    { week: "W7", rate: 3.6 },
    { week: "W8", rate: 3.1 },
  ];

  const overtimeRiskData = [
    { dept: "Engineering", hours: 145, threshold: 120 },
    { dept: "Sales", hours: 168, threshold: 120 },
    { dept: "Marketing", hours: 95, threshold: 120 },
    { dept: "Operations", hours: 132, threshold: 120 },
    { dept: "Finance", hours: 88, threshold: 120 },
  ];

  return (
    <AdminLayout title="Predictive Insights">
      <div className="p-8 space-y-6">
        {/* AI Insights Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">AI Predictive Analysis</h2>
                <p className="text-blue-100 max-w-2xl">
                  Machine learning models analyze workforce patterns to predict future trends and risks. 
                  Use these insights to take proactive action before issues arise.
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Model Accuracy</div>
              <div className="text-3xl font-bold text-white">96.8%</div>
            </div>
          </div>
        </div>

        {/* Key Prediction Metrics */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-sm text-slate-600">High Risk Employees</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">23</div>
            <p className="text-xs text-red-600 mt-1">Churn probability &gt;70%</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-sm text-slate-600">Burnout Risk</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">52%</div>
            <p className="text-xs text-orange-600 mt-1">Sales dept highest risk</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm text-slate-600">Performance Growth</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">+12%</div>
            <p className="text-xs text-purple-600 mt-1">Predicted next quarter</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-slate-600">Hiring Need</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">18</div>
            <p className="text-xs text-blue-600 mt-1">Positions in 3 months</p>
          </div>
        </div>

        {/* Employee Churn Prediction */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Employee Churn Prediction</h3>
              <p className="text-sm text-slate-600 mt-1">AI-predicted vs actual employee turnover</p>
            </div>
            <select className="px-4 py-2 rounded-lg border border-slate-200 text-sm">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
              <option>Last 24 months</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={churnPredictionData}>
              <defs>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="#7C3AED" 
                strokeWidth={2}
                fill="url(#predictedGradient)" 
                name="AI Predicted"
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#EF4444" 
                strokeWidth={2}
                fill="url(#actualGradient)" 
                name="Actual Turnover"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Burnout Risk Heatmap & Absenteeism Pattern */}
        <div className="grid grid-cols-2 gap-6">
          {/* Burnout Risk */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Burnout Risk Detection by Department</h3>
            
            <div className="space-y-3">
              {burnoutHeatmapData.map((dept, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{dept.dept}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">{dept.employees} employees</span>
                      <span className={`text-sm font-semibold ${
                        dept.risk > 60 ? 'text-red-600' : 
                        dept.risk > 40 ? 'text-orange-600' : 
                        'text-emerald-600'
                      }`}>{dept.risk}%</span>
                    </div>
                  </div>
                  <div className="h-10 bg-slate-100 rounded-lg overflow-hidden relative">
                    <div 
                      className={`h-full rounded-lg transition-all ${
                        dept.risk > 60 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                        dept.risk > 40 ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 
                        'bg-gradient-to-r from-emerald-400 to-emerald-500'
                      }`}
                      style={{ width: `${dept.risk}%` }}
                    ></div>
                    {dept.risk > 60 && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Absenteeism Pattern */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Absenteeism Pattern Analysis</h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={absenteeismData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="week" stroke="#64748B" />
                <YAxis stroke="#64748B" label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', r: 5 }}
                  name="Absence Rate"
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-orange-900">Pattern Detected</p>
                  <p className="text-xs text-orange-700 mt-1">
                    Spike in Week 5 correlates with project deadlines. Consider workload redistribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overtime Risk Alerts */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Overtime Risk Alerts</h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overtimeRiskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="dept" stroke="#64748B" />
              <YAxis stroke="#64748B" label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="threshold" fill="#94A3B8" name="Safe Threshold" radius={[8, 8, 0, 0]} />
              <Bar dataKey="hours" fill="#6366F1" name="Current Hours" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Suggestion Box */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">AI Recommended Actions</h3>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-white font-semibold mb-1">1. Increase engagement activities for Sales team</p>
                  <p className="text-blue-100 text-sm">High burnout risk detected. Schedule team building and wellness activities within next 2 weeks.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-white font-semibold mb-1">2. Review workload distribution in Operations</p>
                  <p className="text-blue-100 text-sm">Overtime hours 10% above threshold. Consider temporary staff augmentation or task reassignment.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-white font-semibold mb-1">3. Conduct stay interviews with 23 high-risk employees</p>
                  <p className="text-blue-100 text-sm">AI model predicts 70%+ churn probability. Proactive engagement could reduce turnover by 45%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
