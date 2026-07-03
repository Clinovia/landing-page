// app/mci-screening/layout.tsx
import Topbar from "@/components/layout/Topbar";
import { MCIScreeningResultsProvider } from "@/context/MCIScreeningContext";

export default function MCIScreeningLayout({ children }: { children: React.ReactNode }) {
  return (
    <MCIScreeningResultsProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </MCIScreeningResultsProvider>
  );
}