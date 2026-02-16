/**
 * Group tasks by stage. Server-only — uses stage config.
 */

import type { TaskForDisplay, TasksByStage } from "./types";
import { TRANSACTION_STAGES } from "./types";
import { stageTaskMap } from "./config";
import { formatStageLabel } from "./helpers";

function inferStageForTask(title: string): string {
  for (const stage of TRANSACTION_STAGES) {
    const templates = stageTaskMap[stage];
    if (templates.some((t) => t.title === title)) return stage;
  }
  return "unknown";
}

export function groupTasksByStage(
  tasks: TaskForDisplay[]
): TasksByStage {
  const byStage = new Map<string, TaskForDisplay[]>();
  for (const stage of TRANSACTION_STAGES) {
    byStage.set(stage, []);
  }
  byStage.set("unknown", []);

  for (const task of tasks) {
    const stage = inferStageForTask(task.title);
    byStage.get(stage)?.push(task);
  }

  return TRANSACTION_STAGES.filter((s) => (byStage.get(s)?.length ?? 0) > 0).map((stage) => ({
    stage,
    stageLabel: formatStageLabel(stage),
    tasks: byStage.get(stage) ?? [],
  }));
}
