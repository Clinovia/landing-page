// app/(auth)/layout.tsx
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  // Auth layout should ONLY wrap children — no <html> or <body>
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {children}
    </div>
  );
}