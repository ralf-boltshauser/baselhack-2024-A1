"use server";

import { prisma, Status } from "@repo/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authActionClient } from "~/lib/action-client";
export const proceedWithConditions = authActionClient
  .schema(
    z.object({
      customerId: z.string(),
      recommendedInsuranceSum: z.number(),
    }),
  )
  .action(async ({ parsedInput: { customerId, recommendedInsuranceSum } }) => {
    await prisma.customer.update({
      where: { id: Number(customerId) },
      data: {
        status: Status.accepted_with_conditions,
        insuranceSum: recommendedInsuranceSum,
      },
    });

    // TODO send email

    revalidatePath("/");
  });

export const requestDocuments = authActionClient
  .schema(z.object({ customerId: z.string(), documents: z.array(z.string()) }))
  .action(async ({ parsedInput: { customerId, documents } }) => {
    await prisma.customer.update({
      where: { id: Number(customerId) },
      data: {
        status: Status.waiting_for_documents,
        documents: {
          createMany: {
            data: documents.map((document) => ({
              title: document,
            })),
          },
        },
      },
    });
    console.log("Documents requested");
  });

export const approveRequest = authActionClient
  .schema(z.object({ customerId: z.string() }))
  .action(async ({ parsedInput: { customerId } }) => {
    await prisma.customer.update({
      where: { id: Number(customerId) },
      data: { status: Status.accepted },
    });
  });
