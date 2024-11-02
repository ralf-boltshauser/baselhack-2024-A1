"use server";
import { prisma, Status } from "@repo/db";
import { z } from "zod";
import { authActionClient } from "~/lib/action-client";
import { LeadRequiredAction } from "./lead-required-action-enum";

export const getLeadRequiredAction = authActionClient
  .schema(
    z.object({
      leadId: z.number(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const lead = await prisma.customer.findUnique({
      where: {
        id: parsedInput.leadId,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    if (
      lead.status === Status.accepted ||
      lead.status === Status.accepted_with_conditions ||
      lead.status === Status.waiting_for_documents ||
      lead.status === Status.rejected
    ) {
      return LeadRequiredAction.DEFAULT;
    }

    if (lead.status === Status.requesting_documents) {
      return LeadRequiredAction.REQUEST_DOCUMENTS;
    }

    if (lead.status === Status.waiting_for_counter_offer) {
      return LeadRequiredAction.PROCEED_WITH_CONDITIONS;
    }

    if (lead.status === Status.review_documents) {
      return LeadRequiredAction.APPROVE_REQUEST;
    }

    return LeadRequiredAction.DEFAULT;
  });
