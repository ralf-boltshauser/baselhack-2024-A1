"use server";

import { prisma, MedicalHistory } from "@repo/db";


export async function updateBmi(customerId: number, bmi: number) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { bmi: bmi },
  });
}

export async function updateHealthQuestions(
  customerId: number,
  medicalHistory: Omit<MedicalHistory, 'id' | 'customerId'>
) {
  // Check if medical history exists
  const existingHistory = await prisma.medicalHistory.findUnique({
    where: { customerId }
  });

  if (existingHistory) {
    // Update existing record
    return prisma.medicalHistory.update({
      where: { customerId },
      data: medicalHistory
    });
  } else {
    // Create new record
    return prisma.medicalHistory.create({
      data: {
        ...medicalHistory,
        customerId
      }
    });
  }
}

export async function updatePersonalInfo(customerId: number, firstName: string, lastName: string, address: string, email: string) {
  await prisma.customer.update({
    where: { id: customerId },
    data: {
      name: `${firstName} ${lastName}`,
      address: address,
      email: email,
    },
  });
}