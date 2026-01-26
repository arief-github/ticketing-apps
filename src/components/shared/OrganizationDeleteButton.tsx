"use client";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteOrganization } from "@/features/organization/actions/delete-organization";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

type OrganizationDeleteButtonProps = {
  organizationId: string;
};

const OrganizationDeleteButton = ({
  organizationId,
}: OrganizationDeleteButtonProps) => {
  const handleDelete = async () => {
    const result = await deleteOrganization(organizationId);

    if (result.status === "SUCCESS" && result.message) {
      toast.success(result.message);
    }

    return result;
  };

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: handleDelete,
    trigger: (isPending) => (
      <Button variant="destructive">
        {isPending ? (
          <LucideLoaderCircle className="animate-spin" />
        ) : (
          <LucideTrash />
        )}
      </Button>
    ),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { OrganizationDeleteButton };
