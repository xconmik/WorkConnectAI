import { AdminLayout } from "../../components/admin-layout";
import { AlertTriangle, AlertCircle, CheckCircle, Shield, Clock, DollarSign, Users } from "lucide-react";

export function RiskDetection() {
  const criticalRisks = [
    {
      employee: "Marcus Johnson",
      dept: "Sales",
      risk: "High Resignation Probability",
      probability: 87,
      factors: ["Low engagement score", "3 declined projects", "No promotion in 2 years"],
      severity: "critical"
    },
    {
      employee: "Jennifer Lee",
      dept: "Engineering",
      risk: "Chronic Late Attendance",
      probability: 78,
      factors: ["Late 12 times this month", "No approved flex schedule", "Pattern detected"],
      severity: "high"
    },
    {
      employee: "Robert Martinez",
      dept: "Finance",
      risk: "Payroll Inconsistency Detected",
      probability: 92,
      factors: ["Overtime hours mismatch", "Missing timesheet entries", "Duplicate payments"],
      severity: "critical"
    }
  ];

  const departmentRisks = [
    { dept: "Sales", burnout: 78, turnover: 65, compliance: 45, overall: "critical" },
    { dept: "Engineering", burnout: 45, turnover: 32, compliance: 88, overall: "warning" },
    { dept: "Marketing", burnout: 28, turnover: 25, compliance: 92, overall: "stable" },
    { dept: "Operations", burnout: 55, turnover: 48, compliance: 78, overall: "warning" },
    { dept: "Finance", burnout: 32, turnover: 18, compliance: 95, overall: "stable" },
    { dept: "Customer Success", burnout: 62, turnover: 58, compliance: 82, overall: "warning" }
  ];

  const riskAlerts = [
    {
      type: "Resignation Risk",
      count: 23,
      icon: Users,
      color: "red",
      description: "Employees with 70%+ churn probability"
    },
    {
      type: "Attendance Issues",
      count: 18,
      icon: Clock,
      color: "orange",
      description: "Chronic lateness or absence patterns"
    },
    {
      type: "Payroll Anomalies",
      count: 7,
      icon: DollarSign,
      color: "yellow",
      description: "Financial discrepancies detected"
    },
    {
      type: "Compliance Risks",
      count: 12,
      icon: Shield,
      color: "purple",
      description: "Policy violations or audit flags"
    }
  ];

  const recentIncidents = [
    { time: "2 hours ago", severity: "critical", message: "Sarah Kim - Resignation risk increased to 91%", dept: "Sales" },
    { time: "5 hours ago", severity: "high", message: "Operations dept - Burnout risk threshold exceeded", dept: "Operations" },
    { time: "1 day ago", severity: "medium", message: "Michael Brown - 5 consecutive late arrivals", dept: "Engineering" },
    { time: "1 day ago", severity: "critical", message: "Payroll processing error - $12,450 discrepancy", dept: "Finance" },
    { time: "2 days ago", severity: "high", message: "Customer Success - Overtime limit exceeded by 28%", dept: "Customer Success" }
  ];

  return (
    <AdminLayout title="Risk Detection">
      <div className="p-8 space-y-6">
        {/* Alert Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">AI Risk Detection System</h2>
                <p className="text-red-100 max-w-2xl">
                  Real-time monitoring and predictive analysis to identify workforce risks before they escalate.
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-100">Active Alerts</div>
              <div className="text-3xl font-bold text-white">60</div>
            </div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="grid grid-cols-4 gap-6">
          {riskAlerts.map((alert, index) => {
            const Icon = alert.icon;
            const colorClasses = {
              red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-200" },
              orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
              yellow: { bg: "bg-yellow-100", text: "text-yellow-600", border: "border-yellow-200" },
              purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" }
            }[alert.color];

            return (
              <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 ${colorClasses.border} shadow-lg`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${colorClasses.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colorClasses.text}`} />
                  </div>
                  <div className="text-sm text-slate-600">{alert.type}</div>
                </div>
                <div className={`text-3xl font-bold ${colorClasses.text}`}>{alert.count}</div>
                <p className="text-xs text-slate-600 mt-1">{alert.description}</p>
              </div>
            );
          })}
        </div>

        {/* Critical Employee Risks */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Critical Employee Risks</h3>
              <p className="text-sm text-slate-600 mt-1">Immediate attention required</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
              Take Action
            </button>
          </div>

          <div className="space-y-4">
            {criticalRisks.map((risk, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl border-2 ${
                  risk.severity === 'critical' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        risk.severity === 'critical' 
                          ? 'bg-red-200 text-red-900' 
                          : 'bg-orange-200 text-orange-900'
                      }`}>
                        {risk.severity}
                      </div>
                      <span className="font-bold text-slate-900 text-lg">{risk.employee}</span>
                      <span className="text-sm text-slate-600">• {risk.dept}</span>
                    </div>
                    
                    <p className="text-base font-semibold text-slate-900 mb-3">{risk.risk}</p>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-700">Risk Probability</span>
                        <span className={`text-sm font-bold ${
                          risk.severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                        }`}>{risk.probability}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            risk.severity === 'critical' 
                              ? 'bg-gradient-to-r from-red-500 to-red-600' 
                              : 'bg-gradient-to-r from-orange-400 to-orange-500'
                          }`}
                          style={{ width: `${risk.probability}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-semibold text-slate-700 mb-2">Contributing Factors:</p>
                      <div className="flex flex-wrap gap-2">
                        {risk.factors.map((factor, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white rounded-lg text-xs text-slate-700 border border-slate-200">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <button className="px-5 py-2 bg-white border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium whitespace-nowrap">
                      View Details
                    </button>
                    <button className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium whitespace-nowrap">
                      Intervene
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Burnout Risk Heatmap */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Department Risk Assessment</h3>
          
          <div className="space-y-4">
            {departmentRisks.map((dept, index) => {
              const maxRisk = Math.max(dept.burnout, dept.turnover);
              const statusConfig = {
                critical: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-500 text-white" },
                warning: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-500 text-white" },
                stable: { bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-500 text-white" }
              }[dept.overall];

              return (
                <div key={index} className={`p-6 rounded-xl border-2 ${statusConfig.border} ${statusConfig.bg}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-slate-900">{dept.dept}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusConfig.badge}`}>
                        {dept.overall.toUpperCase()}
                      </span>
                    </div>
                    {dept.overall === 'critical' && (
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-700">Burnout Risk</span>
                        <span className={`text-sm font-bold ${
                          dept.burnout > 60 ? 'text-red-600' : dept.burnout > 40 ? 'text-orange-600' : 'text-emerald-600'
                        }`}>{dept.burnout}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            dept.burnout > 60 ? 'bg-red-500' : dept.burnout > 40 ? 'bg-orange-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${dept.burnout}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-700">Turnover Risk</span>
                        <span className={`text-sm font-bold ${
                          dept.turnover > 60 ? 'text-red-600' : dept.turnover > 40 ? 'text-orange-600' : 'text-emerald-600'
                        }`}>{dept.turnover}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            dept.turnover > 60 ? 'bg-red-500' : dept.turnover > 40 ? 'bg-orange-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${dept.turnover}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-700">Compliance Score</span>
                        <span className={`text-sm font-bold ${
                          dept.compliance > 90 ? 'text-emerald-600' : dept.compliance > 70 ? 'text-orange-600' : 'text-red-600'
                        }`}>{dept.compliance}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            dept.compliance > 90 ? 'bg-emerald-500' : dept.compliance > 70 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${dept.compliance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Incident Timeline */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Risk Alerts Timeline</h3>
          
          <div className="space-y-4">
            {recentIncidents.map((incident, index) => {
              const severityConfig = {
                critical: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" },
                high: { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", dot: "bg-orange-500" },
                medium: { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", dot: "bg-yellow-500" }
              }[incident.severity];
              
              const Icon = severityConfig.icon;

              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${severityConfig.dot}`}></div>
                    {index < recentIncidents.length - 1 && (
                      <div className="w-0.5 h-12 bg-slate-200 my-1"></div>
                    )}
                  </div>
                  
                  <div className={`flex-1 p-4 rounded-xl border ${severityConfig.border} ${severityConfig.bg}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`w-4 h-4 ${severityConfig.color}`} />
                          <span className="text-xs text-slate-500">{incident.time}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${severityConfig.color} uppercase`}>
                            {incident.severity}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 mb-1">{incident.message}</p>
                        <p className="text-xs text-slate-600">Department: {incident.dept}</p>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Review →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Badge Legend */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Risk Level Guide</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Critical</div>
                <div className="text-xs text-slate-600">Immediate action required</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Warning</div>
                <div className="text-xs text-slate-600">Monitor closely</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Stable</div>
                <div className="text-xs text-slate-600">Normal operations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
