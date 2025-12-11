import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
      <p className="text-gray-600 mb-6">
        Enter your email and we’ll send you a password reset link.
      </p>

      <ForgotPasswordForm />
    </div>
  );
}
