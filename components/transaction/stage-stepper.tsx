"use client";

import { TRANSACTION_STAGES } from "@/lib/transaction-engine";

type StageStepperProps = {
  current: string;
  status: string;
};

export function StageStepper({ current, status }: StageStepperProps) {
  const idx = TRANSACTION_STAGES.indexOf(current as (typeof TRANSACTION_STAGES)[number]);
  const isCancelled = status === "cancelled" || current === "cancelled";

  return (
    <div>
      <h2 className="text-sm font-medium text-foreground mb-2">Stage</h2>
      <div className="flex flex-wrap gap-2">
        {TRANSACTION_STAGES.map((stage, i) => {
          const passed = i < idx;
          const active = stage === current;
          return (
            <span
              key={stage}
              data-active={active}
              data-passed={passed}
              className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-muted text-muted-foreground data-[passed=true]:bg-primary/10 data-[passed=true]:text-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
            >
              {stage.replace(/_/g, " ")}
              {i < TRANSACTION_STAGES.length - 1 && (
                <span className="ml-1 opacity-50">→</span>
              )}
            </span>
          );
        })}
      </div>
      {isCancelled && (
        <p className="mt-1 text-sm text-muted-foreground">Transaction cancelled.</p>
      )}
    </div>
  );
}
