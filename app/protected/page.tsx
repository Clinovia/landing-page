// app/protected/page.tsx (or wherever this component lives)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
// ✅ Import the singleton client instead of creating a new one
import { supabase } from "@/lib/supabaseClient";

export default function ProtectedDashboard() {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (error) {
          console.error("Auth check failed:", error);
          router.replace("/login");
          return;
        }

        if (!data.session) {
          router.replace("/login");
          return;
        }

        setSessionChecked(true);
      } catch (err) {
        if (!isMounted) return;
        console.error("Unexpected auth error:", err);
        router.replace("/login");
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">
        Welcome to Clinovia-Saas, a research use only tool for clinicians and researchers
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/protected/cardiology" className="no-underline">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Cardiology</CardTitle>
              <CardDescription>
                Access cardiology modules and resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>ASCVD:</strong> Calculate 10-year ASCVD risk.</p>
              <p><strong>BP Category:</strong> Classify blood pressure.</p>
              <p><strong>CHA₂DS₂-VASc:</strong> Stroke risk assessment.</p>
              <p><strong>ECG Interpreter:</strong> Automated ECG insights.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/protected/alzheimer" className="no-underline">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Neurology</CardTitle>
              <CardDescription>
                Alzheimer&apos;s Disease prediction tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Diagnosis Basic</strong></p>
              <p><strong>Diagnosis Extended</strong></p>
              <p><strong>Diagnosis Screening</strong></p>
              <p><strong>Prognosis 2yr Basic</strong></p>
              <p><strong>Prognosis 2yr Extended</strong></p>
              <p><strong>Risk Screener</strong></p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}