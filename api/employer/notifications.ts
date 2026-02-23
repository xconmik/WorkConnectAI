import { sendJson } from "../_lib/response";
import { getEmployerStore } from "../_lib/employer-store";

export default function handler(req: any, res: any) {
  const store = getEmployerStore();

  if (req.method === "GET") {
    return sendJson(res, 200, {
      notifications: store.notifications,
      unreadCount: store.notifications.filter((item) => !item.read).length,
    });
  }

  if (req.method === "PATCH") {
    store.notifications = store.notifications.map((item) => ({ ...item, read: true }));
    return sendJson(res, 200, {
      notifications: store.notifications,
      unreadCount: 0,
    });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}
