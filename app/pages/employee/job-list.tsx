import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Brain, Briefcase, Calendar, FileText, LogOut, MapPin, Search, TrendingUp, Bell, Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Job, getJobs } from "../../lib/recruitment-api";

export function EmployeeJobList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getJobs({ status: "Open" }).then(setJobs);
  }, []);

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        if (!query) return true;
        const term = query.toLowerCase();
        return (
          job.title.toLowerCase().includes(term) ||
          job.department.toLowerCase().includes(term) ||
          job.skills.join(" ").toLowerCase().includes(term)
        );
      }),
    [jobs, query]
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 bg-gradient-to-b from-blue-900 to-blue-950 border-r border-blue-800 flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">WorkConnect AI</div>
              <div className="text-xs text-blue-300">Employee Portal</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate("/employee")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === "/employee"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-blue-200 hover:text-white hover:bg-blue-800/50"
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">My Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/employee/jobs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === "/employee/jobs"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-blue-200 hover:text-white hover:bg-blue-800/50"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-medium">Job List</span>
          </button>
        </nav>

        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
              AK
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Alex Kim</div>
              <div className="text-xs text-blue-300">Software Engineer</div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-200 hover:text-white hover:bg-blue-800/50"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-slate-900">Internal Job List</h1>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Explore Open Roles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative md:col-span-2">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input placeholder="Search jobs by title or skill" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <select className="h-10 rounded-md border border-slate-200 px-3 text-sm bg-white">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Design</option>
                <option>Analytics</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{job.department}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Open</span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {job.employmentType}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white" onClick={() => navigate(`/jobs/apply?jobId=${encodeURIComponent(job.id)}`)}>
                    Apply
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
