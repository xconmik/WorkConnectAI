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

interface EmployerStore {
  notifications: EmployerNotification[];
  settings: EmployerSettings;
}

declare global {
  var __workConnectEmployerStore: EmployerStore | undefined;
}

const seededNotifications: EmployerNotification[] = [
  {
    id: "notif-1",
    title: "New applicant received",
    message: "Aisha Rahman applied for Senior Frontend Engineer.",
    time: "5m ago",
    read: false,
  },
  {
    id: "notif-2",
    title: "Interview reminder",
    message: "Interview with Maya Patel is scheduled for tomorrow at 10:00 AM.",
    time: "1h ago",
    read: false,
  },
  {
    id: "notif-3",
    title: "Pipeline update",
    message: "Daniel Kim moved to Screening stage.",
    time: "3h ago",
    read: true,
  },
];

const seededSettings: EmployerSettings = {
  emailNotifications: true,
  smsNotifications: false,
  weeklyDigest: true,
  interviewReminders: true,
  timezone: "UTC",
};

export function getEmployerStore() {
  if (!globalThis.__workConnectEmployerStore) {
    globalThis.__workConnectEmployerStore = {
      notifications: [...seededNotifications],
      settings: { ...seededSettings },
    };
  }

  return globalThis.__workConnectEmployerStore;
}
