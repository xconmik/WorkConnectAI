import { createJob, getStore } from "../_lib/store.js";
import { parseBody, sendJson } from "../_lib/response.js";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const store = getStore();
    const { status, department, location, employmentType, q } = req.query ?? {};

    const jobs = store.jobs.filter((job) => {
      if (status && job.status !== status) return false;
      if (department && job.department !== department) return false;
      if (location && job.location !== location) return false;
      if (employmentType && job.employmentType !== employmentType) return false;
      if (q) {
        const term = String(q).toLowerCase();
        const inText =
          job.title.toLowerCase().includes(term) ||
          job.department.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term) ||
          job.skills.join(" ").toLowerCase().includes(term);
        if (!inText) return false;
      }
      return true;
    });

    return sendJson(res, 200, { jobs });
  }

  if (req.method === "POST") {
    const body = await parseBody(req);
    const required = ["title", "department", "location", "employmentType", "salaryRange", "experienceRequired", "description", "applicationDeadline"];
    const missing = required.filter((field) => !body?.[field]);

    if (missing.length) {
      return sendJson(res, 400, { error: `Missing required fields: ${missing.join(", ")}` });
    }

    const job = createJob({
      title: String(body.title),
      department: String(body.department),
      location: String(body.location),
      employmentType: body.employmentType,
      salaryRange: String(body.salaryRange),
      experienceRequired: String(body.experienceRequired),
      skills: Array.isArray(body.skills) ? body.skills.map(String) : [],
      description: String(body.description),
      applicationDeadline: String(body.applicationDeadline),
      status: body.status === "Draft" ? "Draft" : body.status === "Closed" ? "Closed" : "Open",
    });

    return sendJson(res, 201, { job });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}
