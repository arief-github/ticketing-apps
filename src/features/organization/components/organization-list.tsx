import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
  LucideTrash,
} from "lucide-react";

import { OrganizationSwitchButton } from "@/components/shared/OrganizationSwitchButton";
import { SubmitButton } from "@/components/shared/SubmitButton";
import Table from "@/components/shared/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { getOrganizationByUser } from "../queries/get-organization-by-user";

const OrganizationList = async () => {
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
        <LucideArrowUpRightFromSquare className="w-4 h-4" />
      </Button>
    );

    const editButton = (
      <Button variant="outline" size="icon">
        <LucidePen className="w-4 h-4" />
      </Button>
    );

    const deleteButton = (
      <Button variant="destructive" size="icon">
        <LucideTrash className="w-4 h-4" />
      </Button>
    );

    const buttons = (
      <div className="gap-x-2 flex">
        {switchButton}
        {detailButton}
        {editButton}
        {deleteButton}
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
