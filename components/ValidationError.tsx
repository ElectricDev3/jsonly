import { AlertTriangle } from "lucide-react";
import { errorContext, type JsonParseError } from "@/lib/jsonFormat";

export function ValidationError({ error, text }: { error: JsonParseError; text: string }) {
  const context = error.position !== null ? errorContext(text, error.position) : null;

  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      <div className="flex items-start gap-2">
        <AlertTriangle size={15} className="mt-0.5 shrink-0" />
        <div className="min-w-0">
          <p className="font-medium">
            {error.line !== null ? `Línea ${error.line}, columna ${error.column}` : "JSON inválido"}
          </p>
          <p className="mt-0.5 text-red-600">{error.message}</p>
          {context && (
            <pre className="mt-2 overflow-x-auto rounded bg-white px-2 py-1.5 font-mono text-xs text-slate-700">
              {context.snippet}
              {"\n"}
              {" ".repeat(context.caretOffset)}
              {"^"}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
