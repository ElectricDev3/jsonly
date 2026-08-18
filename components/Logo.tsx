export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] font-[family-name:var(--font-data)] text-[15px] font-medium text-[var(--accent-cyan)]">
        {"{}"}
      </div>
      <div className="leading-tight">
        <p className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-tight text-[var(--text)]">
          Jsonly
        </p>
        <p className="font-[family-name:var(--font-data)] text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)]">
          Estructura de datos JSON
        </p>
      </div>
    </div>
  );
}
