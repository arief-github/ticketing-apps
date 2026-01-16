import { CardFormTicket } from "@/components/composition/CardFormTicket";
import { OrganizationCreateForm } from "@/features/organization/components/organization-create-form";

const OrganizationCreatePage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardFormTicket
        title="Create Organization"
        description="Create a new organization for your team"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default OrganizationCreatePage;
