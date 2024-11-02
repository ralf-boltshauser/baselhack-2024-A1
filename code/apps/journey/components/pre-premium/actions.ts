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

export async function updateBirthday(customerId: number, birthday: Date) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { birthdate: birthday },
  });
}

export async function updateSmokerStatus(customerId: number, isSmoker: boolean) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { smoking: isSmoker },
  });
}

export async function updateCoverageAmount(customerId: number, coverageAmount: number | null) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { insuranceSum: coverageAmount },
  });
}
