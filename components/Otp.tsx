"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { safeFetch } from "@/helpers/utils";

export default function Otp() {
  const r = useRouter();
  const sp = useSearchParams();
  const email = sp.get("email") || "";
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canSubmit = code.length === 6 && email;

  async function submit() {
    setError(null);
    if (!canSubmit) return;
    setLoading(true);
    try {
      await safeFetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, code }),
      });
      r.push("/");
    } catch (e: any) {
      setError(e?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label>6-digit code</Label>
        <Input
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={code}
          onChange={(e) =>
            setCode(e.target.value.replace(/\\D/g, "").slice(0, 6))
          }
          placeholder="123456"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button variant="outline" className="w-1/3" onClick={() => r.back()}>
          Back
        </Button>
        <Button
          className="w-2/3"
          disabled={!canSubmit || loading}
          onClick={submit}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Verify
        </Button>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!email) return;
          await safeFetch("/api/auth/request-otp", {
            method: "POST",
            body: JSON.stringify({ email }),
          });
        }}
      >
        <Button variant="link" type="submit" className="p-0 h-auto">
          Resend code
        </Button>
      </form>
    </div>
  );
}
