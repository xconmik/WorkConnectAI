import { sendJson } from "../_lib/response.js";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  return sendJson(res, 200, {
    welcomeTitle: "Welcome Back, Alex!",
    performance: {
      score: 94,
      monthDelta: "+3 points this month",
      ranking: "Top 10% in Engineering",
    },
    stats: {
      attendance: 98,
      leaveBalance: 12,
      goalsCompleted: "8/10",
      pendingTasks: 5,
    },
    careerSuggestions: [
      {
        title: "Leadership Training Program",
        details: "Completing the Advanced Leadership course may increase your promotion probability by 12%.",
        action: "Enroll Now",
        theme: "purple",
      },
      {
        title: "Skill Development Opportunity",
        details: "AI recommends focusing on cloud architecture certification to align with upcoming projects.",
        action: "View Resources",
        theme: "blue",
      },
    ],
    performanceTrend: [
      { month: "Jan", score: 85 },
      { month: "Feb", score: 88 },
      { month: "Mar", score: 87 },
      { month: "Apr", score: 91 },
      { month: "May", score: 92 },
      { month: "Jun", score: 94 },
    ],
    upcomingLeaves: [
      { date: "Jul 15-19", type: "Vacation", status: "approved" },
      { date: "Aug 2", type: "Personal", status: "pending" },
    ],
    recentPayslips: [
      { month: "June 2026", amount: "$5,200", status: "paid" },
      { month: "May 2026", amount: "$5,200", status: "paid" },
      { month: "April 2026", amount: "$5,100", status: "paid" },
    ],
    skills: [
      { name: "Technical Skills", value: 92, highlight: false },
      { name: "Leadership", value: 78, highlight: true },
      { name: "Communication", value: 88, highlight: false },
      { name: "Problem Solving", value: 95, highlight: false },
    ],
  });
}
