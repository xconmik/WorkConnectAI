import { createApplication, getStore } from "../_lib/store";
import { parseBody, sendJson } from "../_lib/response";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const store = getStore();
    const { status, q } = req.query ?? {};

    const applications = store.applications.filter((item) => {
      if (status && item.status !== status) return false;
      if (q) {
        const term = String(q).toLowerCase();
        const inText =
          item.candidateName.toLowerCase().includes(term) ||
          item.jobTitle.toLowerCase().includes(term) ||
          item.email.toLowerCase().includes(term);
        if (!inText) return false;
      }
      return true;
    });

    return sendJson(res, 200, { applications });
  }

  if (req.method === "POST") {
    const body = await parseBody(req);
    const required = ["jobId", "candidateName", "email", "experience", "coverLetter"];
    const missing = required.filter((field) => !body?.[field]);

    if (missing.length) {
      return sendJson(res, 400, { error: `Missing required fields: ${missing.join(", ")}` });
    }

    try {
      const application = createApplication({
        jobId: String(body.jobId),
        candidateName: String(body.candidateName),
        email: String(body.email),
        experience: String(body.experience),
        coverLetter: String(body.coverLetter),
        resumeFileName: body.resumeFileName ? String(body.resumeFileName) : undefined,
      });

      return sendJson(res, 201, { application });
    } catch (error: any) {
      return sendJson(res, 404, { error: error?.message ?? "Unable to create application" });
    }
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}
