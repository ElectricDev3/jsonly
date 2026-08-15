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
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">JSON A</p>
          <JsonEditor value={inputA} onChange={setInputA} rows={10} onLoadSample={() => setInputA(SAMPLE_JSON)} />
          {parsedA.error && <div className="mt-2"><ValidationError error={parsedA.error} text={inputA} /></div>}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">JSON B</p>
          <JsonEditor value={inputB} onChange={setInputB} rows={10} onLoadSample={() => setInputB(SAMPLE_JSON_B)} />
          {parsedB.error && <div className="mt-2"><ValidationError error={parsedB.error} text={inputB} /></div>}
        </div>
      </div>

      {diff && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Diferencias línea a línea
            </p>
            {stats && (
              <p className="font-mono text-xs">
                <span className="text-emerald-600">+{stats.added}</span>{" "}
                <span className="text-red-600">-{stats.removed}</span>
              </p>
            )}
          </div>
          <pre className="max-h-[32rem] overflow-auto rounded-md bg-slate-50 p-3 font-mono text-xs leading-relaxed">
            {diff.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === "add"
                    ? "bg-emerald-50 text-emerald-800"
                    : line.type === "remove"
                      ? "bg-red-50 text-red-800"
                      : "text-slate-600"
                }
              >
                <span className="mr-2 inline-block w-3 select-none text-slate-400">
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
