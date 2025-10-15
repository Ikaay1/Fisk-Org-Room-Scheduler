"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { isFiskEmail } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { safeFetch } from "@/helpers/utils";

export default function ChangePassword() {
  const r = useRouter();
  const sp = useSearchParams();
  const email = sp.get("email") || "";
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canSubmit =
    isFiskEmail(email) && password.length >= 8 && password === confirm && email;

  async function submit() {
    setError(null);
    if (!canSubmit) return;
    setLoading(true);
    try {
      await safeFetch("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ email, password, confirmPassword: confirm }),
      });
      r.push(`/`);
    } catch (e: any) {
      setError(e?.message || "Could not change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label>New Password</Label>
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
          type="submit"
          className="w-full"
          disabled={!canSubmit || loading}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Change
          Password
        </Button>
      </div>
    </form>
  );
}
