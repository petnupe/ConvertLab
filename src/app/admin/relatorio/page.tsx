import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/session";
import { listLeads, listRamos, listStatus, listStatusHistory } from "@/lib/lead-store";
import { ReportDashboard } from "@/components/admin/report-dashboard";

export const dynamic = "force-dynamic";

export default async function RelatorioPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  const [history, leads, statuses, ramos] = await Promise.all([
    listStatusHistory(),
    listLeads(),
    listStatus(),
    listRamos(),
  ]);
  return (
    <ReportDashboard
      history={history}
      leads={leads}
      statuses={statuses}
      ramos={ramos}
      now={new Date().toISOString()}
    />
  );
}
