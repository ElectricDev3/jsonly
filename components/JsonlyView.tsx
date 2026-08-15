"use client";

import { useState } from "react";
import { FormatterView } from "./FormatterView";
import { DiffView } from "./DiffView";

type Tab = "format" | "diff";

export function JsonlyView() {
  const [tab, setTab] = useState<Tab>("format");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Herramientas de JSON</h1>
        <p className="text-sm text-slate-500">
          Formatea, valida, explora en árbol o compara dos JSON — todo en tu navegador.
        </p>
      </div>

      <div className="mb-6 flex gap-1 rounded-md bg-slate-100 p-1 w-fit">
        <button
          onClick={() => setTab("format")}
          className={`rounded px-3.5 py-1.5 text-sm font-medium transition-colors ${
            tab === "format" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Formatear / Validar
        </button>
        <button
          onClick={() => setTab("diff")}
          className={`rounded px-3.5 py-1.5 text-sm font-medium transition-colors ${
            tab === "diff" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Comparar
        </button>
      </div>

      {tab === "format" ? <FormatterView /> : <DiffView />}
    </div>
  );
}
