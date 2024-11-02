"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authActionClient } from "~/lib/action-client";

export const updateAttributeMultipliers = authActionClient
  .schema(
    z.object({
      multipliers: z.array(
        z.object({
          attribute: z.string(),
          multiplier: z.number(),
        }),
      ),
    }),
  )
  .action(async ({ parsedInput: { multipliers } }) => {
    for (const { attribute, multiplier } of multipliers) {
      await prisma.attributeMultiplier.update({
        where: { attribute: attribute as any },
        data: { multiplier },
      });
    }

    revalidatePath("/configuration");
  });
