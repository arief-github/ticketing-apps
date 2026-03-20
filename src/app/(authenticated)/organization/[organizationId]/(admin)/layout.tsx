import React from "react";

import { getAdminOrRedirect } from "@/features/memberships/queries/get-admin-or-redirect";

export default async function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ organizationId: string }>;
}>) {
  const { organizationId } = await params;

  await getAdminOrRedirect(organizationId);

  return <>{children}</>;
}
