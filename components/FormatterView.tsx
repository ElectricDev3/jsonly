"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { JsonEditor } from "./JsonEditor";
import { JsonTreeView } from "./JsonTreeView";
import { ValidationError } from "./ValidationError";
import { Button } from "./ui/Button";
import { parseJson, formatJson, minifyJson } from "@/lib/jsonFormat";
import { SAMPLE_JSON } from "@/lib/samples";
import type { JsonValue } from "@/lib/types";

type ViewMode = "tree" | "formatted" | "minified";

export function FormatterView() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState(2);
  const [mode, setMode] = useState<ViewMode>("tree");
  const [copied, setCopied] = useState(false);

  const { value, error } = useMemo(() => parseJson(input), [input]);

  const output = useMemo(() => {
    if (error) return "";
    if (mode === "minified") return minifyJson(value);
    if (mode === "formatted") return formatJson(value, indent);
    return "";
  }, [value, error, mode, indent]);

  async function handleCopy() {
    const text = mode === "tree" ? formatJson(value, indent) : output;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Entrada</p>
        <JsonEditor
          value={input}
          onChange={setInput}
          rows={16}
          onLoadSample={() => setInput(SAMPLE_JSON)}
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1 rounded-md bg-slate-100 p-1">
            {(["tree", "formatted", "minified"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                disabled={!!error}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  mode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {m === "tree" ? "Árbol" : m === "formatted" ? "Formateado" : "Minificado"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mode === "formatted" && (
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 focus:border-slate-500 focus:outline-none"
              >
                <option value={2}>2 espacios</option>
                <option value={4}>4 espacios</option>
              </select>
            )}
            <Button type="button" variant="secondary" onClick={handleCopy} disabled={!!error}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copiado" : "Copiar"}
            </Button>
          </div>
        </div>

        {error ? (
          <ValidationError error={error} text={input} />
        ) : mode === "tree" ? (
          <JsonTreeView value={value as JsonValue} />
        ) : (
          <pre className="max-h-[28rem] overflow-auto rounded-md bg-slate-50 p-3 font-mono text-xs leading-relaxed text-slate-800">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
}
