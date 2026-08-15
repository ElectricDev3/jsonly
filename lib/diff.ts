export type DiffLineType = "equal" | "add" | "remove";

export interface DiffLine {
  type: DiffLineType;
  text: string;
}

const MAX_LINES_FOR_DP = 2000;

export function diffLines(a: string[], b: string[]): DiffLine[] {
  const n = a.length;
  const m = b.length;

  if (n > MAX_LINES_FOR_DP || m > MAX_LINES_FOR_DP) {
    return diffLinesFallback(a, b);
  }

  const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;

  while (i < n && j < m) {
    if (a[i] === b[j]) {
      result.push({ type: "equal", text: a[i] });
      i += 1;
      j += 1;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      result.push({ type: "remove", text: a[i] });
      i += 1;
    } else {
      result.push({ type: "add", text: b[j] });
      j += 1;
    }
  }
  while (i < n) {
    result.push({ type: "remove", text: a[i] });
    i += 1;
  }
  while (j < m) {
    result.push({ type: "add", text: b[j] });
    j += 1;
  }

  return result;
}

function diffLinesFallback(a: string[], b: string[]): DiffLine[] {
  const result: DiffLine[] = [];
  const max = Math.max(a.length, b.length);
  for (let k = 0; k < max; k++) {
    if (k < a.length && k < b.length && a[k] === b[k]) {
      result.push({ type: "equal", text: a[k] });
    } else {
      if (k < a.length) result.push({ type: "remove", text: a[k] });
      if (k < b.length) result.push({ type: "add", text: b[k] });
    }
  }
  return result;
}
