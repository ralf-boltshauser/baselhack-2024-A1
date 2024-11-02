"use server";

import { Gender, prisma } from "@repo/db";

export async function createCustomer() {
  return await prisma.customer.create({});
}

export async function updateGender(customerId: number, gender: Gender) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { gender },
  });
}
