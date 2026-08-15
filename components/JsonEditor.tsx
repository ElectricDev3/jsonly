"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/Button";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  onLoadSample?: () => void;
}

export function JsonEditor({ value, onChange, placeholder, rows = 10, onLoadSample }: JsonEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result ?? ""));
    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Pega tu JSON aquí, o sube un archivo…"}
        rows={rows}
        spellCheck={false}
        className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
          <Upload size={14} /> Subir archivo .json
        </Button>
        {onLoadSample && (
          <Button type="button" variant="ghost" onClick={onLoadSample}>
            Usar ejemplo
          </Button>
        )}
        <input ref={fileInputRef} type="file" accept=".json,application/json" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}
