import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Create an Account</h1>
      <SignupForm />
    </div>
  );
}
