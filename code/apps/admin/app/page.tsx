import { Status } from "@repo/db";
import { getMyLeads } from "~/features/configuration/actions/get-leads";

export default async function Page() {
  const leads = await getMyLeads({ status: Status.waiting_for_approval });
  if (!leads) {
    return <div>No leads found</div>;
  }
  console.log(leads);

  return (
    <div>
      {leads.data &&
        leads.data.map((lead) => <div key={lead.id}>Name: "{lead.name}"</div>)}
    </div>
  );
}
