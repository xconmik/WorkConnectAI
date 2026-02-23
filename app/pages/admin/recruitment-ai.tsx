import { AdminLayout } from "../../components/admin-layout";
import { UserPlus, Brain, TrendingUp, Star, Award, Target } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function RecruitmentAI() {
  const candidates = [
    {
      name: "Emily Rodriguez",
      position: "Senior Software Engineer",
      match: 94,
      image: "https://images.unsplash.com/photo-1754298949882-216a1c92dbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxODQwNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      skills: { technical: 96, leadership: 88, communication: 92 },
      experience: "8 years",
      education: "MS Computer Science",
      hiringSuccess: 87
    },
    {
      name: "David Chen",
      position: "Senior Software Engineer",
      match: 91,
      image: "https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTg1MDMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      skills: { technical: 94, leadership: 85, communication: 87 },
      experience: "7 years",
      education: "BS Computer Engineering",
      hiringSuccess: 83
    },
    {
      name: "Maya Patel",
      position: "Senior Software Engineer",
      match: 89,
      image: "https://images.unsplash.com/photo-1758369636875-60b3dcb76366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMGJ1c2luZXNzd29tYW58ZW58MXx8fHwxNzcxNzgxMjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      skills: { technical: 92, leadership: 90, communication: 84 },
      experience: "6 years",
      education: "MS Software Engineering",
      hiringSuccess: 85
    },
    {
      name: "James Wilson",
      position: "Senior Software Engineer",
      match: 86,
      image: "https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhZnJpY2FuJTIwYW1lcmljYW4lMjBidXNpbmVzc21hbnxlbnwxfHx8fDE3NzE3ODEyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      skills: { technical: 89, leadership: 82, communication: 88 },
      experience: "9 years",
      education: "BS Computer Science",
      hiringSuccess: 79
    }
  ];

  const openPositions = [
    { title: "Senior Software Engineer", applicants: 247, avgMatch: 76, status: "active" },
    { title: "Product Manager", applicants: 132, avgMatch: 68, status: "active" },
    { title: "UX Designer", applicants: 89, avgMatch: 82, status: "review" },
    { title: "Data Scientist", applicants: 156, avgMatch: 71, status: "active" },
  ];

  return (
    <AdminLayout title="Recruitment AI">
      <div className="p-8 space-y-6">
        {/* AI Recruitment Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">AI-Powered Candidate Screening</h2>
                <p className="text-blue-100 max-w-2xl">
                  Advanced machine learning algorithms analyze resumes, skills, and cultural fit to recommend the best candidates for your open positions.
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Screening Accuracy</div>
              <div className="text-3xl font-bold text-white">94.2%</div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm text-slate-600">Active Positions</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">12</div>
            <p className="text-xs text-blue-600 mt-1">624 total applicants</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm text-slate-600">High Match</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">89</div>
            <p className="text-xs text-purple-600 mt-1">Match score &gt;85%</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-sm text-slate-600">Hired This Month</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">8</div>
            <p className="text-xs text-emerald-600 mt-1">92% retention rate</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-sm text-slate-600">Avg Time to Hire</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">18d</div>
            <p className="text-xs text-emerald-600 mt-1">-6 days vs last quarter</p>
          </div>
        </div>

        {/* Top Candidates */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Top AI-Matched Candidates</h3>
              <p className="text-sm text-slate-600 mt-1">Highest scoring candidates for Senior Software Engineer</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-4 py-2 rounded-lg border border-slate-200 text-sm">
                <option>Senior Software Engineer</option>
                <option>Product Manager</option>
                <option>UX Designer</option>
                <option>Data Scientist</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                View All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {candidates.map((candidate, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  {/* Profile Image */}
                  <ImageWithFallback 
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-md"
                  />

                  {/* Candidate Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">{candidate.name}</h4>
                        <p className="text-sm text-slate-600">{candidate.position}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-3xl font-bold text-blue-600">{candidate.match}%</div>
                          <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                            TOP MATCH
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">AI Match Score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Target className="w-4 h-4" />
                        <span>{candidate.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Award className="w-4 h-4" />
                        <span>{candidate.education}</span>
                      </div>
                    </div>

                    {/* Skill Alignment */}
                    <div className="space-y-2 mb-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-slate-600">Technical Skills</span>
                          <span className="text-xs font-semibold text-slate-900">{candidate.skills.technical}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                            style={{ width: `${candidate.skills.technical}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-slate-600">Leadership</span>
                          <span className="text-xs font-semibold text-slate-900">{candidate.skills.leadership}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                            style={{ width: `${candidate.skills.leadership}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-slate-600">Communication</span>
                          <span className="text-xs font-semibold text-slate-900">{candidate.skills.communication}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                            style={{ width: `${candidate.skills.communication}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-lg">
                        <Brain className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-900">
                          {candidate.hiringSuccess}% hiring success prediction
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-5 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                          View Resume
                        </button>
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Schedule Interview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions Overview */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Open Positions</h3>
            
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">{position.title}</h4>
                      <p className="text-sm text-slate-600">{position.applicants} applicants</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      position.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {position.status.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">Average Match Score</span>
                      <span className="text-xs font-semibold text-slate-900">{position.avgMatch}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        style={{ width: `${position.avgMatch}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">AI Hiring Insights</h3>
                <p className="text-blue-100 text-sm">Recommendations based on comprehensive analysis</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white font-semibold mb-1">Optimal Hiring Window Detected</p>
                <p className="text-blue-100 text-sm">
                  Market competition for Senior Engineers is 23% lower than average. Recommend accelerating hiring process for top 3 candidates.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white font-semibold mb-1">Skill Gap Analysis</p>
                <p className="text-blue-100 text-sm">
                  Current candidate pool shows strong technical skills but 15% below target for leadership experience. Consider adjusting requirements or internal promotions.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white font-semibold mb-1">Predicted Time to Fill</p>
                <p className="text-blue-100 text-sm">
                  Based on current pipeline quality and interview velocity, Senior Software Engineer position expected to be filled within 12-15 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
