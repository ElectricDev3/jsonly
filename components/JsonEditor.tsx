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
        className="w-full resize-y rounded-sm border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 font-[family-name:var(--font-data)] text-[13px] leading-relaxed text-[var(--text)] placeholder:text-[var(--text-dim)] focus:border-[var(--accent-cyan)] focus:outline-none"
      />
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
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
