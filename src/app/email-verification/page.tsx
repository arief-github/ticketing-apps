import { CardFormTicket } from "@/components/composition/CardFormTicket";
import { EmailVerificationForm } from "@/features/auth/components/email-verification-form";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

const EmailVerificationPage = async () => {
  await getAuthOrRedirect({
    checkEmailVerified: false,
  });

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardFormTicket
        title="Verify Email"
        description="Please check your email for the verification code."
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<EmailVerificationForm />}
      />
    </div>
  );
};

export default EmailVerificationPage;
