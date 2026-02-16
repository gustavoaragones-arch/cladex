import { cn } from "@/lib/utils";

type TrustNoticeProps = {
  message?: "workflow" | "legal" | "broker";
  className?: string;
};

const MESSAGES = {
  workflow: "Structured workflow software.",
  legal: "Not legal advice.",
  broker: "Not a broker.",
} as const;

/** Place sparingly. Use on key pages only. */
export function TrustNotice({ message = "workflow", className }: TrustNoticeProps) {
  return (
    <p className={cn("text-xs text-muted-foreground/80", className)}>
      {MESSAGES[message]}
    </p>
  );
}
