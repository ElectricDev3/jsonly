export interface JsonParseError {
  message: string;
  line: number | null;
  column: number | null;
  position: number | null;
}

export interface JsonParseResult {
  value: unknown;
  error: JsonParseError | null;
}

const LINE_COL_RE = /position (\d+)(?: \(line (\d+) column (\d+)\))?/;

export function parseJson(text: string): JsonParseResult {
  try {
    return { value: JSON.parse(text), error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "JSON inválido";
    const match = message.match(LINE_COL_RE);

    if (match) {
      return {
        value: undefined,
        error: {
          message,
          position: Number(match[1]),
          line: match[2] ? Number(match[2]) : null,
          column: match[3] ? Number(match[3]) : null,
        },
      };
    }

    return { value: undefined, error: { message, line: null, column: null, position: null } };
  }
}

export function formatJson(value: unknown, indent: number): string {
  return JSON.stringify(value, null, indent);
}

export function minifyJson(value: unknown): string {
  return JSON.stringify(value);
}

export function errorContext(text: string, position: number, radius = 30): { snippet: string; caretOffset: number } {
  const start = Math.max(0, position - radius);
  const end = Math.min(text.length, position + radius);
  return { snippet: text.slice(start, end), caretOffset: position - start };
}
