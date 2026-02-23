type JobStatus = "Open" | "Closed" | "Draft";
type EmploymentType = "Full-time" | "Part-time" | "Contract";
type ApplicationStatus = "New" | "Screening" | "Interview" | "Final Review" | "Hired" | "Rejected";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
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

interface RecruitmentStore {
  jobs: Job[];
  applications: Application[];
}

declare global {
  var __workConnectRecruitmentStore: RecruitmentStore | undefined;
}

const photos = [
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
];

const now = new Date().toISOString();

const seededJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    employmentType: "Full-time",
    salaryRange: "$110,000 - $145,000",
    experienceRequired: "6+ years",
    skills: ["React", "TypeScript", "System Design"],
    description: "Lead frontend architecture and deliver enterprise-grade dashboard experiences.",
    applicationDeadline: "2026-04-10",
    status: "Open",
    createdAt: now,
  },
  {
    id: "job-2",
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York",
    employmentType: "Full-time",
    salaryRange: "$85,000 - $115,000",
    experienceRequired: "5+ years",
    skills: ["Campaign Management", "Content Strategy", "Analytics"],
    description: "Own growth campaigns and lead cross-channel performance strategy.",
    applicationDeadline: "2026-04-18",
    status: "Open",
    createdAt: now,
  },
  {
    id: "job-3",
    title: "Sales Operations Lead",
    department: "Sales",
    location: "London",
    employmentType: "Contract",
    salaryRange: "$70,000 - $95,000",
    experienceRequired: "4+ years",
    skills: ["Forecasting", "CRM", "RevOps"],
    description: "Drive sales process optimization and pipeline governance.",
    applicationDeadline: "2026-05-02",
    status: "Draft",
    createdAt: now,
  },
];

const seededApplications: Application[] = [
  createApplicationRecord({
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Frontend Engineer",
    candidateName: "Aisha Rahman",
    email: "aisha.rahman@example.com",
    experience: "7 years",
    coverLetter: "Built and scaled design systems for enterprise SaaS products.",
    status: "Interview",
  }),
  createApplicationRecord({
    id: "app-2",
    jobId: "job-2",
    jobTitle: "Marketing Manager",
    candidateName: "Daniel Kim",
    email: "daniel.kim@example.com",
    experience: "8 years",
    coverLetter: "Led full-funnel campaigns and delivered 22% growth in qualified leads.",
    status: "Screening",
  }),
  createApplicationRecord({
    id: "app-3",
    jobId: "job-1",
    jobTitle: "Senior Frontend Engineer",
    candidateName: "Maya Patel",
    email: "maya.patel@example.com",
    experience: "6 years",
    coverLetter: "Shipped high-performance React applications in regulated fintech environments.",
    status: "New",
  }),
];

function scoreFromSeed(seed: string, min: number, max: number) {
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return min + (hash % (max - min + 1));
}

function createApplicationRecord(input: {
  id?: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  email: string;
  experience: string;
  coverLetter: string;
  resumeFileName?: string;
  status?: ApplicationStatus;
}): Application {
  const seed = `${input.candidateName}-${input.jobTitle}`;
  const skillMatch = scoreFromSeed(seed, 70, 97);
  const cultureFitScore = scoreFromSeed(`${seed}-culture`, 68, 94);
  const retentionProbability = scoreFromSeed(`${seed}-retention`, 60, 92);
  const interviewRecommendation = scoreFromSeed(`${seed}-interview`, 65, 96);
  const aiMatchScore = Math.round((skillMatch + cultureFitScore + interviewRecommendation) / 3);

  return {
    id: input.id ?? randomId("app"),
    jobId: input.jobId,
    jobTitle: input.jobTitle,
    candidateName: input.candidateName,
    email: input.email,
    experience: input.experience,
    coverLetter: input.coverLetter,
    resumeFileName: input.resumeFileName,
    status: input.status ?? "New",
    aiMatchScore,
    skillMatch,
    cultureFitScore,
    retentionProbability,
    interviewRecommendation,
    strengthsSummary: `Candidate shows ${skillMatch}% skill alignment and strong leadership indicators.`,
    riskFlags: retentionProbability < 72 ? ["Retention risk moderate"] : ["Compensation alignment to validate"],
    photoUrl: photos[scoreFromSeed(seed, 0, photos.length - 1)],
    createdAt: new Date().toISOString(),
  };
}

function randomId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getStore() {
  if (!globalThis.__workConnectRecruitmentStore) {
    globalThis.__workConnectRecruitmentStore = {
      jobs: [...seededJobs],
      applications: [...seededApplications],
    };
  }

  return globalThis.__workConnectRecruitmentStore;
}

export function createJob(input: Omit<Job, "id" | "createdAt">) {
  const store = getStore();
  const job: Job = {
    ...input,
    id: randomId("job"),
    createdAt: new Date().toISOString(),
  };
  store.jobs.unshift(job);
  return job;
}

export function createApplication(input: {
  jobId: string;
  candidateName: string;
  email: string;
  experience: string;
  coverLetter: string;
  resumeFileName?: string;
}) {
  const store = getStore();
  const job = store.jobs.find((item) => item.id === input.jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  const application = createApplicationRecord({
    ...input,
    jobTitle: job.title,
  });

  store.applications.unshift(application);
  return application;
}
