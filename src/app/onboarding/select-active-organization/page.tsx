import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import OrganizationList from "@/features/organization/components/organization-list";
import { getOrganizationByUser } from "@/features/organization/queries/get-organization-by-user";
import { onboardingPath, organizationPath } from "@/paths";

const SelectActiveOrganizationPage = async () => {
  const organizations = await getOrganizationByUser();

  const hasActive = organizations.some((org) => {
    return org.membershipByUser.isActive;
  });

  if (hasActive) {
    redirect(organizationPath());
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Select Active Organization"
        description="Pick on Organization to work with"
        action={
          <Button asChild>
            <Link href={onboardingPath()}>
              <LucidePlus className="mr-2 h-4 w-4" />
              Create New Organization
            </Link>
          </Button>
        }
      />
      <Suspense fallback={<Spinner />}>
        <OrganizationList limitedAccess={false} />
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganizationPage;
