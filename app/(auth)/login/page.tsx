import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function LoginPage() {
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
            <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Use your email or continue with Google.
            </p>
          </div>
          <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}>
            <LoginForm />
          </Suspense>
          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center">
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/disclaimer">Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
}
