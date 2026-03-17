import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}
