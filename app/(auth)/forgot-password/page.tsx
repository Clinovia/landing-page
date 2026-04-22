import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">비밀번호를 잊으셨나요</h1>
      <p className="text-gray-600 mb-6">
        이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
      </p>

      <ForgotPasswordForm />
    </div>
  );
}