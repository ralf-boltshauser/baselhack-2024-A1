import { AttributeName, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed AttributeMultipliers - one for each AttributeName
  const attributeNames = Object.values(AttributeName);

  for (const attributeName of attributeNames) {
    await prisma.attributeMultiplier.upsert({
      where: { attribute: attributeName },
      update: {},
      create: {
        attribute: attributeName,
        multiplier: Math.random() * 2, // Assign a random multiplier between 0 and 2 for illustration
      },
    });
  }

  // Seed Jobs
  const jobs = [
    {
      id: 1,
      name: "Software Engineer",
    },
    {
      id: 2,
      name: "Doctor",
    },
    {
      id: 3,
      name: "Teacher",
    },
    {
      id: 4,
      name: "Nurse",
    },
    {
      id: 5,
      name: "Pilot",
    },
    {
      id: 6,
      name: "Police Officer",
    },
    {
      id: 7,
      name: "Firefighter",
    },
    {
      id: 8,
      name: "Chef",
    },
    {
      id: 9,
      name: "Barista",
    },
    {
      id: 10,
      name: "Janitor",
    },
    {
      id: 11,
      name: "Mechanic",
    },
    {
      id: 12,
      name: "Electrician",
    },
    {
      id: 13,
      name: "Plumber",
    },
    {
      id: 14,
      name: "Construction Worker",
    },
    {
      id: 15,
      name: "Architect",
    },
    {
      id: 16,
      name: "Artist",
    },
    {
      id: 17,
      name: "Musician",
    },
    {
      id: 18,
      name: "Actor",
    },
    {
      id: 19,
      name: "Athlete",
    },
    {
      id: 20,
      name: "Model",
    },
    {
      id: 21,
      name: "Photographer",
    },
    {
      id: 22,
      name: "Journalist",
    },
    {
      id: 23,
      name: "Writer",
    },
    {
      id: 24,
      name: "Editor",
    },
    {
      id: 25,
      name: "Publisher",
    },
    {
      id: 26,
      name: "Librarian",
    },
    {
      id: 27,
      name: "Curator",
    },
    {
      id: 28,
      name: "Historian",
    },
    {
      id: 29,
      name: "Archaeologist",
    },
    {
      id: 30,
      name: "Biologist",
    },
  ];

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { id: job.id },
      update: {},
      create: job,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
