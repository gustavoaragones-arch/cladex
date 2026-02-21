"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleTask } from "@/app/dashboard/transactions/[id]/actions";

type TaskRow = {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  completed: boolean;
};

type TaskListProps = {
  tasks: TaskRow[];
  transactionId: string;
  onToggleTask: typeof toggleTask;
};

export function TaskList({ tasks, transactionId, onToggleTask }: TaskListProps) {
  const [toggling, setToggling] = useState<string | null>(null);
  const router = useRouter();

  async function handleToggle(taskId: string, completed: boolean) {
    setToggling(taskId);
    const result = await onToggleTask(taskId, completed, transactionId);
    setToggling(null);
    if (result.ok) router.refresh();
  }

  if (tasks.length === 0) {
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
      <ul className="space-y-2">
        {tasks.map((task) => (
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
                  task.completed ? "text-muted-foreground line-through" : "text-foreground"
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
  );
}
