import { Suspense } from "react";

import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/Spinner";
import { InvitationList } from "@/features/invitations/components/invitation-list";

import { OrganizationBreadcrumbs } from "../_navigation/tabs";

type InvitationsPageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

const InvitationPage = async ({ params }: InvitationsPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Invitations"
        description="Manage your organization's invitations."
        tabs={<OrganizationBreadcrumbs />}
      />

      <Suspense fallback={<Spinner />}>
        <InvitationList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default InvitationPage;
