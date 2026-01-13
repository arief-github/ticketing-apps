import { format } from "date-fns";

import { getOrganizationByUser } from "../queries/get-organization-by-user";

const OrganizationList = async () => {
  const organizations = await getOrganizationByUser();

  return (
    <div className="animate-fade-from-top">
      {organizations.map((organization) => (
        <div key={organization.id}>
          <div>Name: {organization.name}</div>
          <div>
            Joined At:{" "}
            {format(
              organization.membershipByUser.joinedAt,
              "yyyy-MM-dd, HH:mm"
            )}
          </div>
          <div>Members: {organization._count.memberships}</div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationList;
