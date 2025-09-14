import AuthLayout from "@/components/AuthLayout";
import Signup from "@/components/Signup";

export default async function SignupPage() {
  return (
    <AuthLayout
      title="Sign up"
      subtitle="Use your @fisk.edu email to create an account."
    >
      <Signup />
    </AuthLayout>
  );
}
