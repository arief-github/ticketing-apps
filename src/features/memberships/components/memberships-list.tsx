import { LucideBan, LucideCheck } from "lucide-react";

import Table from "@/components/shared/Table";
import { TableCell, TableRow } from "@/components/ui/table";

import { getMemberships } from "../queries/get-memberships";
import { MembershipDeleteButton } from "./membership-delete-button";
import { MembershipMoreMenu } from "./membership-more-menu";

type MembershipsListProps = {
  organizationId: string;
};

export const MembershipsList = async ({
  organizationId,
}: MembershipsListProps) => {
  const memberships = await getMemberships(organizationId);

  const theadItem = ["Username", "Email", "Verified Email", "Role", ""];

  const renderTbody = memberships.map((membership) => {
    const moreMenu = (
      <MembershipMoreMenu
        organizationId={membership.organizationId}
        userId={membership.userId}
        membershipRole={membership.membershipRole}
      />
    );

    const deleteButton = (
      <MembershipDeleteButton
        organizationId={membership.organizationId}
        userId={membership.userId}
      />
    );

    const buttons = (
      <div className="gap-x-2 flex">
        {moreMenu}
        {deleteButton}
      </div>
    );

    return (
      <TableRow key={membership.userId}>
        <TableCell>{membership.user.username}</TableCell>
        <TableCell>{membership.user.email}</TableCell>
        <TableCell>
          {membership.user.emailVerified ? <LucideCheck /> : <LucideBan />}
        </TableCell>
        <TableCell>{membership.membershipRole}</TableCell>
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
