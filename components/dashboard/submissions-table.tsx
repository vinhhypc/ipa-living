"use client";

import { useMemo, useState } from "react";
import { Check, Inbox, Minus, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { fieldLabel, type FormCatalogEntry } from "@/lib/forms/catalog";
import { groupStyle } from "@/components/dashboard/group-meta";
import type { Submission } from "@/lib/dashboard/types";

type Props = {
  form: FormCatalogEntry;
  rows: Submission[];
};

const NUMERIC_RIGHT = new Set(["createdTime"]);

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return value;
}

function Cell({ field, value }: { field: string; value: string | boolean | undefined }) {
  if (value === true || value === false) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
          value
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-500",
        )}
      >
        {value ? <Check className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
        {value ? "Có" : "Không"}
      </span>
    );
  }

  if (value === undefined || value === "") {
    return <span className="text-slate-300">—</span>;
  }

  if (field === "email") {
    return (
      <a
        href={`mailto:${value}`}
        className="text-brand-navy hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {value}
      </a>
    );
  }

  if (field === "phoneNumber") {
    return <span className="tabular-nums">{formatPhone(value)}</span>;
  }

  if (field === "cvProfileUrl" && /^https?:\/\//.test(value)) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="text-brand-navy hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {value.replace(/^https?:\/\//, "")}
      </a>
    );
  }

  return <>{value}</>;
}

export function SubmissionsTable({ form, rows }: Props) {
  const [query, setQuery] = useState("");
  const columns = useMemo(() => [...form.fields, "createdTime"], [form.fields]);
  const style = groupStyle(form.group);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      Object.values(row.values).some(
        (v) => typeof v === "string" && v.toLowerCase().includes(q),
      ),
    );
  }, [rows, query]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-t-4 border-slate-200 bg-white shadow-sm",
        style.border,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên, SĐT, email..."
            className="w-64 max-w-full rounded-lg border border-slate-300 py-1.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10"
          />
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-sm font-semibold",
            style.soft,
          )}
        >
          {query ? (
            <>
              {filtered.length} / {rows.length}
            </>
          ) : (
            <>{rows.length} lượt gửi</>
          )}
        </span>
      </div>

      <div className="scrollbar-slim overflow-x-auto">
        <table className="w-full min-w-3xl border-collapse text-sm">
          <thead>
            <tr className={cn("text-left", style.soft)}>
              <th
                className={cn(
                  "sticky top-0 z-10 w-12 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-bold",
                  style.soft,
                  style.border,
                )}
              >
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className={cn(
                    "sticky top-0 z-10 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide",
                    style.soft,
                    style.border,
                    NUMERIC_RIGHT.has(col) && "text-right",
                  )}
                >
                  {fieldLabel(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-16 text-center"
                >
                  <Inbox className="mx-auto h-8 w-8 text-slate-300" />
                  <p className="mt-2 text-sm text-slate-400">
                    {query
                      ? "Không có kết quả khớp."
                      : "Chưa có lượt gửi nào."}
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-slate-100 transition-colors last:border-0",
                    index % 2 === 1 && "bg-slate-50/40",
                    "hover:bg-slate-100/70",
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-2.5 text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          row.status === 1 ? "bg-emerald-500" : "bg-slate-300",
                        )}
                        title={
                          row.status === 1 ? "Khớp rule" : `status ${row.status}`
                        }
                      />
                      <span
                        className={cn("font-semibold tabular-nums", style.text)}
                      >
                        {index + 1}
                      </span>
                    </span>
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col}
                      className={cn(
                        "max-w-xs truncate px-4 py-2.5 text-slate-700",
                        NUMERIC_RIGHT.has(col) &&
                          "whitespace-nowrap text-right text-xs text-slate-400 tabular-nums",
                      )}
                      title={
                        typeof row.values[col] === "string"
                          ? (row.values[col] as string)
                          : undefined
                      }
                    >
                      <Cell field={col} value={row.values[col]} />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
