import { User } from "@/helpers/config";
import Footer from "./Footer";
import TopNav from "./TopNav";

function AppShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <TopNav user={user} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default AppShell;
