"use server";

import { prisma } from "@repo/db";
import { z } from "zod";
import { authActionClient } from "~/lib/action-client";
const schema = z.object({
  detailId: z.string(),
});

export const getLead = authActionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const lead = await prisma.customer.findUnique({
      where: {
        id: Number(parsedInput.detailId),
      },
    });

    return lead;
  });
