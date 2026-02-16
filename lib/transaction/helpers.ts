/**
 * Reusable transaction helpers.
 * No internal stage mapping exposed — use for display only.
 */

/** Format stage for display (e.g. "under_contract" → "Under contract") */
export function formatStageLabel(stage: string): string {
  return stage.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
