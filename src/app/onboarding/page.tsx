import { CardFormTicket } from "@/components/composition/CardFormTicket";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { OrganizationCreateForm } from "@/features/organization/components/organization-create-form";

const OnboardingPage = async () => {
  await getAuthOrRedirect({
    checkOrganization: false,
  });

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardFormTicket
        title="Create Organization"
        description="Create your organization to start using ticketing apps"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default OnboardingPage;
