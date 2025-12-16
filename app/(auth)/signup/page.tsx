// app/auth/signup/page.tsx
'use client';

import { useState, useEffect } from 'react';
import MinimalSignupForm from '@/features/auth/components/SignupForm';

export default function SignupPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ⚠️ Server and first client render: show static placeholder
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="space-y-4 max-w-md mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
            ))}
            <div className="h-12 bg-blue-500 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // ✅ After hydration: render real form
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <MinimalSignupForm />
      </div>
    </div>
  );
}