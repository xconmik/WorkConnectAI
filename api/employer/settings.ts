import { parseBody, sendJson } from "../_lib/response.js";
import { getEmployerStore } from "../_lib/employer-store.js";

export default async function handler(req: any, res: any) {
  const store = getEmployerStore();

  if (req.method === "GET") {
    return sendJson(res, 200, { settings: store.settings });
  }

  if (req.method === "PUT") {
    const body = await parseBody(req);
    store.settings = {
      emailNotifications: Boolean(body?.emailNotifications),
      smsNotifications: Boolean(body?.smsNotifications),
      weeklyDigest: Boolean(body?.weeklyDigest),
      interviewReminders: Boolean(body?.interviewReminders),
      timezone: String(body?.timezone || "UTC"),
    };

    return sendJson(res, 200, { settings: store.settings });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}
