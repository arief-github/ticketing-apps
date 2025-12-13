import AccountTabs from "@/app/(authenticated)/account/_navigation/account-tabs";
import Heading from "@/components/shared/Heading";

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
