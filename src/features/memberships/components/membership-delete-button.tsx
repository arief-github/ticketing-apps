"use client";

import { LucideLoaderCircle, LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

import { deleteMemberships } from "../actions/delete-memberships";

type MembershipDeleteButtonProps = {
  userId: string;
  organizationId: string;
};

const MembershipDeleteButton = ({
  userId,
  organizationId,
}: MembershipDeleteButtonProps) => {
  const router = useRouter();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteMemberships.bind(null, {
      userId,
      organizationId,
    }),
    trigger: (isLoading) =>
      isLoading ? (
        <Button variant="destructive" size="icon">
          <LucideLoaderCircle className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="destructive" size="icon">
          <LucideLogOut className="w-4 h-4" />
        </Button>
      ),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
};

export { MembershipDeleteButton };
