import { Suspense } from "react";

import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/Spinner";
import OrganizationList from "@/features/organization/components/organization-list";

const OrganizationPage = () => {
  return (
    <div>
      <Heading title="Organization" description="All your organizations" />
      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;
