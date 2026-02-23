import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Brain, Briefcase, LogOut, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { EmployeeSettings, getEmployeeSettings, updateEmployeeSettings } from "../../lib/employee-api";

const defaultSettings: EmployeeSettings = {
  emailNotifications: true,
  weeklyCareerInsights: true,
  leaveAlerts: true,
  payslipAlerts: true,
  timezone: "UTC",
};

export function EmployeeSettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [settings, setSettings] = useState<EmployeeSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEmployeeSettings();
        setSettings(data.settings);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function save() {
    setSaving(true);
    try {
      const data = await updateEmployeeSettings(settings);
      setSettings(data.settings);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
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

      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Employee Settings</h2>
            <p className="text-sm text-slate-600 mt-1">Manage alerts and personal preference defaults.</p>
          </div>

          {loading ? (
            <p className="text-sm text-slate-500">Loading settings...</p>
          ) : (
            <>
              <div className="space-y-3">
                <SettingToggle
                  label="Email Notifications"
                  checked={settings.emailNotifications}
                  onChange={(value) => setSettings((prev) => ({ ...prev, emailNotifications: value }))}
                />
                <SettingToggle
                  label="Weekly Career Insights"
                  checked={settings.weeklyCareerInsights}
                  onChange={(value) => setSettings((prev) => ({ ...prev, weeklyCareerInsights: value }))}
                />
                <SettingToggle
                  label="Leave Alerts"
                  checked={settings.leaveAlerts}
                  onChange={(value) => setSettings((prev) => ({ ...prev, leaveAlerts: value }))}
                />
                <SettingToggle
                  label="Payslip Alerts"
                  checked={settings.payslipAlerts}
                  onChange={(value) => setSettings((prev) => ({ ...prev, payslipAlerts: value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Timezone</label>
                <Input value={settings.timezone} onChange={(event) => setSettings((prev) => ({ ...prev, timezone: event.target.value }))} />
              </div>

              <Button onClick={save} disabled={saving} className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                Save Settings
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4" />
    </label>
  );
}
