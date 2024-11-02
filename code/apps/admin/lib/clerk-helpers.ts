import { currentUser, User } from "@clerk/nextjs/server";
import { Employee, prisma } from "@repo/db";
export const getUser: () => Promise<{
  clerkUser: User;
  user: Employee;
}> = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  console.log(clerkUser);

  const user = await prisma.employee.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // merge db and clerk user
  const mergedUser = {
    clerkUser,
    user,
  };
  return mergedUser;
};
