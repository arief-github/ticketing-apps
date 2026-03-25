import { Suspense } from "react";

import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/Spinner";
import { InvitationCreateButton } from "@/features/invitations/components/invitation-create-button";
import { MembershipsList } from "@/features/memberships/components/memberships-list";

import { OrganizationBreadcrumbs } from "../_navigation/tabs";

type MembershipsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const MembershipsPage = async ({ params }: MembershipsPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Memberships"
        description="Manage members in your organization"
        tabs={<OrganizationBreadcrumbs />}
        action={<InvitationCreateButton organizationId={organizationId} />}
      />

      <Suspense fallback={<Spinner />}>
        <MembershipsList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};
export default MembershipsPage;
