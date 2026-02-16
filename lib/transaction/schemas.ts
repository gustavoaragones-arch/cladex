import { z } from "zod";

const uuidSchema = z.string().uuid("Invalid ID format");

export const transactionIdSchema = uuidSchema;
export const taskIdSchema = uuidSchema;

export const advanceStageInputSchema = z.object({
  transactionId: transactionIdSchema,
});

export const toggleTaskInputSchema = z.object({
  taskId: taskIdSchema,
  completed: z.boolean(),
  transactionId: transactionIdSchema,
});

export const recalculateRiskInputSchema = z.object({
  transactionId: transactionIdSchema,
});
