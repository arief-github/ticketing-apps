"use client";

import { CardFormTicket } from "@/components/composition/CardFormTicket";
import RequestPasswordChangeForm from "@/components/shared/RequestPasswordChangeForm";

const ForgotPasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardFormTicket
        title="Forgot Password"
        description="Forgot Your Password"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<RequestPasswordChangeForm />}
      />
    </div>
  );
};

export default ForgotPasswordPage;
