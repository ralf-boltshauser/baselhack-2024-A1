"use server";
import { Gender, prisma } from "@repo/db";
export async function createCustomer() {
  console.log("creating customer");
  const customer = await prisma.customer.create({});

  console.log(customer);

  console.log("customers", await prisma.customer.findMany());
  return customer;
}