"use client";

import { useState } from "react";

function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0;
}

function intToIp(n: number): string {
  return [
    (n >>> 24) & 255,
    (n >>> 16) & 255,
    (n >>> 8) & 255,
    n & 255,
  ].join(".");
}

function isValidIp(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const n = parseInt(p);
    return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p;
  });
}

interface SubnetResult {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  subnetMask: string;
  wildcardMask: string;
  cidr: string;
  ipClass: string;
  isPrivate: boolean;
  binarySubnet: string;
}

function calculate(cidr: string): { result: SubnetResult | null; error: string } {
  const parts = cidr.trim().split("/");
  if (parts.length !== 2) return { result: null, error: "Format should be: 192.168.1.0/24" };

  const [ipStr, prefixStr] = parts;
  const prefix = parseInt(prefixStr);

  if (!isValidIp(ipStr)) return { result: null, error: "Invalid IP address" };
  if (isNaN(prefix) || prefix < 0 || prefix > 32) return { result: null, error: "Prefix must be 0–32" };

  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const wildcard = ~mask >>> 0;
  const ipInt = ipToInt(ipStr);
  const networkInt = (ipInt & mask) >>> 0;
  const broadcastInt = (networkInt | wildcard) >>> 0;
  const firstHost = prefix < 31 ? networkInt + 1 : networkInt;
  const lastHost = prefix < 31 ? broadcastInt - 1 : broadcastInt;
  const totalHosts = Math.pow(2, 32 - prefix);
  const usableHosts = prefix >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

  const firstOctet = (ipInt >>> 24) & 255;
  let ipClass = "E";
  if (firstOctet < 128) ipClass = "A";
  else if (firstOctet < 192) ipClass = "B";
  else if (firstOctet < 224) ipClass = "C";
  else if (firstOctet < 240) ipClass = "D (Multicast)";

  const isPrivate =
    (firstOctet === 10) ||
    (firstOctet === 172 && ((ipInt >>> 16) & 255) >= 16 && ((ipInt >>> 16) & 255) <= 31) ||
    (firstOctet === 192 && ((ipInt >>> 16) & 255) === 168);

  const binarySubnet = intToIp(mask).split(".").map((oct) => parseInt(oct).toString(2).padStart(8, "0")).join(".");

  return {
    result: {
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstHost: intToIp(firstHost),
      lastHost: intToIp(lastHost),
      totalHosts,
      usableHosts,
      subnetMask: intToIp(mask),
      wildcardMask: intToIp(wildcard),
      cidr: `${intToIp(networkInt)}/${prefix}`,
      ipClass,
      isPrivate,
      binarySubnet,
    },
    error: "",
  };
}

const PRESETS = [
  "192.168.1.0/24",
  "10.0.0.0/8",
  "172.16.0.0/16",
  "192.168.0.0/16",
  "10.10.0.0/22",
  "172.20.0.0/14",
  "192.168.100.0/28",
  "10.0.1.0/30",
];

export default function CidrCalculator() {
  const [input, setInput] = useState("192.168.1.0/24");
  const { result, error } = calculate(input);

  const rows: Array<{ label: string; value: string; mono?: boolean }> = result
    ? [
        { label: "Network Address", value: result.network, mono: true },
        { label: "Broadcast Address", value: result.broadcast, mono: true },
        { label: "First Usable Host", value: result.firstHost, mono: true },
        { label: "Last Usable Host", value: result.lastHost, mono: true },
        { label: "Subnet Mask", value: result.subnetMask, mono: true },
        { label: "Wildcard Mask", value: result.wildcardMask, mono: true },
        { label: "Total Hosts", value: result.totalHosts.toLocaleString() },
        { label: "Usable Hosts", value: result.usableHosts.toLocaleString() },
        { label: "IP Class", value: result.ipClass },
        { label: "Private Range", value: result.isPrivate ? "✅ Yes (RFC 1918)" : "🌐 No (Public)" },
        { label: "CIDR Notation", value: result.cidr, mono: true },
        { label: "Binary Subnet", value: result.binarySubnet, mono: true },
      ]
    : [];

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-400">CIDR Notation</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="192.168.1.0/24"
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-mono text-cyan-300 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 tracking-wider"
        />
      </div>

      {/* Error */}
      {input.trim() && error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          ❌ {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-zinc-800 sm:divide-y-0">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-4 py-3 ${
                  i % 2 === 0 && i < rows.length - 1 ? "sm:border-b border-zinc-800" : ""
                } ${i < rows.length - 2 ? "border-b border-zinc-800 sm:border-b-0" : ""}`}
              >
                <span className="text-xs text-zinc-500">{row.label}</span>
                <span className={`text-xs font-semibold text-white ${row.mono ? "font-mono text-cyan-300" : ""}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual host range bar */}
      {result && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-zinc-500">Host Range Visualization</p>
          <div className="relative h-8 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"
              style={{ width: `${Math.min(100, (result.usableHosts / result.totalHosts) * 100)}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              {result.usableHosts.toLocaleString()} usable of {result.totalHosts.toLocaleString()} total
            </div>
          </div>
        </div>
      )}

      {/* Quick presets */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-400">Common Subnets</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => setInput(p)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                input === p
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                  : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
