"use client";

import { useMemo, useState } from "react";
import { JsonEditor } from "./JsonEditor";
import { ValidationError } from "./ValidationError";
import { parseJson, formatJson } from "@/lib/jsonFormat";
import { diffLines } from "@/lib/diff";
import { SAMPLE_JSON, SAMPLE_JSON_B } from "@/lib/samples";

export function DiffView() {
  const [inputA, setInputA] = useState(SAMPLE_JSON);
  const [inputB, setInputB] = useState(SAMPLE_JSON_B);

  const parsedA = useMemo(() => parseJson(inputA), [inputA]);
  const parsedB = useMemo(() => parseJson(inputB), [inputB]);

  const diff = useMemo(() => {
    if (parsedA.error || parsedB.error) return null;
    const linesA = formatJson(parsedA.value, 2).split("\n");
    const linesB = formatJson(parsedB.value, 2).split("\n");
    return diffLines(linesA, linesB);
  }, [parsedA, parsedB]);

  const stats = useMemo(() => {
    if (!diff) return null;
    const added = diff.filter((d) => d.type === "add").length;
    const removed = diff.filter((d) => d.type === "remove").length;
    return { added, removed };
  }, [diff]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5">
          <p className="mb-2.5 font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.16em] text-[var(--text-dim)]">
            JSON A
          </p>
          <JsonEditor value={inputA} onChange={setInputA} rows={10} onLoadSample={() => setInputA(SAMPLE_JSON)} />
          {parsedA.error && <div className="mt-2"><ValidationError error={parsedA.error} text={inputA} /></div>}
        </div>
        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5">
          <p className="mb-2.5 font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.16em] text-[var(--text-dim)]">
            JSON B
          </p>
          <JsonEditor value={inputB} onChange={setInputB} rows={10} onLoadSample={() => setInputB(SAMPLE_JSON_B)} />
          {parsedB.error && <div className="mt-2"><ValidationError error={parsedB.error} text={inputB} /></div>}
        </div>
      </div>

      {diff && (
        <div className="mt-6 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.16em] text-[var(--text-dim)]">
              Diferencias línea a línea
            </p>
            {stats && (
              <p className="font-[family-name:var(--font-data)] text-xs">
                <span style={{ color: "var(--diff-add-text)" }}>+{stats.added}</span>{" "}
                <span style={{ color: "var(--diff-remove-text)" }}>-{stats.removed}</span>
              </p>
            )}
          </div>
          <pre className="max-h-[32rem] overflow-auto rounded-sm border border-[var(--line-soft)] bg-[var(--bg)] p-3 font-[family-name:var(--font-data)] text-xs leading-relaxed">
            {diff.map((line, i) => (
              <div
                key={i}
                className="border-l-2 pl-2"
                style={
                  line.type === "add"
                    ? {
                        background: "var(--diff-add-bg)",
                        color: "var(--diff-add-text)",
                        borderColor: "var(--diff-add-border)",
                      }
                    : line.type === "remove"
                      ? {
                          background: "var(--diff-remove-bg)",
                          color: "var(--diff-remove-text)",
                          borderColor: "var(--diff-remove-border)",
                        }
                      : { color: "var(--text-muted)", borderColor: "transparent" }
                }
              >
                <span className="mr-2 inline-block w-3 select-none text-[var(--text-dim)]">
                  {line.type === "add" ? "+" : line.type === "remove" ? "-" : ""}
                </span>
                {line.text}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
