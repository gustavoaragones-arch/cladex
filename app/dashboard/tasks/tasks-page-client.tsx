"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleTask } from "@/app/dashboard/transactions/[id]/actions";

type TaskWithTx = {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  completed: boolean;
  transactionId: string;
};

type Group = {
  stage: string;
  stageLabel: string;
  tasks: TaskWithTx[];
};

type TasksPageClientProps = {
  tasksByStage: Group[];
};

export function TasksPageClient({ tasksByStage }: TasksPageClientProps) {
  const [toggling, setToggling] = useState<string | null>(null);
  const router = useRouter();

  async function handleToggle(taskId: string, completed: boolean, transactionId: string) {
    setToggling(taskId);
    const result = await toggleTask(taskId, completed, transactionId);
    setToggling(null);
    if (result.ok) router.refresh();
  }

  if (tasksByStage.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
        No tasks yet. Tasks are created when you advance transaction stages.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tasksByStage.map((group) => (
        <div key={group.stage} className="rounded-lg border border-border p-4">
          <h2 className="mb-3 text-sm font-medium text-foreground">{group.stageLabel}</h2>
          <ul className="space-y-2">
            {group.tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-start gap-3 rounded-md bg-muted/30 px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) =>
                    handleToggle(task.id, e.target.checked, task.transactionId)
                  }
                  disabled={toggling === task.id}
                  className="mt-1.5 h-4 w-4 rounded border-input accent-primary"
                />
                <div className="flex-1 min-w-0">
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
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  )}
                  {task.due_date && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Due {task.due_date}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
