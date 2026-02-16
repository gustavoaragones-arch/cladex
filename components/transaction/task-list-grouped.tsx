"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { toggleTask } from "@/app/(dashboard)/dashboard/transactions/[id]/actions";
import type { TasksByStage } from "@/lib/transaction/types";

type TaskListGroupedProps = {
  tasksByStage: TasksByStage;
  transactionId: string;
  onToggleTask: typeof toggleTask;
};

export function TaskListGrouped({
  tasksByStage,
  transactionId,
  onToggleTask,
}: TaskListGroupedProps) {
  const [toggling, setToggling] = useState<string | null>(null);
  const router = useRouter();

  async function handleToggle(taskId: string, completed: boolean) {
    setToggling(taskId);
    const result = await onToggleTask(taskId, completed, transactionId);
    setToggling(null);
    if (result.ok) router.refresh();
  }

  if (tasksByStage.length === 0) {
    return (
      <div>
        <h2 className="text-sm font-medium text-foreground mb-2">Tasks</h2>
        <p className="text-sm text-muted-foreground">No tasks yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-medium text-foreground mb-2">Tasks</h2>
      <div className="space-y-4">
        {tasksByStage.map((group) => (
          <div key={group.stage}>
            <h3 className="text-xs font-medium text-muted-foreground mb-2">{group.stageLabel}</h3>
            <ul className="space-y-2">
              {group.tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => handleToggle(task.id, e.target.checked)}
                    disabled={toggling === task.id}
                    className="mt-1 rounded border-input"
                  />
                  <div>
                    <span
                      className={
                        task.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }
                    >
                      {task.title}
                    </span>
                    {task.description && (
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
