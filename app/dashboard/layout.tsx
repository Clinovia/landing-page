// app/dashboard/layout.tsx
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}