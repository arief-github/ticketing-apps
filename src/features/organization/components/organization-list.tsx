import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
} from "lucide-react";
import Link from "next/link";

import { OrganizationDeleteButton } from "@/components/shared/OrganizationDeleteButton";
import { OrganizationSwitchButton } from "@/components/shared/OrganizationSwitchButton";
import { SubmitButton } from "@/components/shared/SubmitButton";
import Table from "@/components/shared/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { MembershipDeleteButton } from "@/features/memberships/components/membership-delete-button";
import { membershipsPath } from "@/paths";

import { getOrganizationByUser } from "../queries/get-organization-by-user";

const OrganizationList = async ({
  limitedAccess,
}: {
  limitedAccess: boolean;
}) => {
  const organizations = await getOrganizationByUser();

  const theadItem = ["ID", "Name", "Joined At", "Members", ""];

  const hasActive = organizations.some((org) => {
    return org.membershipByUser.isActive;
  });

  const renderTbody = organizations.map((org) => {
    const isActive = org.membershipByUser.isActive;

    const switchButton = (
      <OrganizationSwitchButton
        organizationId={org.id}
        trigger={
          <SubmitButton
            icon={<LucideArrowLeftRight />}
            label={!hasActive ? "Activate" : isActive ? "Active" : "Switch"}
            variant={
              !hasActive ? "secondary" : isActive ? "default" : "outline"
            }
          />
        }
      />
    );

    const detailButton = (
      <Button variant="outline" size="icon">
        <Link href={membershipsPath(org.id)}>
          <LucideArrowUpRightFromSquare className="w-4 h-4" />
        </Link>
      </Button>
    );

    const editButton = (
      <Button variant="outline" size="icon">
        <LucidePen className="w-4 h-4" />
      </Button>
    );

    const leaveButton = (
      <MembershipDeleteButton
        organizationId={org.id}
        userId={org.membershipByUser.userId}
      />
    );

    const deleteButton = <OrganizationDeleteButton organizationId={org.id} />;

    const buttons = (
      <div className="gap-x-2 flex">
        {switchButton}

        {/* {limitedAccess ? null : detailButton}
         */}
        {detailButton}
        {limitedAccess ? null : editButton}
        {leaveButton}
        {limitedAccess ? null : deleteButton}
      </div>
    );

    return (
      <TableRow key={org.id}>
        <TableCell>{org.id}</TableCell>
        <TableCell>{org.name}</TableCell>
        <TableCell>
          {format(org.membershipByUser.joinedAt, "yyyy-MM-dd, HH:mm")}
        </TableCell>
        <TableCell>{org._count.memberships}</TableCell>
        <TableCell>{buttons}</TableCell>
      </TableRow>
    );
  });

  return (
    <div className="animate-fade-from-top">
      <Table tableHead={theadItem} tableBody={renderTbody} />
    </div>
  );
};

export default OrganizationList;
