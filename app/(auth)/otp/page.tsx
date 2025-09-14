import AuthLayout from "@/components/AuthLayout";
import Otp from "@/components/Otp";

export default async function OtpPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  return (
    <AuthLayout
      title="Enter OTP"
      subtitle={`We sent a 6-digit code to ${
        searchParams.email || "your email"
      }.`}
    >
      <Otp />
    </AuthLayout>
  );
}
