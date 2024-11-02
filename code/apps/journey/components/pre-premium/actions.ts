"use server";

import { Gender, prisma } from "@repo/db";

export async function createCustomer() {
  const customer = await prisma.customer.create({});

  console.log(customer);

  console.log("customers", await prisma.customer.findMany());
  return customer;
}

export async function updateGender(customerId: number, gender: Gender) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { gender },
  });
}
