import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { LoginPage } from "./pages/login-page";
import { AdminDashboard } from "./pages/admin/dashboard";
import { PredictiveInsights } from "./pages/admin/predictive-insights";
import { WorkforceAnalytics } from "./pages/admin/workforce-analytics";
import { PayrollIntelligence } from "./pages/admin/payroll-intelligence";
import { RecruitmentAI } from "./pages/admin/recruitment-ai";
import { RiskDetection } from "./pages/admin/risk-detection";
import { RoleManagement } from "./pages/admin/role-management";
import { EmployerDashboard } from "./pages/employer/dashboard";
import { EmployerSettingsPage } from "./pages/employer/settings";
import { EmployeeDashboard } from "./pages/employee/dashboard";
import { EmployeeJobList } from "./pages/employee/job-list";
import { EmployeeSettingsPage } from "./pages/employee/settings";
import {
  AdminApplicationsPage,
  AdminCandidatePipelinePage,
  AdminJobPortalPage,
  AdminPostNewJobPage,
  AdminRecruitmentAnalyticsPage,
  EmployerApplicationsPage,
  EmployerCandidatePipelinePage,
  EmployerJobPortalPage,
  EmployerPostNewJobPage,
  EmployerRecruitmentAnalyticsPage,
  PublicApplicationConfirmationPage,
  PublicApplicationFormPage,
  PublicJobPortalPage,
} from "./pages/recruitment/job-management";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/predictive-insights",
    Component: PredictiveInsights,
  },
  {
    path: "/admin/workforce-analytics",
    Component: WorkforceAnalytics,
  },
  {
    path: "/admin/payroll-intelligence",
    Component: PayrollIntelligence,
  },
  {
    path: "/admin/recruitment-ai",
    Component: RecruitmentAI,
  },
  {
    path: "/admin/risk-detection",
    Component: RiskDetection,
  },
  {
    path: "/admin/role-management",
    Component: RoleManagement,
  },
  {
    path: "/admin/job-portal",
    Component: AdminJobPortalPage,
  },
  {
    path: "/admin/job-portal/new",
    Component: AdminPostNewJobPage,
  },
  {
    path: "/admin/applications",
    Component: AdminApplicationsPage,
  },
  {
    path: "/admin/candidate-pipeline",
    Component: AdminCandidatePipelinePage,
  },
  {
    path: "/admin/recruitment-analytics",
    Component: AdminRecruitmentAnalyticsPage,
  },
  {
    path: "/employer",
    Component: EmployerDashboard,
  },
  {
    path: "/employer/settings",
    Component: EmployerSettingsPage,
  },
  {
    path: "/employer/job-portal",
    Component: EmployerJobPortalPage,
  },
  {
    path: "/employer/job-portal/new",
    Component: EmployerPostNewJobPage,
  },
  {
    path: "/employer/applications",
    Component: EmployerApplicationsPage,
  },
  {
    path: "/employer/candidate-pipeline",
    Component: EmployerCandidatePipelinePage,
  },
  {
    path: "/employer/recruitment-analytics",
    Component: EmployerRecruitmentAnalyticsPage,
  },
  {
    path: "/employee",
    Component: EmployeeDashboard,
  },
  {
    path: "/employee/jobs",
    Component: EmployeeJobList,
  },
  {
    path: "/employee/settings",
    Component: EmployeeSettingsPage,
  },
  {
    path: "/jobs",
    Component: PublicJobPortalPage,
  },
  {
    path: "/jobs/apply",
    Component: PublicApplicationFormPage,
  },
  {
    path: "/jobs/apply/confirmation",
    Component: PublicApplicationConfirmationPage,
  },
]);
