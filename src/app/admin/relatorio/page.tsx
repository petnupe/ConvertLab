import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/session";
import { listLeads, listStatusHistory } from "@/lib/lead-store";
import { ReportDashboard } from "@/components/admin/report-dashboard";

export const dynamic = "force-dynamic";

export default async function RelatorioPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  const [history, leads] = await Promise.all([listStatusHistory(), listLeads()]);
  return <ReportDashboard history={history} leads={leads} now={new Date().toISOString()} />;
}
