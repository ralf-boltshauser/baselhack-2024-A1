import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <section className="flex flex-col items-center justify-center h-[90vh] w-full bg-primary-50 text-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-primary-900">
        Get Your Insurance Quote in Minutes
      </h1>
      <p className="text-lg text-gray-700 mb-10">
        Fast, easy, and transparent. Find out how much you could save today.
      </p>
      <Link href="/pre-premium">
        <Button className="" size={"lg"} variant={"default"}>
          Get Your Price Now
        </Button>
      </Link>
    </section>
  );
}
