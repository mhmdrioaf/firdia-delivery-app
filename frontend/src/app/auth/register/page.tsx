import AuthForm from "@/components/forms/AuthForm";
import { AuthType } from "@/lib/api/auth-type";

export default function RegisterPage() {
  return (
    <div className="container w-full min-h-svh flex items-center justify-center p-2 md:p-0">
      <AuthForm action={AuthType.Register} />
    </div>
  );
}
