// app/clinical/alzheimer/layout.tsx
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { StageResultsProvider } from "@/context/StageResultsContext";

export default function AlzheimerLayout({ children }: { children: React.ReactNode }) {
  return (
    <StageResultsProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </StageResultsProvider>
  );
}