import { AdminLayout } from "../../components/admin-layout";
import { DollarSign, TrendingUp, AlertCircle, Brain, PieChart as PieChartIcon } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function PayrollIntelligence() {
  const salaryTrendData = [
    { month: "Jan", actual: 450, forecast: 452 },
    { month: "Feb", actual: 460, forecast: 462 },
    { month: "Mar", actual: 470, forecast: 469 },
    { month: "Apr", actual: 480, forecast: 481 },
    { month: "May", actual: 485, forecast: 486 },
    { month: "Jun", actual: 492, forecast: 493 },
    { month: "Jul", actual: 0, forecast: 498 },
    { month: "Aug", actual: 0, forecast: 505 },
  ];

  const overtimeCostData = [
    { dept: "Engineering", cost: 28500, predicted: 31200 },
    { dept: "Sales", cost: 35600, predicted: 42300 },
    { dept: "Operations", cost: 22400, predicted: 24800 },
    { dept: "Customer Success", cost: 18900, predicted: 20500 },
  ];

  const budgetVariance = [
    { category: "Base Salary", budgeted: 385000, actual: 382000 },
    { category: "Bonuses", budgeted: 45000, actual: 48500 },
    { category: "Benefits", budgeted: 62000, actual: 61500 },
    { category: "Overtime", budgeted: 28000, actual: 35600 },
  ];

  const anomalies = [
    {
      employee: "John Smith",
      dept: "Sales",
      issue: "Overtime 45% above average",
      amount: "$8,450",
      severity: "high"
    },
    {
      employee: "Sarah Johnson",
      dept: "Engineering",
      issue: "Duplicate bonus entry detected",
      amount: "$5,000",
      severity: "critical"
    },
    {
      employee: "Mike Chen",
      dept: "Operations",
      issue: "Missing timesheet entries",
      amount: "$2,340",
      severity: "medium"
    },
    {
      employee: "Lisa Anderson",
      dept: "Marketing",
      issue: "Benefits calculation variance",
      amount: "$1,240",
      severity: "low"
    }
  ];

  return (
    <AdminLayout title="Payroll Intelligence">
      <div className="p-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-slate-600">Current Month</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">$492K</div>
            <p className="text-xs text-blue-600 mt-1">+1.4% from last month</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm text-slate-600">Next Month Forecast</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">$498K</div>
            <p className="text-xs text-purple-600 mt-1">AI projected +1.2%</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <PieChartIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-sm text-slate-600">Budget Variance</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">+2.8%</div>
            <p className="text-xs text-emerald-600 mt-1">Within acceptable range</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-sm text-slate-600">Anomalies Detected</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">4</div>
            <p className="text-xs text-red-600 mt-1">Requires attention</p>
          </div>
        </div>

        {/* Salary Trend Forecasting */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Salary Trend Forecasting</h3>
              <p className="text-sm text-slate-600 mt-1">Historical data with AI-powered predictions</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-50 border border-purple-200">
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">AI Forecast Active</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={salaryTrendData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" label={{ value: 'Amount ($K)', angle: -90, position: 'insideLeft' }} />
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
                dataKey="actual" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fill="url(#actualGradient)" 
                name="Actual Payroll"
              />
              <Area 
                type="monotone" 
                dataKey="forecast" 
                stroke="#7C3AED" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#forecastGradient)" 
                name="AI Forecast"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>AI Insight:</strong> Projected payroll increase of $13K over next 2 months due to seasonal hiring and scheduled raises. Budget allocation recommended.
            </p>
          </div>
        </div>

        {/* Overtime Cost Prediction & Budget Variance */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Overtime Cost Prediction</h3>
            
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={overtimeCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="dept" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="cost" fill="#3B82F6" name="Current Month" radius={[8, 8, 0, 0]} />
                <Bar dataKey="predicted" fill="#7C3AED" name="Next Month (AI)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <p className="text-sm text-orange-900">
                  Sales department overtime predicted to increase by 19%. Consider workload review.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Budget Variance Alerts</h3>
            
            <div className="space-y-4">
              {budgetVariance.map((item, index) => {
                const variance = ((item.actual - item.budgeted) / item.budgeted) * 100;
                const isOver = variance > 0;
                
                return (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-900">{item.category}</span>
                      <span className={`text-sm font-bold ${isOver ? 'text-red-600' : 'text-emerald-600'}`}>
                        {isOver ? '+' : ''}{variance.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Budgeted: ${item.budgeted.toLocaleString()}</span>
                      <span>Actual: ${item.actual.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isOver ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min((item.actual / item.budgeted) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Payroll Anomaly Detection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Payroll Anomaly Detection</h3>
              <p className="text-sm text-slate-600 mt-1">AI-detected irregularities requiring review</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Review All
            </button>
          </div>

          <div className="space-y-3">
            {anomalies.map((anomaly, index) => (
              <div 
                key={index}
                className={`p-5 rounded-xl border-2 ${
                  anomaly.severity === 'critical' ? 'bg-red-50 border-red-200' :
                  anomaly.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                  anomaly.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        anomaly.severity === 'critical' ? 'bg-red-200 text-red-900' :
                        anomaly.severity === 'high' ? 'bg-orange-200 text-orange-900' :
                        anomaly.severity === 'medium' ? 'bg-yellow-200 text-yellow-900' :
                        'bg-blue-200 text-blue-900'
                      }`}>
                        {anomaly.severity}
                      </span>
                      <span className="font-semibold text-slate-900">{anomaly.employee}</span>
                      <span className="text-sm text-slate-600">• {anomaly.dept}</span>
                    </div>
                    <p className="text-sm text-slate-700 mb-1">{anomaly.issue}</p>
                    <p className="text-lg font-bold text-slate-900">{anomaly.amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                      Review
                    </button>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Financial Summary */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Generated Financial Summary</h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                Based on comprehensive analysis of payroll data, employee performance metrics, and market trends, the AI model projects a steady 1.2-1.5% monthly increase in total payroll costs over the next quarter. This growth is primarily driven by scheduled merit increases, seasonal hiring in Sales and Engineering departments, and projected overtime in Customer Success.
              </p>
              <p className="text-blue-100 leading-relaxed mb-4">
                Current budget variance of +2.8% is within acceptable parameters, though overtime costs in Sales department warrant attention. The AI recommends implementing workload balancing strategies to reduce projected overtime costs by an estimated $12,000 next month.
              </p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-xs text-blue-100">Projected Annual Savings</div>
                  <div className="text-xl font-bold text-white">$145K</div>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-xs text-blue-100">Forecast Accuracy</div>
                  <div className="text-xl font-bold text-white">97.3%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
