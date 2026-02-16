/**
 * Stage configuration.
 * Extensible: add prerequisites, conditional branching, state-specific logic.
 * Keep stage logic configurable for future: AI suggestions, deadline gen, email reminders.
 */

import type { TransactionStage } from "./types";

export type TaskTemplate = {
  title: string;
  description: string | null;
  /** Default due date offset in days from stage change. Omit for no default. */
  dueOffsetDays?: number;
};

/** Stage → task mapping. Extend for conditional branching (buyer vs seller). */
export const stageTaskMap: Record<TransactionStage, TaskTemplate[]> = {
  intake: [
    { title: "Complete property details", description: "Address, estimated value, mortgage balance" },
    { title: "Verify ownership", description: "Confirm you own or have authority over the property" },
    { title: "Select transaction role", description: "Buyer, seller, or both" },
  ],
  listing: [
    { title: "Set listing price", description: "Based on comparable sales and market analysis", dueOffsetDays: 3 },
    { title: "Prepare property disclosures", description: "Required seller disclosures for your state", dueOffsetDays: 7 },
    { title: "Upload listing photos", description: "High-quality photos for marketing", dueOffsetDays: 5 },
  ],
  offer: [
    { title: "Review offer terms", description: "Price, contingencies, closing timeline", dueOffsetDays: 1 },
    { title: "Document financing type", description: "Cash, conventional, FHA, etc." },
    { title: "Confirm contingencies", description: "Inspection, appraisal, financing contingencies", dueOffsetDays: 2 },
  ],
  under_contract: [
    { title: "Execute purchase agreement", description: "Signed contract with all parties", dueOffsetDays: 3 },
    { title: "Open escrow", description: "Escrow instructions and deposit", dueOffsetDays: 5 },
    { title: "Schedule inspections", description: "Coordinate inspection dates", dueOffsetDays: 7 },
  ],
  due_diligence: [
    { title: "Complete inspection", description: "Professional inspection report", dueOffsetDays: 10 },
    { title: "Review appraisal", description: "Lender appraisal results", dueOffsetDays: 14 },
    { title: "Address contingencies", description: "Resolve or waive contingencies", dueOffsetDays: 17 },
  ],
  closing: [
    { title: "Final walkthrough", description: "Verify property condition before closing", dueOffsetDays: 1 },
    { title: "Review closing disclosure", description: "CD and final numbers", dueOffsetDays: 3 },
    { title: "Schedule closing", description: "Date, time, and location", dueOffsetDays: 0 },
  ],
  closed: [
    { title: "Record deed", description: "Deed recorded with county" },
    { title: "Disburse funds", description: "Escrow disbursement complete" },
    { title: "Transfer keys", description: "Possession transferred" },
  ],
};
