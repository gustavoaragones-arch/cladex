"use client";

type RiskRadarProps = {
  score: number;
};

export function RiskRadar({ score }: RiskRadarProps) {
  const level =
    score >= 70 ? "high" : score >= 40 ? "medium" : "low";

  return (
    <div>
      <h2 className="text-sm font-medium text-foreground mb-2">Risk Score</h2>
      <p className="mb-2 text-xs text-muted-foreground max-w-xl">
        Risk indicators are generated algorithmically based on available inputs. Always confirm
        with licensed professionals where required.
      </p>
      <div className="flex items-center gap-2">
        <div
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 flex-1 rounded-full bg-muted overflow-hidden"
        >
          <div
            className={`h-full transition-[width] ${
              level === "high"
                ? "bg-destructive"
                : level === "medium"
                  ? "bg-amber-500"
                  : "bg-primary"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm font-medium tabular-nums">{score}/100</span>
      </div>
    </div>
  );
}
