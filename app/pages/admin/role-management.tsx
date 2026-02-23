import { AdminLayout } from "../../components/admin-layout";
import { Shield, Users, Lock, Eye, Activity, CheckCircle, XCircle } from "lucide-react";
import { Switch } from "../../components/ui/switch";

export function RoleManagement() {
  const roles = [
    {
      name: "Super Admin",
      users: 3,
      permissions: { all: true },
      color: "purple"
    },
    {
      name: "Admin",
      users: 8,
      permissions: { dashboard: true, analytics: true, payroll: true, recruitment: true, reports: true, settings: false },
      color: "blue"
    },
    {
      name: "Manager",
      users: 24,
      permissions: { dashboard: true, analytics: true, payroll: false, recruitment: true, reports: true, settings: false },
      color: "emerald"
    },
    {
      name: "HR Specialist",
      users: 12,
      permissions: { dashboard: true, analytics: false, payroll: true, recruitment: true, reports: true, settings: false },
      color: "orange"
    },
    {
      name: "Employee",
      users: 898,
      permissions: { dashboard: true, analytics: false, payroll: false, recruitment: false, reports: false, settings: false },
      color: "slate"
    }
  ];

  const auditLogs = [
    { time: "2 min ago", user: "John Smith", action: "Modified Manager role permissions", ip: "192.168.1.45", status: "success" },
    { time: "15 min ago", user: "Sarah Johnson", action: "Created new user: Mike Chen", ip: "192.168.1.78", status: "success" },
    { time: "1 hour ago", user: "Admin System", action: "Failed login attempt detected", ip: "203.45.67.89", status: "warning" },
    { time: "2 hours ago", user: "Lisa Anderson", action: "Deleted user: Robert Wilson", ip: "192.168.1.92", status: "success" },
    { time: "3 hours ago", user: "Unknown", action: "Multiple failed login attempts", ip: "185.23.45.12", status: "blocked" },
  ];

  const permissionModules = [
    { name: "Dashboard", description: "View main dashboard and overview" },
    { name: "Workforce Analytics", description: "Access workforce data and analytics" },
    { name: "Predictive Insights", description: "View AI predictions and trends" },
    { name: "Payroll Intelligence", description: "Manage payroll and compensation" },
    { name: "Recruitment AI", description: "Access recruitment and hiring tools" },
    { name: "Risk Detection", description: "View risk alerts and reports" },
    { name: "Reports", description: "Generate and download reports" },
    { name: "System Settings", description: "Modify system configurations" },
    { name: "User Management", description: "Create and manage users" },
    { name: "Audit Logs", description: "View security and activity logs" }
  ];

  return (
    <AdminLayout title="Role & Access Management">
      <div className="p-8 space-y-6">
        {/* Security Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Enterprise Access Control</h2>
                <p className="text-slate-300 max-w-2xl">
                  Manage user roles, permissions, and monitor security activity across your organization.
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Active Users</div>
              <div className="text-3xl font-bold text-white">945</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm text-slate-600">Total Roles</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">5</div>
            <p className="text-xs text-slate-500 mt-1">Custom role system</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-slate-600">Permission Modules</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">10</div>
            <p className="text-xs text-slate-500 mt-1">Granular access control</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-sm text-slate-600">Active Sessions</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">287</div>
            <p className="text-xs text-emerald-600 mt-1">Real-time monitoring</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-sm text-slate-600">Security Alerts</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">3</div>
            <p className="text-xs text-red-600 mt-1">Last 24 hours</p>
          </div>
        </div>

        {/* Role Cards */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Custom Roles</h3>
              <p className="text-sm text-slate-600 mt-1">Define and manage user access levels</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              + Create New Role
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {roles.map((role, index) => {
              const colorClasses = {
                purple: "from-purple-500 to-purple-600",
                blue: "from-blue-500 to-blue-600",
                emerald: "from-emerald-500 to-emerald-600",
                orange: "from-orange-500 to-orange-600",
                slate: "from-slate-500 to-slate-600"
              }[role.color];

              return (
                <div key={index} className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses} flex items-center justify-center`}>
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-slate-900">{role.name}</h4>
                          <span className="px-3 py-1 bg-slate-200 rounded-full text-xs font-semibold text-slate-700">
                            {role.users} {role.users === 1 ? 'user' : 'users'}
                          </span>
                        </div>
                        
                        {role.permissions.all ? (
                          <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="font-medium">Full system access</span>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(role.permissions).map(([key, value]) => (
                              <span 
                                key={key}
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  value 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {value ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <XCircle className="w-3 h-3 inline mr-1" />}
                                {key}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                        Manage Users
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Permission Toggles */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Permission Modules</h3>
            <p className="text-sm text-slate-600 mt-1">Configure access to specific features and data</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {permissionModules.map((module, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-1">{module.name}</h4>
                    <p className="text-sm text-slate-600">{module.description}</p>
                  </div>
                  <Switch />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Logs Timeline */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Security Audit Logs</h3>
              <p className="text-sm text-slate-600 mt-1">Real-time activity monitoring and tracking</p>
            </div>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
              Download Logs
            </button>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log, index) => {
              const statusConfig = {
                success: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
                warning: { icon: Eye, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
                blocked: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
              }[log.status];

              const Icon = statusConfig.icon;

              return (
                <div key={index} className={`p-4 rounded-xl border ${statusConfig.border} ${statusConfig.bg}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className={`w-5 h-5 ${statusConfig.color} mt-0.5`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-slate-500">{log.time}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-sm font-semibold text-slate-900">{log.user}</span>
                        </div>
                        <p className="text-sm text-slate-700 mb-1">{log.action}</p>
                        <p className="text-xs text-slate-500">IP: {log.ip}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusConfig.color}`}>
                      {log.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Load More Activity →
            </button>
          </div>
        </div>

        {/* Activity Monitoring Chart */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Best Practices</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 mb-1">Enforce 2FA</div>
                <div className="text-sm text-slate-600">Require two-factor authentication for all admin users</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 mb-1">Monitor Sessions</div>
                <div className="text-sm text-slate-600">Track active sessions and suspicious login patterns</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 mb-1">Regular Audits</div>
                <div className="text-sm text-slate-600">Review permissions and access logs quarterly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
