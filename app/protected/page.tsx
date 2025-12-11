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
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function ProtectedDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Create Supabase browser client
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }

    checkAuth();
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
      <h1 className="text-3xl font-bold mb-8">Welcome to the Dashboard</h1>

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
            <CardContent>
              <p>Explore ASCVD, EF prediction, BP categories, and more.</p>
            </CardContent>
          </Card>
        </Link>

        {/* Neurology */}
        <Link href="/protected/alzheimer" className="no-underline">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Neurology</CardTitle>
              <CardDescription>
                Access neurology modules and resources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore stroke, epilepsy, and other neurology topics.</p>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  );
}
