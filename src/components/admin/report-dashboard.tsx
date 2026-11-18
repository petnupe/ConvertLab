"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BarChart3 } from "lucide-react";

import {
  LEAD_STATUSES,
  STATUS_LABELS,
  type Lead,
  type StatusChange,
} from "@/lib/lead";

const TZ = "America/Sao_Paulo";
const BLUE = "#3987e5"; // série única (categórico slot 1, versão para fundo escuro)
const PERIODS = [
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
  { value: "all", label: "Todo o período" },
] as const;

const dayKey = (d: Date | string | number) =>
  new Date(d).toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD

const fmtDay = (key: string) => {
  const [, m, d] = key.split("-");
  return `${d}/${m}`;
};

const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

function addDays(key: string, n: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

function diffDays(from: string, to: string): number {
  const t = (k: string) => {
    const [y, m, d] = k.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((t(to) - t(from)) / 86_400_000);
}

/** Segunda-feira da semana de uma data YYYY-MM-DD. */
function weekStart(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = domingo
  return addDays(key, -((dow + 6) % 7));
}

interface Bucket {
  key: string;
  label: string;
  count: number;
}

interface Tip {
  x: number;
  y: number;
  title: string;
  value: string;
}

export function ReportDashboard({
  history,
  leads,
  now,
}: {
  history: StatusChange[];
  leads: Lead[];
  now: string;
}) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]["value"]>("30");
  const [visibleRows, setVisibleRows] = useState(25);
  const [tip, setTip] = useState<Tip | null>(null);

  const today = dayKey(now);

  const data = useMemo(() => {
    const startKey = period === "all" ? "0000-00-00" : addDays(today, -(Number(period) - 1));
    const inPeriod = history.filter((h) => dayKey(h.em) >= startKey);
    const changes = inPeriod.filter((h) => h.de !== null);
    const entradas = inPeriod.filter((h) => h.de === null);

    // por destino
    const porDestino = LEAD_STATUSES.map((s) => ({
      status: s,
      count: changes.filter((c) => c.para === s).length,
    }));

    // série temporal: diária, ou semanal se o intervalo passar de 60 dias
    let first = startKey;
    if (period === "all") {
      first = changes.length
        ? dayKey(changes[changes.length - 1].em) // lista ordenada do mais recente ao mais antigo
        : today;
    }
    const spanDays = diffDays(first, today) + 1;
    const weekly = spanDays > 60;

    const map = new Map<string, number>();
    const keys: string[] = [];
    if (weekly) {
      for (let k = weekStart(first); k <= today; k = addDays(k, 7)) {
        keys.push(k);
        map.set(k, 0);
      }
    } else {
      for (let k = first; k <= today; k = addDays(k, 1)) {
        keys.push(k);
        map.set(k, 0);
      }
    }
    for (const c of changes) {
      const k = weekly ? weekStart(dayKey(c.em)) : dayKey(c.em);
      if (map.has(k)) map.set(k, (map.get(k) ?? 0) + 1);
    }
    const buckets: Bucket[] = keys.map((k) => ({
      key: k,
      label: weekly ? `sem. ${fmtDay(k)}` : fmtDay(k),
      count: map.get(k) ?? 0,
    }));

    return {
      changes,
      entradas,
      porDestino,
      buckets,
      weekly,
      fechados: changes.filter((c) => c.para === "fechado").length,
    };
  }, [history, period, today]);

  const atual = LEAD_STATUSES.map((s) => ({
    status: s,
    count: leads.filter((l) => l.status === s).length,
  }));
  const totalLeads = leads.length;
  const taxa = totalLeads
    ? Math.round((atual.find((a) => a.status === "fechado")!.count / totalLeads) * 100)
    : 0;

  const tableRows = useMemo(() => {
    const startKey = period === "all" ? "0000-00-00" : addDays(today, -(Number(period) - 1));
    return history.filter((h) => dayKey(h.em) >= startKey);
  }, [history, period, today]);

  return (
    <div className="theme-convertscale min-h-screen bg-[#0a0812]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
              <BarChart3 className="h-6 w-6 text-violet-400" aria-hidden="true" />
              Relatório de situações
            </h1>
            <p className="mt-1 text-sm text-white/55">
              Quando cada lead mudou de situação.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value as typeof period);
                setVisibleRows(25);
              }}
              aria-label="Período"
              className="appearance-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-400/60"
            >
              {PERIODS.map((p) => (
                <option key={p.value} value={p.value} className="bg-[#14102a]">
                  {p.label}
                </option>
              ))}
            </select>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Leads
            </Link>
          </div>
        </header>

        {/* indicadores */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Kpi value={totalLeads} label="Leads no cadastro" />
          <Kpi value={data.entradas.length} label="Novos no período" />
          <Kpi value={data.changes.length} label="Mudanças de situação" />
          <Kpi
            value={data.fechados}
            label={`Fechados no período · ${taxa}% da base`}
          />
        </div>

        {/* mudanças ao longo do tempo */}
        <div className="mt-6">
        <Card
          title={`Mudanças de situação ${data.weekly ? "por semana" : "por dia"}`}
          note={
            data.changes.length === 0
              ? "Nenhuma mudança de situação neste período."
              : undefined
          }
        >
          <ColumnChart
            buckets={data.buckets}
            unit="mudança"
            tip={tip}
            setTip={setTip}
          />
        </Card>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Card title="Situação atual dos leads">
            <BarList rows={atual.map((a) => ({ label: STATUS_LABELS[a.status], value: a.count }))} />
          </Card>
          <Card title="Para onde os leads foram (no período)">
            <BarList
              rows={data.porDestino.map((a) => ({
                label: STATUS_LABELS[a.status],
                value: a.count,
              }))}
            />
          </Card>
        </div>

        {/* tabela: visão em texto dos mesmos dados */}
        <section className="cl-card mt-6 rounded-3xl p-5">
          <h2 className="text-sm font-semibold text-white/60">
            Histórico ({tableRows.length})
          </h2>
          {tableRows.length === 0 ? (
            <p className="mt-3 text-sm text-white/40">Sem registros no período.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-white/45">
                  <tr>
                    <th className="py-2 pr-4 font-medium">Data</th>
                    <th className="py-2 pr-4 font-medium">Lead</th>
                    <th className="py-2 font-medium">Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.slice(0, visibleRows).map((h) => (
                    <tr key={h.id} className="border-t border-white/5 text-white/80">
                      <td className="whitespace-nowrap py-2 pr-4 text-white/55">
                        {fmtDateTime(h.em)}
                      </td>
                      <td className="max-w-[16rem] truncate py-2 pr-4">{h.leadNome}</td>
                      <td className="whitespace-nowrap py-2">
                        {h.de ? (
                          <span className="inline-flex items-center gap-1.5">
                            {STATUS_LABELS[h.de]}
                            <ArrowRight className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
                            {STATUS_LABELS[h.para]}
                          </span>
                        ) : (
                          <span className="text-white/60">
                            Entrada como {STATUS_LABELS[h.para]}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visibleRows < tableRows.length ? (
                <button
                  type="button"
                  onClick={() => setVisibleRows((n) => n + 50)}
                  className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
                >
                  Ver mais
                </button>
              ) : null}
            </div>
          )}
          <p className="mt-4 text-xs text-white/40">
            Leads cadastrados antes do histórico aparecem como “Entrada”, com a data de
            criação e a situação que tinham quando o relatório foi ativado.
          </p>
        </section>
      </div>
    </div>
  );
}

/* ───────── peças ───────── */

function Kpi({ value, label }: { value: number; label: string }) {
  return (
    <div className="cl-card rounded-2xl px-4 py-3 text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-white/50">{label}</p>
    </div>
  );
}

function Card({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="cl-card rounded-3xl p-5">
      <h2 className="text-sm font-semibold text-white/60">{title}</h2>
      {note ? <p className="mt-1 text-xs text-white/40">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Barras horizontais com valor ao fim (rótulo direto, série única). */
function BarList({ rows }: { rows: { label: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center gap-3 text-sm">
          <span className="w-24 shrink-0 text-white/65">{r.label}</span>
          <div className="relative h-4 flex-1">
            <div
              className="h-full rounded-r-md"
              style={{
                width: `${(r.value / max) * 100}%`,
                minWidth: r.value > 0 ? 4 : 0,
                background: BLUE,
              }}
            />
          </div>
          <span className="w-8 shrink-0 text-right font-semibold tabular-nums text-white">
            {r.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Colunas por período, com hover/tooltip, eixo Y recessivo e rótulos de X espaçados. */
function ColumnChart({
  buckets,
  unit,
  tip,
  setTip,
}: {
  buckets: Bucket[];
  unit: string;
  tip: Tip | null;
  setTip: (t: Tip | null) => void;
}) {
  const W = 720;
  const H = 220;
  const pad = { l: 32, r: 8, t: 12, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const rawMax = Math.max(1, ...buckets.map((b) => b.count));
  const max = rawMax <= 4 ? 4 : Math.ceil(rawMax / 4) * 4;
  const slot = innerW / Math.max(1, buckets.length);
  const barW = Math.max(3, Math.min(28, slot * 0.7));
  const every = Math.max(1, Math.ceil(buckets.length / 10));
  const ticks = [0, max / 4, max / 2, (max * 3) / 4, max];
  const total = buckets.reduce((s, b) => s + b.count, 0);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Gráfico de colunas: ${total} ${unit}${total === 1 ? "" : "s"} no período. A tabela abaixo traz os mesmos dados.`}
        className="w-full"
        onMouseLeave={() => setTip(null)}
      >
        {ticks.map((t) => {
          const y = pad.t + innerH - (t / max) * innerH;
          return (
            <g key={t}>
              <line
                x1={pad.l}
                x2={W - pad.r}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-white/10"
                strokeWidth={1}
              />
              <text x={pad.l - 6} y={y + 4} textAnchor="end" className="fill-white/45" fontSize={11}>
                {Number.isInteger(t) ? t : ""}
              </text>
            </g>
          );
        })}

        {buckets.map((b, i) => {
          const h = (b.count / max) * innerH;
          const x = pad.l + i * slot + (slot - barW) / 2;
          const y = pad.t + innerH - h;
          return (
            <g key={b.key}>
              {b.count > 0 ? (
                <path
                  d={`M${x},${pad.t + innerH} V${y + 4} a4,4 0 0 1 4,-4 h${barW - 8} a4,4 0 0 1 4,4 V${pad.t + innerH} Z`}
                  fill={BLUE}
                />
              ) : null}
              {/* alvo de hover maior que a marca */}
              <rect
                x={pad.l + i * slot}
                y={pad.t}
                width={slot}
                height={innerH}
                fill="transparent"
                onMouseMove={(e) => {
                  const box = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                  setTip({
                    x: e.clientX - box.left,
                    y: e.clientY - box.top,
                    title: b.label,
                    value: `${b.count} ${unit}${b.count === 1 ? "" : "s"}`,
                  });
                }}
              />
              {i % every === 0 ? (
                <text
                  x={pad.l + i * slot + slot / 2}
                  y={H - 8}
                  textAnchor="middle"
                  className="fill-white/45"
                  fontSize={11}
                >
                  {b.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {tip ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-[#14102a] px-2.5 py-1.5 text-xs shadow-lg"
          style={{ left: tip.x, top: tip.y - 8 }}
        >
          <p className="font-semibold text-white">{tip.value}</p>
          <p className="text-white/55">{tip.title}</p>
        </div>
      ) : null}
    </div>
  );
}
