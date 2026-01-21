import { LucideBan, LucideCheck } from "lucide-react";

import Table from "@/components/shared/Table";
import { TableCell, TableRow } from "@/components/ui/table";

import { getMemberships } from "../queries/get-memberships";
import { MembershipDeleteButton } from "./membership-delete-button";

type MembershipsListProps = {
  organizationId: string;
};

export const MembershipsList = async ({
  organizationId,
}: MembershipsListProps) => {
  const memberships = await getMemberships(organizationId);

  const theadItem = ["Username", "Email", "Verified Email", ""];

  const renderTbody = memberships.map((membership) => {
    const deleteButton = (
      <MembershipDeleteButton
        organizationId={membership.organizationId}
        userId={membership.userId}
      />
    );

    const buttons = <div className="gap-x-2 flex">{deleteButton}</div>;

    return (
      <TableRow key={membership.userId}>
        <TableCell>{membership.user.username}</TableCell>
        <TableCell>{membership.user.email}</TableCell>
        <TableCell>
          {membership.user.emailVerified ? <LucideCheck /> : <LucideBan />}
        </TableCell>
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
