import { Suspense } from "react";
import MinimalSignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <MinimalSignupForm />
    </Suspense>
  );
}