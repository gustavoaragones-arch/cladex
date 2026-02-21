"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DOC_TYPES = [
  "contract",
  "inspection",
  "appraisal",
  "title",
  "disclosure",
  "other",
] as const;

export default function DocumentsPage() {
  const [docType, setDocType] = useState<string>("contract");
  const [, setFile] = useState<File | null>(null);
  const [signed, setSigned] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Documents</h1>
        <p className="mt-1 text-muted-foreground">
          Upload and manage transaction documents.
        </p>
      </div>

      <div className="max-w-xl space-y-4 rounded-lg border border-border p-6">
        <h2 className="text-sm font-medium text-foreground">Upload document</h2>
        <div className="space-y-2">
          <Label htmlFor="doc-type">Document type</Label>
          <select
            id="doc-type"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {DOC_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="file-upload">File</Label>
          <div className="flex items-center gap-2">
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="cursor-pointer"
            />
            <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="signed"
            checked={signed}
            onChange={(e) => setSigned(e.target.checked)}
            className="rounded border-input"
          />
          <Label htmlFor="signed" className="cursor-pointer text-sm">
            Signed
          </Label>
        </div>
        <Button disabled className="mt-2">
          Upload (placeholder)
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-medium text-foreground">Document list</h2>
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          <FileText className="mx-auto mb-2 h-8 w-8 opacity-50" />
          <p>No documents uploaded yet.</p>
          <p className="mt-1 text-xs">Uploaded documents will appear here with type, file name, and signed status.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
        <CheckCircle className="h-5 w-5 text-green-600 shrink-0" aria-hidden />
        <span className="text-sm text-muted-foreground">Signed</span>
        <Circle className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden />
        <span className="text-sm text-muted-foreground">Pending</span>
      </div>
    </div>
  );
}
