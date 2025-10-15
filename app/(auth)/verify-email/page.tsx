import AuthLayout from "@/components/AuthLayout";
import VerifyEmail from "@/components/VerifyEmail";

export default async function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  return (
    <AuthLayout
      title="Enter OTP"
      subtitle={`We sent a 6-digit code to ${params.email || "your email"}.`}
    >
      <VerifyEmail />
    </AuthLayout>
  );
}
