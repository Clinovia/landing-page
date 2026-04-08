import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">
          Checkout Cancelled
        </h1>

        <p className="text-muted-foreground mb-6">
          No worries—your plan hasn’t changed. You can upgrade anytime when you're ready.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/pricing">
            <Button>View Pricing</Button>
          </Link>

          <Link href="/protected">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}