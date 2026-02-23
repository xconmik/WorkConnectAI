import { getStore } from "../_lib/store.js";
import { sendJson } from "../_lib/response.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const store = getStore();
  const openJobs = store.jobs.filter((job) => job.status === "Open");
  const applicants = store.applications;
  const interviews = applicants.filter((app) => app.status === "Interview" || app.status === "Final Review");

  const aiMatchAverage = applicants.length
    ? Math.round(applicants.reduce((sum, app) => sum + app.aiMatchScore, 0) / applicants.length)
    : 0;

  const hiredByDept = new Map<string, { hired: number; total: number }>();
  applicants.forEach((app) => {
    const job = store.jobs.find((item) => item.id === app.jobId);
    const department = job?.department ?? "Unknown";
    const current = hiredByDept.get(department) ?? { hired: 0, total: 0 };
    current.total += 1;
    if (app.status === "Hired") current.hired += 1;
    hiredByDept.set(department, current);
  });

  const hiringSuccessRate = Array.from(hiredByDept.entries()).map(([dept, value]) => ({
    dept,
    rate: value.total ? Math.round((value.hired / value.total) * 100) : 0,
  }));

  const pipelineCounts = {
    "New Applicants": applicants.filter((item) => item.status === "New").length,
    Screening: applicants.filter((item) => item.status === "Screening").length,
    Interview: applicants.filter((item) => item.status === "Interview").length,
    "Final Review": applicants.filter((item) => item.status === "Final Review").length,
    Hired: applicants.filter((item) => item.status === "Hired").length,
  };

  return sendJson(res, 200, {
    summary: {
      totalOpenPositions: openJobs.length,
      totalApplicants: applicants.length,
      interviewsScheduled: interviews.length,
      aiMatchAverage,
    },
    charts: {
      timeToHire: [
        { month: "Jan", days: 32 },
        { month: "Feb", days: 29 },
        { month: "Mar", days: 27 },
        { month: "Apr", days: 24 },
        { month: "May", days: 22 },
      ],
      costPerHire: [
        { month: "Jan", value: 6800 },
        { month: "Feb", value: 6400 },
        { month: "Mar", value: 6100 },
        { month: "Apr", value: 5900 },
        { month: "May", value: 5600 },
      ],
      sourceOfApplicants: [
        { name: "LinkedIn", value: 38 },
        { name: "Referrals", value: 26 },
        { name: "Company Site", value: 22 },
        { name: "Agencies", value: 14 },
      ],
      hiringSuccessRate: hiringSuccessRate.length
        ? hiringSuccessRate
        : [
            { dept: "Engineering", rate: 74 },
            { dept: "Marketing", rate: 68 },
            { dept: "Sales", rate: 71 },
            { dept: "Finance", rate: 79 },
          ],
      departmentHiringTrends: [
        { dept: "Engineering", value: 68 },
        { dept: "Marketing", value: 72 },
        { dept: "Sales", value: 76 },
        { dept: "Finance", value: 80 },
        { dept: "Operations", value: 84 },
      ],
    },
    pipelineCounts,
    aiInsight: "Marketing department hiring efficiency improved by 14% this quarter.",
  });
}
