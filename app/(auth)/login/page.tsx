import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <LoginForm />
    </div>
  );
}

