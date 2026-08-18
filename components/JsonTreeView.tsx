"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { JsonValue } from "@/lib/types";

const DEPTH_RAILS = ["#5fd4d0", "#f2a65a", "#c9a6f2", "#7ec8e3"];

function railColor(depth: number): string {
  return DEPTH_RAILS[depth % DEPTH_RAILS.length];
}

function valueColor(value: JsonValue): string {
  if (typeof value === "string") return "var(--type-string)";
  if (typeof value === "number") return "var(--type-number)";
  if (typeof value === "boolean") return "var(--type-const)";
  return "var(--type-null)";
}

function typeLabel(value: JsonValue): string {
  if (typeof value === "string") return "str";
  if (typeof value === "number") return "num";
  if (typeof value === "boolean") return "bool";
  return "null";
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
      <div className="group flex items-baseline gap-2 py-0.5 pl-3 font-[family-name:var(--font-data)] text-[13px] leading-6">
        <span
          className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-[1px] opacity-70"
          style={{ background: valueColor(value) }}
        />
        <span className="min-w-0 break-all">
          {label !== null && <span className="text-[var(--text-dim)]">{label}: </span>}
          <span style={{ color: valueColor(value) }}>{formatPrimitive(value)}</span>
        </span>
        <span className="ml-auto hidden shrink-0 text-[10px] tracking-wide text-[var(--text-dim)] group-hover:inline">
          {typeLabel(value)}
        </span>
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
      <div className="flex items-baseline gap-2 py-0.5 pl-3 font-[family-name:var(--font-data)] text-[13px] leading-6">
        <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-[1px] opacity-40" style={{ background: railColor(depth) }} />
        {label !== null && <span className="text-[var(--text-dim)]">{label}: </span>}
        <span className="text-[var(--text-dim)]">
          {open}
          {close}
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center gap-1.5 rounded-sm py-0.5 pl-3 text-left font-[family-name:var(--font-data)] text-[13px] leading-6 hover:bg-[var(--surface-raised)]"
      >
        {collapsed ? (
          <ChevronRight size={12} className="shrink-0" style={{ color: railColor(depth) }} />
        ) : (
          <ChevronDown size={12} className="shrink-0" style={{ color: railColor(depth) }} />
        )}
        {label !== null && <span className="text-[var(--text-dim)]">{label}: </span>}
        <span className="text-[var(--text-dim)]">
          {open}
          {collapsed ? ` … ${entries.length} ${isArray ? "elementos" : "claves"} ${close}` : ""}
        </span>
      </button>
      {!collapsed && (
        <>
          <div
            className="relative ml-[13px] border-l pl-2"
            style={{ borderColor: railColor(depth), opacity: 1 }}
          >
            {entries.map(([key, val]) => (
              <TreeNode
                key={key}
                label={isArray ? key : `"${key}"`}
                value={val}
                depth={depth + 1}
              />
            ))}
          </div>
          <div className="pl-3 text-[var(--text-dim)]">{close}</div>
        </>
      )}
    </div>
  );
}

export function JsonTreeView({ value }: { value: JsonValue }) {
  return (
    <div className="max-h-[28rem] overflow-auto rounded-sm border border-[var(--line-soft)] bg-[var(--bg)] p-3">
      <TreeNode label={null} value={value} depth={0} />
    </div>
  );
}
