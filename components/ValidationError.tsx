import { AlertTriangle } from "lucide-react";
import { errorContext, type JsonParseError } from "@/lib/jsonFormat";

export function ValidationError({ error, text }: { error: JsonParseError; text: string }) {
  const context = error.position !== null ? errorContext(text, error.position) : null;

  return (
    <div className="rounded-sm border border-[var(--error-border)] bg-[var(--error-bg)] p-3.5 text-sm">
      <div className="flex items-start gap-2.5">
        <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[var(--error-text)]" />
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-data)] font-medium text-[var(--error-text)]">
            {error.line !== null ? `Línea ${error.line}, columna ${error.column}` : "JSON inválido"}
          </p>
          <p className="mt-0.5 text-[var(--text-muted)]">{error.message}</p>
          {context && (
            <pre className="mt-2.5 overflow-x-auto rounded-sm border border-[var(--line-soft)] bg-[var(--bg)] px-2.5 py-2 font-[family-name:var(--font-data)] text-xs text-[var(--text)]">
              {context.snippet}
              {"\n"}
              <span className="text-[var(--error-text)]">
                {" ".repeat(context.caretOffset)}
                {"^"}
              </span>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
