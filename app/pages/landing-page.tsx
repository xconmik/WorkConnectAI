import { useNavigate } from "react-router";
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap, 
  BarChart3,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900">WorkConnect AI</span>
          </div>
          
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#solutions" className="text-slate-600 hover:text-slate-900 transition-colors">Solutions</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/login")}
              className="text-slate-700"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
            >
              Request Demo
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Enterprise AI-Powered</span>
            </div>
            
            <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
              AI-Powered Workforce Intelligence
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Automate HR. Predict workforce trends. Optimize performance.
            </p>
            
            <div className="flex items-center gap-4 mb-12">
              <Button 
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-900 to-purple-600 hover:from-blue-800 hover:to-purple-500 px-8 h-14 text-base"
              >
                Request Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/login")}
                className="h-14 px-8 text-base border-slate-300"
              >
                Login
              </Button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-600">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-600">14-day free trial</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1631006732121-a6da2f4864d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBzY3JlZW58ZW58MXx8fHwxNzcxODIyODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI Dashboard Preview" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -left-8 top-20 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Workforce Health</div>
              <div className="text-3xl font-bold text-emerald-500">94%</div>
              <div className="text-xs text-emerald-600">+8% this month</div>
            </div>
            
            <div className="absolute -right-8 bottom-20 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">AI Predictions</div>
              <div className="text-3xl font-bold text-blue-600">99.2%</div>
              <div className="text-xs text-blue-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-16 border-y border-slate-200 bg-white/50">
        <div className="text-center mb-8">
          <p className="text-slate-500 uppercase tracking-wider text-sm font-medium">
            Trusted by leading enterprises worldwide
          </p>
        </div>
        <div className="flex justify-center items-center gap-12 opacity-40">
          <div className="text-2xl font-bold text-slate-700">MICROSOFT</div>
          <div className="text-2xl font-bold text-slate-700">SALESFORCE</div>
          <div className="text-2xl font-bold text-slate-700">IBM</div>
          <div className="text-2xl font-bold text-slate-700">ORACLE</div>
          <div className="text-2xl font-bold text-slate-700">SAP</div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            AI-Powered Features
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Leverage cutting-edge AI to transform your workforce management
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Predictive Analytics</h3>
            <p className="text-slate-600 leading-relaxed">
              AI algorithms predict employee turnover, burnout risks, and performance trends before they happen.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Workforce Optimization</h3>
            <p className="text-slate-600 leading-relaxed">
              Optimize team performance, resource allocation, and productivity with AI-driven insights.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Recruitment</h3>
            <p className="text-slate-600 leading-relaxed">
              AI-powered candidate screening, skill matching, and hiring success predictions.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Risk Detection</h3>
            <p className="text-slate-600 leading-relaxed">
              Identify potential risks, anomalies, and compliance issues with real-time AI monitoring.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Payroll Intelligence</h3>
            <p className="text-slate-600 leading-relaxed">
              Forecast payroll costs, detect anomalies, and optimize compensation strategies.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Real-Time Insights</h3>
            <p className="text-slate-600 leading-relaxed">
              Get instant, actionable insights and recommendations powered by advanced machine learning.
            </p>
          </div>
        </div>
      </section>

      {/* KPI Stats Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-20 bg-gradient-to-r from-blue-900 to-purple-600 rounded-3xl my-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-blue-100">
            See how WorkConnect AI delivers measurable impact
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">45%</div>
            <div className="text-blue-100">Reduction in Turnover</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">32%</div>
            <div className="text-blue-100">Increase in Productivity</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">60%</div>
            <div className="text-blue-100">Faster Recruitment</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">$2M+</div>
            <div className="text-blue-100">Average Annual Savings</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-24 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">
          Ready to Transform Your Workforce?
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Join thousands of enterprises using AI to build better, more productive teams.
        </p>
        <Button 
          size="lg"
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-blue-900 to-purple-600 hover:from-blue-800 hover:to-purple-500 px-12 h-14 text-base"
        >
          Get Started Today
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 mt-20">
        <div className="max-w-[1440px] mx-auto px-8 py-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-900 to-purple-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-slate-900">WorkConnect AI</span>
              </div>
              <p className="text-slate-600 text-sm">
                Enterprise AI-powered workforce management for modern businesses.
              </p>
            </div>
            
            <div>
              <div className="font-semibold text-slate-900 mb-3">Product</div>
              <div className="space-y-2 text-sm text-slate-600">
                <div>Features</div>
                <div>Pricing</div>
                <div>Security</div>
                <div>Integrations</div>
              </div>
            </div>
            
            <div>
              <div className="font-semibold text-slate-900 mb-3">Company</div>
              <div className="space-y-2 text-sm text-slate-600">
                <div>About</div>
                <div>Careers</div>
                <div>Blog</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <div className="font-semibold text-slate-900 mb-3">Legal</div>
              <div className="space-y-2 text-sm text-slate-600">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Security</div>
                <div>Compliance</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            © 2026 WorkConnect AI. All rights reserved. Enterprise-grade HR platform.
          </div>
        </div>
      </footer>
    </div>
  );
}
