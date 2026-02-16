"use client";

type StageProgressBarProps = {
  progressPercent: number;
  currentStageLabel: string;
  isCancelled: boolean;
};

export function StageProgressBar({
  progressPercent,
  currentStageLabel,
  isCancelled,
}: StageProgressBarProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-foreground mb-2">Stage</h2>
      <div className="flex items-center gap-2">
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 flex-1 rounded-full bg-muted overflow-hidden"
        >
          <div
            className="h-full bg-primary transition-[width]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground tabular-nums">{progressPercent}%</span>
      </div>
      <p className="mt-1 text-sm text-foreground">{currentStageLabel}</p>
      {isCancelled && (
        <p className="mt-1 text-sm text-muted-foreground">Transaction cancelled.</p>
      )}
    </div>
  );
}
