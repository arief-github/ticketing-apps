import Link from "next/link";

import Heading from "@/components/shared/Heading";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Home Page" description="Hallo, Happy Ticketing" />

      <div className="flex-1 flex flex-col items-center">
        <Link href={`/tickets`} className={buttonVariants({ variant: 'outline' })}>
          Go to Tickets Page
        </Link>
      </div>
    </div>
  );
}
