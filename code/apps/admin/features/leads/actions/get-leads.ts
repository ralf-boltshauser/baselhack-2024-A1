"use server"; // don't forget to add this!

import { prisma, Status } from "@repo/db";
import { z } from "zod";
import { authActionClient } from "~/lib/action-client";

const schema = z.object({
  status: z.nativeEnum(Status).optional(),
});

export const getMyLeads = authActionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: { status = Status.waiting_for_approval },
      ctx: { user, clerkUser },
    }) => {
      console.log(user, clerkUser);

      return prisma.customer.findMany({
        where: {
          status: {
            in: [status],
          },
          employeeId: user.id,
        },
      });
    },
  );

export const getAllLeads = authActionClient.action(async () => {
  return prisma.customer.findMany();
});
