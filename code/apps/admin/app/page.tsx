// import { PrismaClient, User } from "@repo/db";
import { revalidatePath } from "next/cache";
// const client = new PrismaClient();
export default async function Page() {
  // const users = await client.user.findMany();

  // const addUser = async () => {
  //   "use server";
  //   await client.user.create({
  //     data: {
  //       email: "test@test.ch",
  //       name: "Test",
  //     },
  //   });
  //   revalidatePath("/");
  // };

  // const deleteUser = async (formData: FormData) => {
  //   "use server";
  //   const id = formData.get("id") as string;
  //   await client.user.delete({ where: { id: parseInt(id) } });
  //   revalidatePath("/");
  // };

  return (
    <main>
      <p>Dark Docs</p>
      {/* {users.map((user: User) => (
        <form action={deleteUser} key={user.id}>
          <p>{user.email}</p>
          <input type="hidden" name="id" value={user.id} />
          <button type="submit">Delete</button>
        </form>
      ))}

      <form action={addUser}>
        <button type="submit">Add User</button>
      </form> */}
    </main>
  );
}
