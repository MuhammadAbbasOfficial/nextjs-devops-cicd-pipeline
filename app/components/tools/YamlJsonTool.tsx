"use client";

import { useState } from "react";

type Mode = "validate" | "yaml-to-json" | "json-to-yaml";

function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (obj === null) return "null";
  if (typeof obj === "boolean" || typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (obj.includes("\n") || obj.includes(":") || obj.includes("#") || obj.startsWith("-")) {
      return `|\n${obj.split("\n").map((l) => `${pad}  ${l}`).join("\n")}`;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map((item) => {
      const val = jsonToYaml(item, indent + 1);
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        const lines = val.split("\n");
        return `${pad}- ${lines[0]}\n${lines.slice(1).join("\n")}`;
      }
      return `${pad}- ${val}`;
    }).join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries.map(([k, v]) => {
      if (typeof v === "object" && v !== null) {
        return `${pad}${k}:\n${jsonToYaml(v, indent + 1)}`;
      }
      return `${pad}${k}: ${jsonToYaml(v, indent + 1)}`;
    }).join("\n");
  }
  return String(obj);
}

// Simple YAML parser (basic cases)
function parseYaml(yaml: string): unknown {
  const lines = yaml.split("\n");
  const result: Record<string, unknown> = {};
  const stack: Array<{ obj: Record<string, unknown>; indent: number }> = [{ obj: result, indent: -1 }];
  let currentArray: unknown[] | null = null;
  let currentArrayKey = "";

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const indent = line.search(/\S/);
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      const val = trimmed.slice(2).trim();
      if (!currentArray) {
        currentArray = [];
        stack[stack.length - 1].obj[currentArrayKey] = currentArray;
      }
      try { currentArray.push(JSON.parse(val)); } catch { currentArray.push(val); }
      continue;
    }

    currentArray = null;
    const colonIdx = trimmed.indexOf(": ");
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx);
    const value = trimmed.slice(colonIdx + 2).trim();

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;

    if (value === "" || value === "|" || value === ">") {
      const newObj: Record<string, unknown> = {};
      parent[key] = newObj;
      currentArrayKey = key;
      stack.push({ obj: newObj, indent });
    } else {
      let parsed: unknown = value;
      if (value === "true") parsed = true;
      else if (value === "false") parsed = false;
      else if (value === "null" || value === "~") parsed = null;
      else if (!isNaN(Number(value)) && value !== "") parsed = Number(value);
      parent[key] = parsed;
      currentArrayKey = key;
    }
  }
  return result;
}

export default function YamlJsonTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("validate");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    try {
      if (mode === "validate") {
        // Try JSON first
        try {
          JSON.parse(input);
          setStatus("ok");
          setMessage("✅ Valid JSON");
          setOutput(JSON.stringify(JSON.parse(input), null, 2));
        } catch {
          // Try basic YAML validation (check structure)
          if (input.includes(":") || input.trim().startsWith("-")) {
            setStatus("ok");
            setMessage("✅ Appears to be valid YAML");
            setOutput(input);
          } else {
            throw new Error("Neither valid JSON nor recognizable YAML");
          }
        }
      } else if (mode === "json-to-yaml") {
        const obj = JSON.parse(input);
        const yaml = jsonToYaml(obj);
        setOutput(yaml);
        setStatus("ok");
        setMessage("✅ Converted to YAML");
      } else {
        const obj = parseYaml(input);
        setOutput(JSON.stringify(obj, null, 2));
        setStatus("ok");
        setMessage("✅ Converted to JSON");
      }
    } catch (e) {
      setStatus("error");
      setMessage(`❌ ${e instanceof Error ? e.message : "Parse error"}`);
      setOutput("");
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modes: { id: Mode; label: string }[] = [
    { id: "validate", label: "Validate" },
    { id: "json-to-yaml", label: "JSON → YAML" },
    { id: "yaml-to-json", label: "YAML → JSON" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Mode tabs */}
      <div className="flex gap-1 rounded-xl bg-zinc-800/50 p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setStatus("idle"); setOutput(""); setMessage(""); }}
            className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
              mode === m.id
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "yaml-to-json" ? "Paste YAML here..." : "Paste JSON here..."}
            className="h-56 rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 resize-none"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-400">Output</label>
            {output && (
              <button onClick={copyOutput} className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors">
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Output will appear here..."
            className="h-56 rounded-xl border border-zinc-700 bg-zinc-900/50 p-3 text-xs font-mono text-emerald-300 placeholder-zinc-600 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Status */}
      {status !== "idle" && (
        <div className={`rounded-lg px-4 py-2 text-xs font-medium ${
          status === "ok" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                         : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {message}
        </div>
      )}

      <button
        onClick={run}
        className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 self-start"
      >
        {mode === "validate" ? "Validate" : "Convert"} →
      </button>
    </div>
  );
}
