import { AdminLayout } from "../../components/admin-layout";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, Users, Building2, MapPin, Calendar } from "lucide-react";

export function WorkforceAnalytics() {
  const headcountGrowth = [
    { month: "Jan", count: 850 },
    { month: "Feb", count: 875 },
    { month: "Mar", count: 892 },
    { month: "Apr", count: 915 },
    { month: "May", count: 928 },
    { month: "Jun", count: 945 },
  ];

  const departmentData = [
    { dept: "Engineering", employees: 245, performance: 92 },
    { dept: "Sales", employees: 185, performance: 87 },
    { dept: "Marketing", employees: 125, performance: 89 },
    { dept: "Operations", employees: 160, performance: 91 },
    { dept: "Finance", employees: 95, performance: 90 },
    { dept: "HR", employees: 65, performance: 88 },
    { dept: "Customer Success", employees: 70, performance: 93 },
  ];

  const salaryDistribution = [
    { range: "$40-60K", count: 180, color: "#93C5FD" },
    { range: "$60-80K", count: 285, color: "#60A5FA" },
    { range: "$80-100K", count: 245, color: "#3B82F6" },
    { range: "$100-120K", count: 165, color: "#2563EB" },
    { range: "$120K+", count: 70, color: "#1E40AF" },
  ];

  const attendanceCompliance = [
    { month: "Jan", rate: 94.5 },
    { month: "Feb", rate: 95.2 },
    { month: "Mar", rate: 93.8 },
    { month: "Apr", rate: 96.1 },
    { month: "May", rate: 95.7 },
    { month: "Jun", rate: 96.3 },
  ];

  const locationBreakdown = [
    { location: "New York HQ", employees: 425, color: "#7C3AED" },
    { location: "San Francisco", employees: 285, color: "#6366F1" },
    { location: "Austin", employees: 165, color: "#3B82F6" },
    { location: "Remote", employees: 70, color: "#10B981" },
  ];

  return (
    <AdminLayout title="Workforce Analytics">
      <div className="p-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-slate-600">Total Employees</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">945</div>
            <p className="text-xs text-emerald-600 mt-1">+17 from last month</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm text-slate-600">Departments</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">7</div>
            <p className="text-xs text-slate-500 mt-1">Across 4 locations</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-sm text-slate-600">Avg Performance</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">90.1%</div>
            <p className="text-xs text-emerald-600 mt-1">+2.3% this quarter</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-sm text-slate-600">Locations</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">4</div>
            <p className="text-xs text-slate-500 mt-1">3 offices + remote</p>
          </div>
        </div>

        {/* Headcount Growth */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Headcount Growth Over Time</h3>
              <p className="text-sm text-slate-600 mt-1">Total employee count by month</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-4 py-2 rounded-lg border border-slate-200 text-sm">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Sales</option>
                <option>Marketing</option>
              </select>
              <select className="px-4 py-2 rounded-lg border border-slate-200 text-sm">
                <option>2026</option>
                <option>2025</option>
              </select>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={headcountGrowth}>
              <defs>
                <linearGradient id="headcountGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
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
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 6 }}
                fill="url(#headcountGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance & Salary Distribution */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Department Performance Comparison</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" stroke="#64748B" />
                <YAxis dataKey="dept" type="category" stroke="#64748B" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="performance" fill="#7C3AED" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Salary Distribution</h3>
            
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={salaryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {salaryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {salaryDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-slate-700">{item.range}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Compliance & Location Breakdown */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Attendance Compliance %</h3>
            
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceCompliance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" domain={[90, 100]} />
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
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Employee Distribution by Location</h3>
            
            <div className="space-y-4">
              {locationBreakdown.map((loc, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{loc.location}</span>
                    <span className="text-sm font-semibold text-slate-900">{loc.employees}</span>
                  </div>
                  <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                    <div 
                      className="h-full rounded-lg transition-all"
                      style={{ 
                        width: `${(loc.employees / 945) * 100}%`,
                        backgroundColor: loc.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>45%</strong> of workforce is based in New York HQ
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Filters Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Department</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Operations</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Location</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white">
                <option>All Locations</option>
                <option>New York HQ</option>
                <option>San Francisco</option>
                <option>Austin</option>
                <option>Remote</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Date Range</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>Last 24 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
