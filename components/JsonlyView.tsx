"use client";

import { useState } from "react";
import { FormatterView } from "./FormatterView";
import { DiffView } from "./DiffView";

type Tab = "format" | "diff";

export function JsonlyView() {
  const [tab, setTab] = useState<Tab>("format");

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
        <div>
          <p className="mb-1.5 font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.16em] text-[var(--accent-cyan)]">
            Hoja 01 · Herramientas
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
            De texto plano a estructura legible
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--text-muted)]">
            Formatea, valida con ubicación exacta del error, explora la jerarquía en árbol y compara dos
            documentos línea a línea.
          </p>
        </div>
      </div>

      <div className="mb-6 flex w-fit gap-1 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-1">
        <button
          onClick={() => setTab("format")}
          className={`rounded-sm px-3.5 py-1.5 text-sm font-medium transition-colors ${
            tab === "format"
              ? "bg-[var(--accent-cyan)] text-[#0e1a2b]"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          Formatear / Validar
        </button>
        <button
          onClick={() => setTab("diff")}
          className={`rounded-sm px-3.5 py-1.5 text-sm font-medium transition-colors ${
            tab === "diff"
              ? "bg-[var(--accent-cyan)] text-[#0e1a2b]"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          Comparar
        </button>
      </div>

      {tab === "format" ? <FormatterView /> : <DiffView />}
    </div>
  );
}
