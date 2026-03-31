"use client";

import { useParams, usePathname } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { invitationsPath, membershipsPath, organizationPath } from "@/paths";

const OrganizationBreadcrumbs = () => {
  const pathname = usePathname();
  const params = useParams<{ organizationId: string }>();

  const title = {
    memberships: "Memberships" as const,
    invitations: "Invitations" as const,
  }[pathname.split("/").at(-1) as "memberships" | "invitations"];

  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: "Organizations", href: organizationPath() },
        {
          title,
          dropdown: [
            {
              title: "Memberships",
              href: membershipsPath(params.organizationId),
            },
            {
              title: "Invitations",
              href: invitationsPath(params.organizationId),
            },
          ],
        },
      ]}
    />
  );
};

export { OrganizationBreadcrumbs };
