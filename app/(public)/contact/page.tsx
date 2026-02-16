import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          Contact
        </h1>
        <p className="mt-4 text-muted-foreground">
          Get in touch for questions or partnerships.
        </p>
        <p className="mt-6 text-muted-foreground">
          Contact form coming soon. Email us at{" "}
          <a href="mailto:hello@cladex.io" className="text-primary hover:underline">
            hello@cladex.io
          </a>
          .
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button variant="outline">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
