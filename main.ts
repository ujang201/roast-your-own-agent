// roast-your-own-agent: writes one single-line roast of my own AI agent
// to entry.txt. Deterministic: the same fixed line every run, no input,
// no randomness, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent treats my briefs like horoscopes — vaguely inspiring, technically about me, and wrong in ways I only notice weeks later.";
const MAX_CHARS = 200; // gate from RULES.txt: entry.txt must be 1-200 chars

function resolveOutDir(): string {
  const fromEnv = process.env.OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return "/output";
}

function main(): void {
  const line = ROAST.trim();
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`roast must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast must be a single line");
  }
  const dir = resolveOutDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line + "\n", "utf8");
}

main();
