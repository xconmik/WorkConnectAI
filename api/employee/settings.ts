import { parseBody, sendJson } from "../_lib/response";
import { getEmployeeStore } from "../_lib/employee-store";

export default async function handler(req: any, res: any) {
  const store = getEmployeeStore();

  if (req.method === "GET") {
    return sendJson(res, 200, { settings: store.settings });
  }

  if (req.method === "PUT") {
    const body = await parseBody(req);
    store.settings = {
      emailNotifications: Boolean(body?.emailNotifications),
      weeklyCareerInsights: Boolean(body?.weeklyCareerInsights),
      leaveAlerts: Boolean(body?.leaveAlerts),
      payslipAlerts: Boolean(body?.payslipAlerts),
      timezone: String(body?.timezone || "UTC"),
    };

    return sendJson(res, 200, { settings: store.settings });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}
