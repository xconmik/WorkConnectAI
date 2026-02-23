import { getStore } from "../_lib/store.js";
import { sendJson } from "../_lib/response.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const id = String(req.query?.id ?? "");
  const store = getStore();
  const job = store.jobs.find((item) => item.id === id);

  if (!job) {
    return sendJson(res, 404, { error: "Job not found" });
  }

  return sendJson(res, 200, { job });
}
