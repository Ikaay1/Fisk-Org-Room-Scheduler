"use client";

import React from "react";
import AuthLayout from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { isFiskEmail } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { safeFetch } from "@/helpers/utils";

const Login = () => {
  const r = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canSubmit = isFiskEmail(email) && password.length >= 8;

  async function submit() {
    setError(null);
    if (!canSubmit) return;
    setLoading(true);
    try {
      await safeFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      r.push("/");
    } catch (e: any) {
      setError(e?.message || "Could not send OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Log in" subtitle="Use your @fisk.edu email to continue.">
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
          {password && password.length < 8 && (
            <p className="text-xs text-red-600">Minimum 8 characters.</p>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button
          className="w-full"
          disabled={!canSubmit || loading}
          onClick={submit}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Login
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          New here?{" "}
          <a className="underline" href="/signup">
            Create an account
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
