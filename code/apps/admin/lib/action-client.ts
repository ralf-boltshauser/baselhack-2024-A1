import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./clerk-helpers";

export const actionClient = createSafeActionClient();

// create a authenticated client with clerk
export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  const { clerkUser, user } = await getUser();
  console.log("user", user, clerkUser);

  return next({ ctx: { user, clerkUser } });
});
