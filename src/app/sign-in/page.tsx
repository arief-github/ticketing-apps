import Link from "next/link";

import { CardFormTicket } from "@/components/composition/CardFormTicket";
import SignInForm from "@/features/auth/components/sign-in-form";
import { forgotPasswordPath, signUpPath } from "@/paths";

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardFormTicket
        title="Sign In"
        description="Sign in to your account"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>
            <Link
              className="text-sm text-muted-foreground"
              href={forgotPasswordPath()}
            >
              Forgot Password ?
            </Link>
          </>
        }
      />
    </div>
  );
};

export default SignInPage;
