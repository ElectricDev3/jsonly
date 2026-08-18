import { Logo } from "./Logo";
import { JsonlyView } from "./JsonlyView";

export function AppShell() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-[var(--bg)]/80 px-6 py-4 backdrop-blur-sm sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo />
          <p className="hidden font-[family-name:var(--font-data)] text-[11px] uppercase tracking-[0.16em] text-[var(--text-dim)] sm:block">
            En tu navegador · sin servidor
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <JsonlyView />
      </main>
    </div>
  );
}
