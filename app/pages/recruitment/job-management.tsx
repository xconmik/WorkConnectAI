import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Brain,
  Briefcase,
  Calendar,
  CheckCircle2,
  Columns,
  FileText,
  Filter,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  UserCheck,
  ShieldAlert,
  Target,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { AdminLayout } from "../../components/admin-layout";
import { EmployerLayout } from "../../components/employer-layout";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Application,
  ApplicationStatus,
  Job,
  createApplication,
  createJob,
  getApplications,
  getJobs,
  getRecruitmentAnalytics,
  updateApplicationStatus,
} from "../../lib/recruitment-api";

const departments = ["Engineering", "Marketing", "Sales", "Finance", "Operations"];
const locations = ["Remote", "New York", "London", "Bangalore", "Toronto"];
const employmentTypes = ["Full-time", "Part-time", "Contract"];
const applicationStatuses: ApplicationStatus[] = ["New", "Screening", "Interview", "Final Review", "Hired", "Rejected"];

function JobPortalContent({ basePath }: { basePath: "/admin" | "/employer" }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [summary, setSummary] = useState({
    totalOpenPositions: 0,
    totalApplicants: 0,
    interviewsScheduled: 0,
    aiMatchAverage: 0,
  });
  const [loading, setLoading] = useState(true);

  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [jobsData, applicationsData, analytics] = await Promise.all([
          getJobs({
            department: department || undefined,
            status: status || undefined,
            location: location || undefined,
            employmentType: employmentType || undefined,
          }),
          getApplications(),
          getRecruitmentAnalytics(),
        ]);
        setJobs(jobsData);
        setApplications(applicationsData);
        setSummary(analytics.summary);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [department, status, location, employmentType]);

  const applicantsByJob = useMemo(() => {
    const map = new Map<string, number>();
    applications.forEach((item) => {
      map.set(item.jobId, (map.get(item.jobId) ?? 0) + 1);
    });
    return map;
  }, [applications]);

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Job Portal Dashboard</h2>
            <p className="text-sm text-slate-600">Manage openings, intake quality, and hiring velocity from one place.</p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
            onClick={() => navigate(`${basePath}/job-portal/new`)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white" value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Department</option>
            {departments.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Job Status</option>
            <option>Open</option>
            <option>Closed</option>
            <option>Draft</option>
          </select>
          <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Location</option>
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
            <option value="">Employment Type</option>
            {employmentTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Open Positions" value={summary.totalOpenPositions.toString()} />
        <StatCard label="Total Applicants" value={summary.totalApplicants.toString()} />
        <StatCard label="Interviews Scheduled" value={summary.interviewsScheduled.toString()} />
        <StatCard label="AI Match Average %" value={`${summary.aiMatchAverage}%`} accent />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Active Job Listings</h3>
          <Button variant="outline" onClick={() => navigate(`${basePath}/recruitment-analytics`)}>
            View Recruitment Analytics
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="py-3 font-medium">Job Title</th>
                <th className="py-3 font-medium">Department</th>
                <th className="py-3 font-medium">Location</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Applicants</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={5}>Loading jobs...</td>
                </tr>
              ) : jobs.length ? (
                jobs.map((job) => (
                  <tr key={job.id} className="border-b border-slate-100">
                    <td className="py-3 text-slate-900">{job.title}</td>
                    <td className="py-3 text-slate-700">{job.department}</td>
                    <td className="py-3 text-slate-700">{job.location}</td>
                    <td className="py-3">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="py-3 text-slate-700">{applicantsByJob.get(job.id) ?? 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={5}>No jobs found for selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PostNewJobContent({ basePath }: { basePath: "/admin" | "/employer" }) {
  const navigate = useNavigate();
  const [skillsInput, setSkillsInput] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aiPreviewVisible, setAiPreviewVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    employmentType: "Full-time" as Job["employmentType"],
    salaryRange: "",
    experienceRequired: "",
    applicationDeadline: "",
  });

  const skillTags = useMemo(
    () => skillsInput.split(",").map((item) => item.trim()).filter(Boolean),
    [skillsInput]
  );

  async function submit(status: Job["status"]) {
    setSubmitting(true);
    try {
      await createJob({
        title: form.title,
        department: form.department,
        location: form.location,
        employmentType: form.employmentType,
        salaryRange: form.salaryRange,
        experienceRequired: form.experienceRequired,
        skills: skillTags,
        description: jobDescription || "AI-generated job description based on selected skills and role.",
        applicationDeadline: form.applicationDeadline,
        status,
      });
      navigate(`${basePath}/job-portal`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to create job");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Post New Job</h2>
            <p className="text-sm text-slate-600">Create and publish role requirements with AI-enhanced drafting.</p>
          </div>
          <Button variant="outline" onClick={() => navigate(`${basePath}/job-portal`)}>
            Back to Job Portal
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <LabeledInput label="Job Title">
            <Input placeholder="Senior Product Designer" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
          </LabeledInput>
          <LabeledInput label="Department">
            <select className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm bg-white" value={form.department} onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}>
              <option value="">Select department</option>
              {departments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </LabeledInput>

          <LabeledInput label="Location">
            <Input placeholder="Remote / Hybrid / Office" value={form.location} onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))} />
          </LabeledInput>
          <LabeledInput label="Employment Type">
            <select className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm bg-white" value={form.employmentType} onChange={(e) => setForm((prev) => ({ ...prev, employmentType: e.target.value as Job["employmentType"] }))}>
              {employmentTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </LabeledInput>

          <LabeledInput label="Salary Range">
            <Input placeholder="$80,000 - $120,000" value={form.salaryRange} onChange={(e) => setForm((prev) => ({ ...prev, salaryRange: e.target.value }))} />
          </LabeledInput>
          <LabeledInput label="Experience Required">
            <Input placeholder="5+ years" value={form.experienceRequired} onChange={(e) => setForm((prev) => ({ ...prev, experienceRequired: e.target.value }))} />
          </LabeledInput>

          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium text-slate-700">Skills Required (tag input)</label>
            <Input
              value={skillsInput}
              onChange={(event) => setSkillsInput(event.target.value)}
              placeholder="React, TypeScript, Communication"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {skillTags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="text-sm font-medium text-slate-700">Job Description (rich text editor)</label>
              <Button
                type="button"
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                onClick={() => {
                  setAiPreviewVisible(true);
                  setJobDescription("AI-generated job description based on selected skills and role.");
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Job Description with AI
              </Button>
            </div>
            <Textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Define role expectations, impact, and required outcomes."
              className="min-h-40"
            />
            {aiPreviewVisible && (
              <div className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-800">
                AI-generated job description based on selected skills and role.
              </div>
            )}
          </div>

          <LabeledInput label="Application Deadline" className="lg:col-span-2">
            <Input type="date" value={form.applicationDeadline} onChange={(e) => setForm((prev) => ({ ...prev, applicationDeadline: e.target.value }))} />
          </LabeledInput>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" disabled={submitting} onClick={() => submit("Draft")}>Save as Draft</Button>
          <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white" disabled={submitting} onClick={() => submit("Open")}>
            Publish Job
          </Button>
        </div>
      </div>
    </div>
  );
}

function ApplicationsContent() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null);

  async function load() {
    const data = await getApplications({ q: query || undefined, status: status || undefined });
    setApplications(data);
  }

  useEffect(() => {
    load();
  }, [query, status]);

  async function handleStatusChange(id: string, next: ApplicationStatus) {
    await updateApplicationStatus(id, next);
    await load();
  }

  return (
    <div className="p-8 space-y-6 relative overflow-hidden">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Applications</h2>
          <Button variant="outline" onClick={() => setFiltersOpen((value) => !value)}>
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            className="pl-9"
            placeholder="Search candidate name or position"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {filtersOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
            <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Status</option>
              {applicationStatuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white">
              <option>Department</option>
              {departments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white">
              <option>Experience Level</option>
              <option>0-2 years</option>
              <option>3-5 years</option>
              <option>6+ years</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-3 font-medium">Candidate Name</th>
              <th className="py-3 font-medium">Position Applied</th>
              <th className="py-3 font-medium">AI Match Score %</th>
              <th className="py-3 font-medium">Experience</th>
              <th className="py-3 font-medium">Status</th>
              <th className="py-3 font-medium">Action Button</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((candidate) => (
              <tr key={candidate.id} className="border-b border-slate-100">
                <td className="py-3 text-slate-900">{candidate.candidateName}</td>
                <td className="py-3 text-slate-700">{candidate.jobTitle}</td>
                <td className="py-3 text-purple-700 font-semibold">{candidate.aiMatchScore}%</td>
                <td className="py-3 text-slate-700">{candidate.experience}</td>
                <td className="py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {candidate.status}
                  </span>
                </td>
                <td className="py-3 flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCandidate(candidate)}>
                    View AI Panel
                  </Button>
                  <select
                    className="h-8 rounded-md border border-slate-200 px-2 text-xs bg-white"
                    value={candidate.status}
                    onChange={(event) => handleStatusChange(candidate.id, event.target.value as ApplicationStatus)}
                  >
                    {applicationStatuses.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-30 transition-transform duration-300 ${
          selectedCandidate ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedCandidate && (
          <div className="h-full flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">AI Candidate Scoring Panel</h3>
                <p className="text-xs text-slate-500">{selectedCandidate.candidateName}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCandidate(null)}>
                Close
              </Button>
            </div>

            <div className="p-5 space-y-4 overflow-auto">
              <div className="flex items-center gap-3">
                <ImageWithFallback src={selectedCandidate.photoUrl} alt={selectedCandidate.candidateName} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <div className="font-medium text-slate-900">{selectedCandidate.jobTitle}</div>
                  <div className="text-xs text-slate-500">Resume preview available below</div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <div className="text-xs uppercase text-slate-500 mb-1">Resume preview</div>
                <p className="text-sm text-slate-700">{selectedCandidate.coverLetter}</p>
              </div>

              <ScoreRow label="AI Skill Match %" value={selectedCandidate.skillMatch} icon={<Target className="w-4 h-4" />} />
              <ScoreRow label="Culture Fit Score" value={selectedCandidate.cultureFitScore} icon={<Users className="w-4 h-4" />} />
              <ScoreRow label="Predicted Retention Probability" value={selectedCandidate.retentionProbability} icon={<TrendingUp className="w-4 h-4" />} />
              <ScoreRow label="Interview Recommendation Score" value={selectedCandidate.interviewRecommendation} icon={<UserCheck className="w-4 h-4" />} />

              <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                <div className="text-xs uppercase text-purple-700 mb-1">Strengths summary (AI generated)</div>
                <p className="text-sm text-purple-900">{selectedCandidate.strengthsSummary}</p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="text-xs uppercase text-amber-700 mb-2">Risk flags</div>
                <ul className="space-y-1">
                  {selectedCandidate.riskFlags.map((flag) => (
                    <li key={flag} className="text-sm text-amber-900 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 mt-0.5" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreRow({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="flex items-center justify-between text-sm text-slate-700 mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-600" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function CandidatePipelineContent() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  const columns: Array<{ key: string; label: string; filter: (item: Application) => boolean }> = [
    { key: "new", label: "New Applicants", filter: (item) => item.status === "New" },
    { key: "screening", label: "Screening", filter: (item) => item.status === "Screening" },
    { key: "interview", label: "Interview", filter: (item) => item.status === "Interview" },
    { key: "final", label: "Final Review", filter: (item) => item.status === "Final Review" },
    { key: "hired", label: "Hired", filter: (item) => item.status === "Hired" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Candidate Pipeline</h2>
          <p className="text-sm text-slate-600">Drag-and-drop board to move applicants across hiring stages.</p>
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
          <Columns className="w-3.5 h-3.5" />
          Animation placeholder active for drag-and-drop interactions
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {columns.map((column) => (
          <div key={column.key} className="bg-slate-100 rounded-2xl border border-slate-200 p-3 min-h-[420px]">
            <div className="text-sm font-semibold text-slate-700 mb-3 px-1">{column.label}</div>
            <div className="space-y-3">
              {applications.filter(column.filter).map((card) => (
                <div
                  key={card.id}
                  className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <ImageWithFallback src={card.photoUrl} alt={card.candidateName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">{card.candidateName}</div>
                      <div className="text-xs text-slate-500">{card.jobTitle}</div>
                    </div>
                  </div>
                  <div className="text-xs text-purple-700 font-semibold">Match {card.aiMatchScore}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecruitmentAnalyticsContent() {
  const [analytics, setAnalytics] = useState<Awaited<ReturnType<typeof getRecruitmentAnalytics>> | null>(null);

  useEffect(() => {
    getRecruitmentAnalytics().then(setAnalytics);
  }, []);

  if (!analytics) {
    return <div className="p-8 text-slate-500">Loading analytics...</div>;
  }

  const colors = ["#7C3AED", "#A855F7", "#6366F1", "#8B5CF6"];

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">Recruitment Analytics (AI)</h2>
        <p className="text-sm text-slate-600">Track hiring outcomes, source quality, and department velocity trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Time to Hire">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={analytics.charts.timeToHire}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Line type="monotone" dataKey="days" stroke="#7C3AED" strokeWidth={3} dot={{ fill: "#7C3AED", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost per Hire">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics.charts.costPerHire}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Source of Applicants">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={analytics.charts.sourceOfApplicants} dataKey="value" nameKey="name" outerRadius={84}>
                {analytics.charts.sourceOfApplicants.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Hiring Success Rate">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={analytics.charts.hiringSuccessRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="dept" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Bar dataKey="rate" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Department Hiring Trends">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {analytics.charts.departmentHiringTrends.map((item) => (
            <div key={item.dept} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-700">{item.dept}</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">{item.value}%</div>
            </div>
          ))}
        </div>
      </ChartCard>

      <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-5 shadow text-white">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 mt-0.5" />
          <div>
            <div className="font-semibold">AI Insight</div>
            <p className="text-sm text-purple-100 mt-1">{analytics.aiInsight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function LabeledInput({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="text-sm text-slate-600 mb-1">{label}</div>
      <div className={`text-3xl font-bold ${accent ? "text-purple-700" : "text-slate-900"}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Job["status"] }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === "Open"
          ? "bg-emerald-100 text-emerald-700"
          : status === "Draft"
            ? "bg-amber-100 text-amber-700"
            : "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export function AdminJobPortalPage() {
  return (
    <AdminLayout title="Job Portal">
      <JobPortalContent basePath="/admin" />
    </AdminLayout>
  );
}

export function AdminPostNewJobPage() {
  return (
    <AdminLayout title="Post New Job">
      <PostNewJobContent basePath="/admin" />
    </AdminLayout>
  );
}

export function AdminApplicationsPage() {
  return (
    <AdminLayout title="Applications">
      <ApplicationsContent />
    </AdminLayout>
  );
}

export function AdminCandidatePipelinePage() {
  return (
    <AdminLayout title="Candidate Pipeline">
      <CandidatePipelineContent />
    </AdminLayout>
  );
}

export function AdminRecruitmentAnalyticsPage() {
  return (
    <AdminLayout title="Recruitment Analytics">
      <RecruitmentAnalyticsContent />
    </AdminLayout>
  );
}

export function EmployerJobPortalPage() {
  return (
    <EmployerLayout title="Job Portal">
      <JobPortalContent basePath="/employer" />
    </EmployerLayout>
  );
}

export function EmployerPostNewJobPage() {
  return (
    <EmployerLayout title="Post New Job">
      <PostNewJobContent basePath="/employer" />
    </EmployerLayout>
  );
}

export function EmployerApplicationsPage() {
  return (
    <EmployerLayout title="Applications">
      <ApplicationsContent />
    </EmployerLayout>
  );
}

export function EmployerCandidatePipelinePage() {
  return (
    <EmployerLayout title="Candidate Pipeline">
      <CandidatePipelineContent />
    </EmployerLayout>
  );
}

export function EmployerRecruitmentAnalyticsPage() {
  return (
    <EmployerLayout title="Recruitment Analytics">
      <RecruitmentAnalyticsContent />
    </EmployerLayout>
  );
}

export function PublicJobPortalPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    getJobs({ status: "Open" }).then(setJobs);
  }, []);

  const visibleJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (location && job.location !== location) return false;
      if (department && job.department !== department) return false;
      if (query) {
        const term = query.toLowerCase();
        const found =
          job.title.toLowerCase().includes(term) ||
          job.department.toLowerCase().includes(term) ||
          job.skills.join(" ").toLowerCase().includes(term);
        if (!found) return false;
      }
      return true;
    });
  }, [jobs, location, department, query]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">WorkConnect AI Careers</div>
              <div className="text-xs text-slate-500">Public Job Portal</div>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/login")}>Employer Login</Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">Find your next role</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search job title, skill, or keyword" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Location</option>
                {locations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white" value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="">Department</option>
                {departments.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{job.department}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Open</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />{job.employmentType}</span>
              </div>
              <div className="mt-4">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                  onClick={() => navigate(`/jobs/apply?jobId=${encodeURIComponent(job.id)}`)}
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function PublicApplicationFormPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobId, setJobId] = useState(params.get("jobId") ?? "");
  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFileName, setResumeFileName] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getJobs({ status: "Open" }).then((result) => {
      setJobs(result);
      if (!jobId && result.length) {
        setJobId(result[0].id);
      }
    });
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createApplication({
        jobId,
        candidateName,
        email,
        experience,
        coverLetter,
        resumeFileName,
      });
      navigate("/jobs/apply/confirmation");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">Application Form</h1>
        <p className="text-sm text-slate-600 mb-6">Submit your details and resume for role consideration.</p>

        <form className="space-y-5" onSubmit={onSubmit}>
          <LabeledInput label="Position">
            <select className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm bg-white" value={jobId} onChange={(e) => setJobId(e.target.value)} required>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>{job.title} - {job.location}</option>
              ))}
            </select>
          </LabeledInput>

          <LabeledInput label="Upload Resume">
            <Input type="file" onChange={(event) => setResumeFileName(event.target.files?.[0]?.name)} />
          </LabeledInput>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledInput label="Full Name">
              <Input placeholder="Your name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} required />
            </LabeledInput>
            <LabeledInput label="Email">
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </LabeledInput>
          </div>

          <LabeledInput label="Work Experience">
            <Textarea className="min-h-28" placeholder="Share relevant roles, achievements, and impact." value={experience} onChange={(e) => setExperience(e.target.value)} required />
          </LabeledInput>

          <LabeledInput label="Cover Letter">
            <Textarea className="min-h-32" placeholder="Tell us why you are a great fit for this role." value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} required />
          </LabeledInput>

          <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
}

export function PublicApplicationConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-slate-900">Application Submitted</h1>
        <p className="text-slate-600 mt-2">Thank you for applying. Our team will review your profile and contact you soon.</p>
      </div>
    </div>
  );
}
