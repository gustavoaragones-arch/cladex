import Link from "next/link";
import { AuthFooter } from "@/components/layout/auth-footer";
import { SignupForm } from "./signup-form";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            Cladex
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Create account</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Email and password or continue with Google.
            </p>
          </div>
          <SignupForm />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
