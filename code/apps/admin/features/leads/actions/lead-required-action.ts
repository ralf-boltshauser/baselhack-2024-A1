"use server";
import { DecisiveFactor, prisma, Status, TrafficLightColor } from "@repo/db";
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
      lead.status === Status.rejected
    ) {
      return LeadRequiredAction.DEFAULT;
    }

    if (lead.trafficLightColor === TrafficLightColor.orange) {
      if (lead.decisiveFactor == DecisiveFactor.score) {
        return LeadRequiredAction.PROCEED_WITH_CONDITIONS;
      } else {
        if (lead.status === Status.review_documents) {
          // TODO review this
          return LeadRequiredAction.APPROVE_REQUEST;
        }
        return LeadRequiredAction.REQUEST_DOCUMENTS;
      }
    }

    return LeadRequiredAction.DEFAULT;
  });
