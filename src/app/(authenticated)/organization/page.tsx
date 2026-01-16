import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import OrganizationList from "@/features/organization/components/organization-list";
import { organizationCreatePath } from "@/paths";

const OrganizationPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Organization"
        description="All your organizations"
        action={
          <Button asChild>
            <Link href={organizationCreatePath()}>
              <LucidePlus className="w-4 h-4" />
              Create Organization
            </Link>
          </Button>
        }
      />
      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;
