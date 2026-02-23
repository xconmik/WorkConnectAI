export interface EmployeeDashboardData {
  welcomeTitle: string;
  performance: {
    score: number;
    monthDelta: string;
    ranking: string;
  };
  stats: {
    attendance: number;
    leaveBalance: number;
    goalsCompleted: string;
    pendingTasks: number;
  };
  careerSuggestions: Array<{
    title: string;
    details: string;
    action: string;
    theme: "purple" | "blue";
  }>;
  performanceTrend: Array<{ month: string; score: number }>;
  upcomingLeaves: Array<{ date: string; type: string; status: string }>;
  recentPayslips: Array<{ month: string; amount: string; status: string }>;
  skills: Array<{ name: string; value: number; highlight: boolean }>;
}

export interface EmployeeNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface EmployeeSettings {
  emailNotifications: boolean;
  weeklyCareerInsights: boolean;
  leaveAlerts: boolean;
  payslipAlerts: boolean;
  timezone: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function getEmployeeDashboard() {
  const response = await fetch(`${API_BASE}/api/employee/dashboard`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to load employee dashboard");
  }

  return data as EmployeeDashboardData;
}

export async function getEmployeeNotifications() {
  const response = await fetch(`${API_BASE}/api/employee/notifications`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to load notifications");
  }

  return data as { notifications: EmployeeNotification[]; unreadCount: number };
}

export async function markEmployeeNotificationsRead() {
  const response = await fetch(`${API_BASE}/api/employee/notifications`, {
    method: "PATCH",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to update notifications");
  }

  return data as { notifications: EmployeeNotification[]; unreadCount: number };
}

export async function getEmployeeSettings() {
  const response = await fetch(`${API_BASE}/api/employee/settings`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to load employee settings");
  }

  return data as { settings: EmployeeSettings };
}

export async function updateEmployeeSettings(settings: EmployeeSettings) {
  const response = await fetch(`${API_BASE}/api/employee/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to update employee settings");
  }

  return data as { settings: EmployeeSettings };
}
