"use server"; // don't forget to add this!

import { prisma } from "@repo/db";
import { authActionClient } from "~/lib/action-client";

export const getMyLeads = authActionClient.action(async ({ ctx: { user } }) => {
  return prisma.customer.findMany({
    where: {
      employeeId: user.id,
    },
  });
});
