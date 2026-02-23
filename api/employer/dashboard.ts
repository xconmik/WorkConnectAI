import { sendJson } from "../_lib/response.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  return sendJson(res, 200, {
    metrics: {
      teamSize: 24,
      teamSizeDelta: "+2 this month",
      teamPerformance: 89,
      attendanceRate: 96,
      pendingLeaves: 3,
    },
    recommendations: [
      "Team productivity increased by 8% this week. Consider recognizing top performers.",
      "David Wilson has upcoming leave scheduled. Plan task redistribution.",
      "Optimal time for quarterly review meetings: Next week (low project pressure).",
    ],
    charts: {
      productivity: [
        { day: "Mon", score: 85 },
        { day: "Tue", score: 88 },
        { day: "Wed", score: 92 },
        { day: "Thu", score: 89 },
        { day: "Fri", score: 87 },
      ],
      attendance: [
        { week: "W1", rate: 95 },
        { week: "W2", rate: 96 },
        { week: "W3", rate: 94 },
        { week: "W4", rate: 97 },
      ],
    },
    teamMembers: [
      { name: "Sarah Johnson", status: "present", performance: 94 },
      { name: "Michael Chen", status: "present", performance: 88 },
      { name: "Emily Rodriguez", status: "remote", performance: 92 },
      { name: "David Wilson", status: "leave", performance: 85 },
      { name: "Lisa Anderson", status: "present", performance: 90 },
    ],
    payroll: {
      currentMonth: "$96,500",
      overtimeHours: "145h",
      budgetStatus: "92%",
    },
  });
}
