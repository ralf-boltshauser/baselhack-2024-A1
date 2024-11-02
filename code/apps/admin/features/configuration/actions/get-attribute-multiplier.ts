"use server"; // don't forget to add this!

import { prisma } from "@repo/db";
import { authActionClient } from "~/lib/action-client";

export const getAttributeMultiplier = authActionClient.action(async () => {
  return prisma.attributeMultiplier.findMany();
});
