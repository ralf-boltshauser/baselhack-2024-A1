"use client";
import { Customer } from "@repo/db";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { getLeadRequiredAction } from "../actions/lead-required-action";
import { LeadRequiredAction } from "../actions/lead-required-action-enum";
import ApproveRequest from "./approve-request";
import ProceedWithConditions from "./proceed-with-conditions";
import RequestDocuments from "./request-documents";

export default function LeadDetail({ lead }: { lead: Customer }) {
  const { result, execute } = useAction(getLeadRequiredAction, {});

  useEffect(() => {
    execute({ leadId: Number(lead.id) });
  }, [lead.id]);

  if (!result || !result.data) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4 items-start">
          <div className="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse" />
          <div className="flex flex-col gap-4 flex-grow">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1 border rounded-lg p-6 bg-gray-50">
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="flex-1 border rounded-lg p-6 bg-gray-50">
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  switch (result.data) {
    case LeadRequiredAction.APPROVE_REQUEST:
      return <ApproveRequest lead={lead} />;
    case LeadRequiredAction.PROCEED_WITH_CONDITIONS:
      return <ProceedWithConditions lead={lead} />;
    case LeadRequiredAction.REQUEST_DOCUMENTS:
      return <RequestDocuments lead={lead} />;
    case LeadRequiredAction.DEFAULT:
      return <div>Nothing left to be done!</div>;
  }
}
