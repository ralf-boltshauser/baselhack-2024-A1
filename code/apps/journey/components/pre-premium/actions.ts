"use server";

import { Gender, prisma, Customer } from "@repo/db";

export async function createCustomer() {
  return await prisma.customer.create({});
}

export async function updateGender(customerId: number, gender: Gender) {
  return await prisma.customer.update({
    where: { id: customerId },
    data: { 
      gender,
      genderScore: gender === Gender.male ? 6 : 4 
    },
  });
}

export async function updateBirthday(customerId: number, birthday: Date) {
  const age = Math.floor((Date.now() - birthday.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  const score = Math.min(Math.max(Math.floor(age / 10), 1), 10);
  return await prisma.customer.update({
    where: { id: customerId },
    data: { 
      birthdate: birthday,
      ageScore: score
    },
  });
}

export async function updateSmokerStatus(customerId: number, isSmoker: boolean) {
  return await prisma.customer.update({
    where: { id: customerId },
    data: { 
      smoking: isSmoker,
      smokeScore: isSmoker ? 10 : 0 
    },
  });
}

export async function updateCoverageAmount(customerId: number, coverageAmount: number | null) {
  const score = coverageAmount 
    ? Math.min(Math.max(Math.floor(coverageAmount / 100000), 1), 10)
    : 0;
  return await prisma.customer.update({
    where: { id: customerId },
    data: { 
      insuranceSum: coverageAmount,
      insuranceSumScore: score
    },
  });
}

export async function updateDuration(customerId: number, duration: number) {
  const score = Math.min(Math.max(Math.floor(duration / 5), 1), 10);
  return await prisma.customer.update({
    where: { id: customerId },
    data: { 
      duration: duration,
      durationScore: score 
    },
  });
}

export async function calculateInsurancePrice(customerId: number): Promise<number> {
  // Get customer data with all scores
  const customer = await prisma.customer.findUnique({
    where: { id: customerId }
  });

  if (!customer) {
    throw new Error('Customer not found');
  }

  // Base price in CHF
  const basePrice = 50;

  // Calculate multipliers based on scores (each score is 0-10)
  const ageMultiplier = (customer.ageScore || 0) * 0.1;        // 0-1.0
  const genderMultiplier = (customer.genderScore || 0) * 0.05; // 0-0.5
  const smokeMultiplier = (customer.smokeScore || 0) * 0.2;    // 0-2.0
  const durationMultiplier = Math.max(1 - ((customer.durationScore || 0) * 0.05), 0.5); // 0.5-1.0
  const coverageMultiplier = (customer.insuranceSumScore || 0) * 0.15; // 0-1.5

  // Calculate final monthly price
  const monthlyPrice = basePrice * (1 + ageMultiplier + genderMultiplier + smokeMultiplier) 
    * durationMultiplier 
    * (1 + coverageMultiplier);

  // Round to 2 decimal places
  return Math.round(monthlyPrice * 100) / 100;
}

export async function getCustomer(customerId: number): Promise<Customer | null> {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId }
  });

  if (!customer) {
    throw new Error(`Customer with id ${customerId} not found`);
  }

  return customer;
}