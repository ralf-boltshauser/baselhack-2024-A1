import { Customer } from "@repo/db";
import { getLeadRequiredAction } from "../actions/lead-required-action";
import { LeadRequiredAction } from "../actions/lead-required-action-enum";
import ApproveRequest from "./approve-request";
import ProceedWithConditions from "./proceed-with-conditions";
import RequestDocuments from "./request-documents";

export default async function LeadDetail({ lead }: { lead: Customer }) {
  const requiredAction = await getLeadRequiredAction({
    leadId: Number(lead.id),
  });

  if (!requiredAction || !requiredAction.data) {
    return <div>No required action</div>;
  }

  switch (requiredAction.data) {
    case LeadRequiredAction.APPROVE_REQUEST:
      return <ApproveRequest lead={lead} />;
    case LeadRequiredAction.PROCEED_WITH_CONDITIONS:
      return <ProceedWithConditions lead={lead} />;
    case LeadRequiredAction.REQUEST_DOCUMENTS:
      return <RequestDocuments lead={lead} />;
    case LeadRequiredAction.DEFAULT:
      return <div>Default</div>;
  }
}
