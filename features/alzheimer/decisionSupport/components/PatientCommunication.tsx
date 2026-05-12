"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { PatientCommunicationProps } from "../types";

export function PatientCommunication({
  context,
  data,
  isLoading,
  error,
  onRefresh,
}: PatientCommunicationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!data?.message) return;
    try {
      await navigator.clipboard.writeText(data.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available — silently ignore
    }
  };

  /* Derive a reading-level badge from message length as a rough proxy */
  const readingLevel =
    !data
      ? null
      : data.message.split(" ").length < 80
      ? { label: "Concise", variant: "outline" as const }
      : data.message.split(" ").length < 160
      ? { label: "Standard", variant: "secondary" as const }
      : { label: "Detailed", variant: "default" as const };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Patient Communication
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              Plain-language explanation suitable for sharing with the patient or family
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {readingLevel && (
              <Badge variant={readingLevel.variant} className="text-xs">
                {readingLevel.label}
              </Badge>
            )}
            {onRefresh && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
                className="text-xs"
              >
                {isLoading ? <LoadingSpinner className="w-3 h-3" /> : "↻ Refresh"}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4 space-y-4">
        {isLoading && (
          <div className="flex items-center gap-3 py-6 justify-center text-muted-foreground">
            <LoadingSpinner className="w-3 h-3" />
            <span className="text-sm">Composing patient message…</span>
          </div>
        )}

        {!isLoading && error && <ErrorMessage message={error} />}

        {!isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-sm text-muted-foreground">No communication draft generated yet.</p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>
                Generate Message
              </Button>
            )}
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-4">
            {/* Message body */}
            <div className="relative rounded-lg border border-border bg-muted/30 p-4">
              {/* Decorative quote mark */}
              <span
                className="absolute top-2 left-3 text-4xl leading-none text-muted-foreground/20 font-serif select-none"
                aria-hidden
              >
                "
              </span>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap pl-4">
                {data.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="text-xs"
              >
                {copied ? "✓ Copied" : "Copy to Clipboard"}
              </Button>
              <p className="text-xs text-muted-foreground ml-auto">
                Review before sharing. This message is AI-generated and should be adapted by the treating clinician.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}