import AuthLayout from "@/components/AuthLayout";
import ForgotPassword from "@/components/ForgotPassword";

export default async function LoginPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your @fisk.edu email to continue."
    >
      <ForgotPassword />
    </AuthLayout>
  );
}
