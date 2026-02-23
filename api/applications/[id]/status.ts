import { getStore } from "../../_lib/store";
import { parseBody, sendJson } from "../../_lib/response";

const validStatuses = ["New", "Screening", "Interview", "Final Review", "Hired", "Rejected"];

export default async function handler(req: any, res: any) {
  if (req.method !== "PATCH") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const body = await parseBody(req);
  const id = String(req.query?.id ?? "");
  const nextStatus = String(body?.status ?? "");

  if (!validStatuses.includes(nextStatus)) {
    return sendJson(res, 400, { error: "Invalid status" });
  }

  const store = getStore();
  const application = store.applications.find((item) => item.id === id);

  if (!application) {
    return sendJson(res, 404, { error: "Application not found" });
  }

  application.status = nextStatus as any;
  return sendJson(res, 200, { application });
}
