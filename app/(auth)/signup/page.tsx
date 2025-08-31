"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { isFiskEmail } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";

export default function SignupPage() {
  const r = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canSubmit =
    isFiskEmail(email) && password.length >= 8 && password === confirm;

  async function submit() {
    setError(null);
    if (!canSubmit) return;
    setLoading(true);
    try {
      // (Optionally call /api/auth/signup to create account here)
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to send OTP");
      r.push(`/otp?email=${encodeURIComponent(email)}`);
    } catch (e: any) {
      setError(e?.message || "Could not send OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Sign up"
      subtitle="Use your @fisk.edu email to create an account."
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@fisk.edu"
          />
          {!email ? null : isFiskEmail(email) ? (
            <p className="text-xs text-emerald-600">
              Looks good — Fisk domain.
            </p>
          ) : (
            <p className="text-xs text-red-600">
              Email must end with fisk.edu.
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Confirm password</Label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
          />
          {confirm && confirm !== password && (
            <p className="text-xs text-red-600">Passwords do not match.</p>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button
          className="w-full"
          disabled={!canSubmit || loading}
          onClick={submit}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Create
          account & send OTP
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <a className="underline" href="/login">
            Log in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
