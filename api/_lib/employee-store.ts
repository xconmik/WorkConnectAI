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

interface EmployeeStore {
  notifications: EmployeeNotification[];
  settings: EmployeeSettings;
}

declare global {
  var __workConnectEmployeeStore: EmployeeStore | undefined;
}

const seededNotifications: EmployeeNotification[] = [
  {
    id: "emp-notif-1",
    title: "Career suggestion updated",
    message: "New AI suggestion available: Leadership Training Program.",
    time: "10m ago",
    read: false,
  },
  {
    id: "emp-notif-2",
    title: "Leave request status",
    message: "Your vacation leave request for Jul 15-19 has been approved.",
    time: "2h ago",
    read: false,
  },
  {
    id: "emp-notif-3",
    title: "Payslip ready",
    message: "June 2026 payslip is available for download.",
    time: "1d ago",
    read: true,
  },
];

const seededSettings: EmployeeSettings = {
  emailNotifications: true,
  weeklyCareerInsights: true,
  leaveAlerts: true,
  payslipAlerts: true,
  timezone: "UTC",
};

export function getEmployeeStore() {
  if (!globalThis.__workConnectEmployeeStore) {
    globalThis.__workConnectEmployeeStore = {
      notifications: [...seededNotifications],
      settings: { ...seededSettings },
    };
  }

  return globalThis.__workConnectEmployeeStore;
}
