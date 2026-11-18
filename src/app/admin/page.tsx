import { isAuthenticated } from "@/lib/session";
import { listLeads, listProdutos, listRamos, listStatus } from "@/lib/lead-store";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    return <AdminLogin />;
  }

  const [leads, produtos, statuses, ramos] = await Promise.all([
    listLeads(),
    listProdutos(),
    listStatus(),
    listRamos(),
  ]);
  return (
    <AdminDashboard
      leads={leads}
      produtos={produtos}
      statuses={statuses}
      ramos={ramos}
    />
  );
}
