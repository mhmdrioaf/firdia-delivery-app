import AuthForm from "@/components/forms/AuthForm";
import { AuthType } from "@/lib/api/auth-type";

export default function LoginPage() {
  return (
    <div className="container w-full p-2 md:p-0 flex items-center justify-center min-h-svh">
      <AuthForm action={AuthType.Login} />
    </div>
  );
}
