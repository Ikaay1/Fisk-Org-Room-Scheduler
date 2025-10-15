import AuthLayout from "@/components/AuthLayout";
import ChangePassword from "@/components/ChangePassword";

export default async function SignupPage() {
  return (
    <AuthLayout title="Change Password" subtitle="Enter your new password">
      <ChangePassword />
    </AuthLayout>
  );
}
