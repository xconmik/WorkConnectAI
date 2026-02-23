export interface EmployerDashboardData {
  metrics: {
    teamSize: number;
    teamSizeDelta: string;
    teamPerformance: number;
    attendanceRate: number;
    pendingLeaves: number;
  };
  recommendations: string[];
  charts: {
    productivity: Array<{ day: string; score: number }>;
    attendance: Array<{ week: string; rate: number }>;
  };
  teamMembers: Array<{ name: string; status: string; performance: number }>;
  payroll: {
    currentMonth: string;
    overtimeHours: string;
    budgetStatus: string;
  };
}

export interface EmployerNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface EmployerSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  weeklyDigest: boolean;
  interviewReminders: boolean;
  timezone: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function getEmployerDashboard() {
  const response = await fetch(`${API_BASE}/api/employer/dashboard`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to load employer dashboard");
  }

  return data as EmployerDashboardData;
}

export async function getEmployerNotifications() {
  const response = await fetch(`${API_BASE}/api/employer/notifications`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to load notifications");
  }

  return data as { notifications: EmployerNotification[]; unreadCount: number };
}

export async function markEmployerNotificationsRead() {
  const response = await fetch(`${API_BASE}/api/employer/notifications`, {
    method: "PATCH",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to update notifications");
  }

  return data as { notifications: EmployerNotification[]; unreadCount: number };
}

export async function getEmployerSettings() {
  const response = await fetch(`${API_BASE}/api/employer/settings`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to load settings");
  }

  return data as { settings: EmployerSettings };
}

export async function updateEmployerSettings(settings: EmployerSettings) {
  const response = await fetch(`${API_BASE}/api/employer/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Unable to update settings");
  }

  return data as { settings: EmployerSettings };
}
