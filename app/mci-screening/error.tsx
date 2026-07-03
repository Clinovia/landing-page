'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MCIScreeningError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('MCI Screening module error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg bg-white p-8 shadow-xl">

          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="rounded-full bg-green-100 p-4">
                <Home className="h-16 w-16 text-[#1B4D3E]" />
              </div>
              <div className="absolute -bottom-2 -right-2 rounded-full bg-red-100 p-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
            MCI Screening Error
          </h1>

          {/* Description */}
          <p className="mb-6 text-center text-gray-600">
            We encountered an issue loading the clinical screening tool.
            Please try again or return to the home page.
          </p>

          {/* Dev Error */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-sm font-semibold text-gray-700">
                Error details:
              </p>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs text-gray-600">
                {error.message}
              </pre>
              {error.digest && (
                <p className="mt-2 text-xs text-gray-500">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#1B4D3E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#163d31] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </button>

            <Link
              href={ROUTES.MARKETING.HOME}
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Home className="h-4 w-4" />
              Go to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}