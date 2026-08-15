"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { JsonValue } from "@/lib/types";

function valueColor(value: JsonValue): string {
  if (typeof value === "string") return "text-emerald-700";
  if (typeof value === "number") return "text-sky-700";
  if (typeof value === "boolean") return "text-purple-700";
  return "text-slate-400";
}

function formatPrimitive(value: JsonValue): string {
  if (typeof value === "string") return `"${value}"`;
  if (value === null) return "null";
  return String(value);
}

interface TreeNodeProps {
  label: string | null;
  value: JsonValue;
  depth: number;
}

function TreeNode({ label, value, depth }: TreeNodeProps) {
  const isObject = value !== null && typeof value === "object";
  const [collapsed, setCollapsed] = useState(depth >= 2);

  if (!isObject) {
    return (
      <div style={{ paddingLeft: depth * 16 + 18 }} className="font-mono text-sm leading-6">
        {label !== null && <span className="text-slate-500">{label}: </span>}
        <span className={valueColor(value)}>{formatPrimitive(value)}</span>
      </div>
    );
  }

  const isArray = Array.isArray(value);
  const entries: [string, JsonValue][] = isArray
    ? value.map((v, i) => [String(i), v] as [string, JsonValue])
    : Object.entries(value);
  const [open, close] = isArray ? ["[", "]"] : ["{", "}"];

  if (entries.length === 0) {
    return (
      <div style={{ paddingLeft: depth * 16 + 18 }} className="font-mono text-sm leading-6">
        {label !== null && <span className="text-slate-500">{label}: </span>}
        <span className="text-slate-400">
          {open}
          {close}
        </span>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm leading-6">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        style={{ paddingLeft: depth * 16 }}
        className="flex w-full items-center gap-1 rounded text-left hover:bg-slate-100"
      >
        {collapsed ? (
          <ChevronRight size={13} className="shrink-0 text-slate-400" />
        ) : (
          <ChevronDown size={13} className="shrink-0 text-slate-400" />
        )}
        {label !== null && <span className="text-slate-500">{label}: </span>}
        <span className="text-slate-400">
          {open}
          {collapsed ? ` … ${entries.length} ${isArray ? "elementos" : "claves"} ${close}` : ""}
        </span>
      </button>
      {!collapsed && (
        <>
          {entries.map(([key, val]) => (
            <TreeNode
              key={key}
              label={isArray ? key : `"${key}"`}
              value={val}
              depth={depth + 1}
            />
          ))}
          <div style={{ paddingLeft: depth * 16 + 18 }} className="text-slate-400">
            {close}
          </div>
        </>
      )}
    </div>
  );
}

export function JsonTreeView({ value }: { value: JsonValue }) {
  return (
    <div className="max-h-[28rem] overflow-auto rounded-md bg-slate-50 p-3">
      <TreeNode label={null} value={value} depth={0} />
    </div>
  );
}
