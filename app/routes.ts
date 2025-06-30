import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("staff", "routes/staff.tsx"),
  route("projects", "routes/projects.tsx"),
  route("tasks", "routes/tasks.tsx"),
  route("timesheets", "routes/timesheets.tsx"),
  route("mail", "routes/mail.tsx"),
  route("bot-console", "routes/bot-console.tsx"),
  route("email-marketing", "routes/email-marketing.tsx"),
  route("customer-management", "routes/customer-management.tsx"),
  route("sales-pipeline", "routes/sales-pipeline.tsx"),
  route("invoice-billing", "routes/invoice-billing.tsx"),
  route("reports-analytics", "routes/reports-analytics.tsx"),
  route("features-overview", "routes/features-overview.tsx"),
  route("support", "routes/support.tsx"),
] satisfies RouteConfig; 