import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserFromServerComponent } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export async function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const user = await getUserFromServerComponent();
  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

export default AuthLayout;
