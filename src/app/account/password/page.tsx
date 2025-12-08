import Heading from "@/components/shared/Heading";
import AccountTabs from "@/features/account/components/account-tabs";

const PasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="All your password information"
        tabs={<AccountTabs />}
      />
    </div>
  );
};

export default PasswordPage;
