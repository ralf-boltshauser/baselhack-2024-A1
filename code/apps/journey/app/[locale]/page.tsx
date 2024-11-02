import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <Link href="/pre-premium">
        <Button>Pre-Premium</Button>
      </Link>
    </div>
  );
}
