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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ProtectedDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        router.push("/");
        return;
      }

      setLoading(false);
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  if (loading) {
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
        {/* Cardiology */}
        <Link href="/protected/cardiology" className="no-underline">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Cardiology</CardTitle>
              <CardDescription>
                Access cardiology modules and resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>ASCVD:</strong> Calculate 10-year atherosclerotic cardiovascular disease risk.</p>
              <p><strong>BP Category:</strong> Classify blood pressure and guide management.</p>
              <p><strong>CHA₂DS₂-VASc:</strong> Stroke risk assessment in atrial fibrillation.</p>
              <p><strong>ECG Interpreter:</strong> Automated ECG reading and insights.</p>
            </CardContent>
          </Card>
        </Link>

        {/* Neurology */}
        <Link href="/protected/alzheimer" className="no-underline">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Neurology</CardTitle>
              <CardDescription>
                Access neurology modules and Alzheimer's Disease prediction tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Diagnosis Basic:</strong> Initial diagnostic model trained on ADNI data.</p>
              <p><strong>Diagnosis Extended:</strong> Advanced diagnostic insights from multi-modal ADNI features.</p>
              <p><strong>Diagnosis Screening:</strong> Quick screening tool for early detection of AD symptoms.</p>
              <p><strong>Prognosis 2yr Basic:</strong> Predict 2-year progression risk using ML models trained on ADNI data.</p>
              <p><strong>Prognosis 2yr Extended:</strong> Enhanced 2-year prognosis using extended ADNI features.</p>
              <p><strong>Risk Screener:</strong> Identify individuals at high risk for Alzheimer's Disease.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
