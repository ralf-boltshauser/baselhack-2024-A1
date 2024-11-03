"use server";
import { prisma } from "@repo/db";
export async function createCustomer() {
  const customer = await prisma.customer.create({});
  return customer;
}
