"use server";

import { Gender, prisma } from "@repo/db";

export async function createCustomer() {
  const customer = await prisma.customer.create({});
  console.log('Created customer:', customer);
  return customer;
}

export async function updateGender(customerId: number, gender: Gender) {
  console.log('Updating gender:', { customerId, gender });
  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: { 
      gender,
      genderScore: gender === Gender.male ? 6 : 4 
    },
  });
  console.log('Updated customer gender:', customer);
  return customer;
}

export async function updateBirthday(customerId: number, birthday: Date) {
  console.log('Updating birthday:', { customerId, birthday });
  const age = Math.floor((Date.now() - birthday.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  const score = Math.min(Math.max(Math.floor(age / 10), 1), 10);
  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: { 
      birthdate: birthday,
      ageScore: score
    },
  });
  console.log('Updated customer birthday:', customer);
  return customer;
}

export async function updateSmokerStatus(customerId: number, isSmoker: boolean) {
  console.log('Updating smoker status:', { customerId, isSmoker });
  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: { 
      smoking: isSmoker,
      smokeScore: isSmoker ? 10 : 0 
    },
  });
  console.log('Updated customer smoker status:', customer);
  return customer;
}

export async function updateCoverageAmount(customerId: number, coverageAmount: number | null) {
  console.log('Updating coverage amount:', { customerId, coverageAmount });
  const score = coverageAmount 
    ? Math.min(Math.max(Math.floor(coverageAmount / 100000), 1), 10)
    : 0;
  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: { 
      insuranceSum: coverageAmount,
      insuranceSumScore: score
    },
  });
  console.log('Updated customer coverage amount:', customer);
  return customer;
}

export async function updateDuration(customerId: number, duration: number) {
  console.log('Updating duration:', { customerId, duration });
  const score = Math.min(Math.max(Math.floor(duration / 5), 1), 10);
  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: { 
      duration: duration,
      durationScore: score 
    },
  });
  console.log('Updated customer duration:', customer);
  return { customer, shouldRedirect: true };
}
