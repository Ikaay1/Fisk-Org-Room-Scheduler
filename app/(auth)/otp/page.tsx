import AuthLayout from "@/components/AuthLayout";
import Otp from "@/components/Otp";

export default async function OtpPage({
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
      <Otp />
    </AuthLayout>
  );
}
