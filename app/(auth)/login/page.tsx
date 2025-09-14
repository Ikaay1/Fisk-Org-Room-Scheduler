import AuthLayout from "@/components/AuthLayout";
import Login from "@/components/Login";

export default async function LoginPage() {
  return (
    <AuthLayout title="Log in" subtitle="Use your @fisk.edu email to continue.">
      <Login />
    </AuthLayout>
  );
}
