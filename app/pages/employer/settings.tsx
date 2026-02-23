import { useEffect, useState } from "react";
import { EmployerLayout } from "../../components/employer-layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { EmployerSettings, getEmployerSettings, updateEmployerSettings } from "../../lib/employer-api";

const defaultSettings: EmployerSettings = {
  emailNotifications: true,
  smsNotifications: false,
  weeklyDigest: true,
  interviewReminders: true,
  timezone: "UTC",
};

export function EmployerSettingsPage() {
  const [settings, setSettings] = useState<EmployerSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEmployerSettings();
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
      const data = await updateEmployerSettings(settings);
      setSettings(data.settings);
    } finally {
      setSaving(false);
    }
  }

  return (
    <EmployerLayout title="Settings">
      <div className="p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Employer Settings</h2>
            <p className="text-sm text-slate-600 mt-1">Manage notification preferences and recruiter workflow defaults.</p>
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
                  label="SMS Notifications"
                  checked={settings.smsNotifications}
                  onChange={(value) => setSettings((prev) => ({ ...prev, smsNotifications: value }))}
                />
                <SettingToggle
                  label="Weekly Digest"
                  checked={settings.weeklyDigest}
                  onChange={(value) => setSettings((prev) => ({ ...prev, weeklyDigest: value }))}
                />
                <SettingToggle
                  label="Interview Reminders"
                  checked={settings.interviewReminders}
                  onChange={(value) => setSettings((prev) => ({ ...prev, interviewReminders: value }))}
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
    </EmployerLayout>
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
