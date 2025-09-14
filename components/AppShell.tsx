import Footer from "./Footer";
import TopNav from "./TopNav";
import { getUserFromServerComponent } from "@/lib/auth-server";
import { redirect } from "next/navigation";

async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getUserFromServerComponent();
  if (!user) redirect("/login");
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <TopNav user={user} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default AppShell;
