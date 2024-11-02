import { getLead } from "~/features/leads/actions/get-lead";
import LeadDetail from "~/features/leads/lead-detail/lead-detail";

export default async function Page({
  params: { detailId },
}: {
  params: { detailId: string };
}) {
  const lead = await getLead({ detailId });
  if (!lead?.data) {
    return <div>Lead not found</div>;
  }
  return <LeadDetail lead={lead.data} />;
}
