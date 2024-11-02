"use server";

import {
  AttributeName,
  MedicalHistory,
  prisma,
  Status,
  TrafficLightColor,
} from "@repo/db";
import { getCustomer } from "../pre-premium/actions";

export async function updateBmi(customerId: number, bmi: number) {
  //calculate a bmi score that ranges from 0 to 10 10 is worst 0 is best
  const bmiScore = Math.min(10, Math.abs(bmi - 22.5));
  await prisma.customer.update({
    where: { id: customerId },
    data: { bmi: bmi, bmiScore },
  });
}

export async function updateHealthQuestions(
  customerId: number,
  medicalHistory: Omit<MedicalHistory, "id" | "customerId">,
) {
  // Check if medical history exists
  const existingHistory = await prisma.medicalHistory.findUnique({
    where: { customerId },
  });

  if (existingHistory) {
    // Update existing record
    return prisma.medicalHistory.update({
      where: { customerId },
      data: medicalHistory,
    });
  } else {
    // Create new record
    return prisma.medicalHistory.create({
      data: {
        ...medicalHistory,
        customerId,
      },
    });
  }
}

export async function updatePersonalInfo(
  customerId: number,
  firstName: string,
  lastName: string,
  address: string,
  email: string,
) {
  await prisma.customer.update({
    where: { id: customerId },
    data: {
      name: `${firstName} ${lastName}`,
      address: address,
      email: email,
    },
  });
}

async function calculateScore(customerId: number) {
  // calculate score
  // return score
  const customer = await getCustomer(customerId);
  const multipliers = await prisma.attributeMultiplier.findMany();

  // multiply all customer scores by the attributes
  // multiply the multiplier with AttributeName.AGE with ageScore
  //   BMI
  // SMOKING
  // INSURANCE_SUM
  // DURATION
  // CARDIAC_ISSUES
  // DIABETIC_CONDITION
  // HYPERTENSION

  const ageScore =
    (customer?.ageScore ?? 0) *
    (multipliers.find((m) => m.attribute == AttributeName.AGE)?.multiplier ??
      0);

  const bmiScore =
    (customer?.bmiScore ?? 0) *
    (multipliers.find((m) => m.attribute == AttributeName.BMI)?.multiplier ??
      0);

  const smokingScore =
    (customer?.smokeScore ?? 0) *
    (multipliers.find((m) => m.attribute == AttributeName.SMOKING)
      ?.multiplier ?? 0);

  const insuranceSumScore =
    (customer?.insuranceSumScore ?? 0) *
    (multipliers.find((m) => m.attribute == AttributeName.INSURANCE_SUM)
      ?.multiplier ?? 0);

  const durationScore =
    (customer?.durationScore ?? 0) *
    (multipliers.find((m) => m.attribute == AttributeName.DURATION)
      ?.multiplier ?? 0);

  const cardiacIssuesScore =
    (customer?.cardiacIssuesScore ?? 0) *
    (multipliers.find((m) => m.attribute == AttributeName.CARDIAC_ISSUES)
      ?.multiplier ?? 0);

  const diabeticConditionScore =
    (customer?.diabeticConditionScore ?? 0) *
    (multipliers.find((m) => m.attribute == AttributeName.DIABETIC_CONDITION)
      ?.multiplier ?? 0);

  const hypertensionScore =
    (customer?.hypertensionScore ?? 0) *
    (multipliers.find((m) => m.attribute == AttributeName.HYPERTENSION)
      ?.multiplier ?? 0);

  return (
    ageScore +
    bmiScore +
    smokingScore +
    insuranceSumScore +
    durationScore +
    cardiacIssuesScore +
    diabeticConditionScore +
    hypertensionScore
  );
}

async function calculateTrafficLight(score: number) {
  const thresholds = await prisma.riskThreshold.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!thresholds) {
    return TrafficLightColor.red;
  }

  if (score <= thresholds.greenMax) {
    return TrafficLightColor.green;
  } else if (score <= thresholds.orangeMax) {
    return TrafficLightColor.orange;
  }
  return TrafficLightColor.red;
}

async function getStatus(trafficLight: TrafficLightColor, customerId: number) {
  // get customer
  // set status

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      medicalHistory: true,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const needsMoreInfo =
    customer.medicalHistory?.hasChronicIllnesses ||
    customer.medicalHistory?.wasHospitalized ||
    customer.medicalHistory?.hasSeriousIllnesses ||
    customer.medicalHistory?.takesMedication;

  if (trafficLight == TrafficLightColor.red) {
    return Status.rejected;
  } else if (needsMoreInfo) {
    return Status.requesting_documents;
  } else {
    if (trafficLight == TrafficLightColor.green) {
      return Status.accepted;
    } else {
      return Status.waiting_for_counter_offer;
    }
  }
}

export async function finalSubmission(customerId: number) {
  const score = await calculateScore(customerId);
  const trafficLight = await calculateTrafficLight(score);
  const status = await getStatus(trafficLight, customerId);

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      status: status,
      trafficLightColor: trafficLight,
    },
  });

  // assign employee
  const employee = await prisma.employee.findFirst({});
  const customer = await getCustomer(customerId);

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      employeeId: employee?.id,
      recommendedInsuranceSum: customer?.insuranceSum
        ? Math.round(customer.insuranceSum / 2 / 25000) * 25000
        : null,
    },
  });
}
