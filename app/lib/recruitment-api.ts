export type JobStatus = "Open" | "Closed" | "Draft";
export type ApplicationStatus = "New" | "Screening" | "Interview" | "Final Review" | "Hired" | "Rejected";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract";
  salaryRange: string;
  experienceRequired: string;
  skills: string[];
  description: string;
  applicationDeadline: string;
  status: JobStatus;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  email: string;
  experience: string;
  coverLetter: string;
  resumeFileName?: string;
  status: ApplicationStatus;
  aiMatchScore: number;
  skillMatch: number;
  cultureFitScore: number;
  retentionProbability: number;
  interviewRecommendation: number;
  strengthsSummary: string;
  riskFlags: string[];
  photoUrl: string;
  createdAt: string;
}

export interface RecruitmentAnalytics {
  summary: {
    totalOpenPositions: number;
    totalApplicants: number;
    interviewsScheduled: number;
    aiMatchAverage: number;
  };
  charts: {
    timeToHire: Array<{ month: string; days: number }>;
    costPerHire: Array<{ month: string; value: number }>;
    sourceOfApplicants: Array<{ name: string; value: number }>;
    hiringSuccessRate: Array<{ dept: string; rate: number }>;
    departmentHiringTrends: Array<{ dept: string; value: number }>;
  };
  pipelineCounts: Record<string, number>;
  aiInsight: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error ?? "Request failed");
  }

  return data as T;
}

export async function getJobs(filters?: {
  status?: string;
  department?: string;
  location?: string;
  employmentType?: string;
  q?: string;
}) {
  const query = new URLSearchParams();
  if (filters?.status) query.set("status", filters.status);
  if (filters?.department) query.set("department", filters.department);
  if (filters?.location) query.set("location", filters.location);
  if (filters?.employmentType) query.set("employmentType", filters.employmentType);
  if (filters?.q) query.set("q", filters.q);

  const suffix = query.toString() ? `?${query.toString()}` : "";
  const result = await request<{ jobs: Job[] }>(`/api/jobs${suffix}`);
  return result.jobs;
}

export async function createJob(payload: Omit<Job, "id" | "createdAt">) {
  const result = await request<{ job: Job }>("/api/jobs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result.job;
}

export async function getApplications(params?: { status?: string; q?: string }) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.q) query.set("q", params.q);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  const result = await request<{ applications: Application[] }>(`/api/applications${suffix}`);
  return result.applications;
}

export async function createApplication(payload: {
  jobId: string;
  candidateName: string;
  email: string;
  experience: string;
  coverLetter: string;
  resumeFileName?: string;
}) {
  const result = await request<{ application: Application }>("/api/applications", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result.application;
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const result = await request<{ application: Application }>(`/api/applications/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return result.application;
}

export async function getRecruitmentAnalytics() {
  return request<RecruitmentAnalytics>("/api/analytics/recruitment");
}
