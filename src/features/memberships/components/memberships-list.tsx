import { LucideBan, LucideCheck, LucidePen, LucideTrash } from "lucide-react";

import Table from "@/components/shared/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { getMemberships } from "../queries/get-memberships";

type MembershipsListProps = {
  organizationId: string;
};

export const MembershipsList = async ({
  organizationId,
}: MembershipsListProps) => {
  const memberships = await getMemberships(organizationId);

  const theadItem = ["Username", "Email", "Verified Email", ""];

  const renderTbody = memberships.map((membership) => {
    const editButton = (
      <Button variant="outline" size="icon">
        <LucidePen className="w-4 h-4" />
      </Button>
    );

    const deleteButton = (
      <Button variant="outline" size="icon">
        <LucideTrash className="w-4 h-4" />
      </Button>
    );

    const buttons = (
      <div className="gap-x-2 flex">
        {editButton}
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
