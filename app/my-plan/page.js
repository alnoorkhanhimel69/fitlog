"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import WorkoutImage from "@/components/WorkoutImage";
import Stats from "@/components/Stats";
import Spinner from "@/components/Spinner";
import { Check, Chevron, X } from "@/components/Icons";
import { useApp } from "../providers";

const SORTS = {
  duration: (a, b) => a.duration - b.duration,
  calories: (a, b) => b.calories - a.calories,
  rating: (a, b) => b.rating - a.rating,
};

export default function MyPlan() {
  const { loading, byId, plan, saved, done, remove, toggleDone } = useApp();
  const [tab, setTab] = useState("plan");
  const [sort, setSort] = useState("duration");

  const ids = tab === "plan" ? plan : saved;
  const items = useMemo(() => ids.map(byId).filter(Boolean).sort(SORTS[sort]), [ids, byId, sort]);
  // stats follow the ACTIVE tab, so they change when switching Today's Plan <-> Saved
  const totals = { Exercises: items.length, Minutes: items.reduce((s, w) => s + w.duration, 0), Calories: items.reduce((s, w) => s + w.calories, 0) };

  return (
    <>
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide">My Plan</h1>
      <p className="mb-6 text-sm text-mute">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mb-6 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-panel">
        {Object.entries(totals).map(([k, v], i) => (
          <div key={k} className="px-3 py-4 sm:px-6 sm:py-5">
            <p className="text-xs text-mute">{k}</p>
            <p className={"font-display text-3xl font-bold sm:text-4xl " + (i === 0 ? "text-lime" : "")}>{v}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-line bg-panel p-1" role="tablist">
          {[["plan", "Today's Plan"], ["saved", "Saved"]].map(([k, label]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={"rounded-lg px-4 py-1.5 text-xs transition " + (tab === k ? "bg-white/10 font-semibold text-white" : "text-mute hover:text-white")}>
              {label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-mute">
          Sort By
          <span className="relative">
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-lg border border-line bg-panel py-1.5 pl-3 pr-8 text-xs text-white focus:border-lime focus:outline-none">
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <Chevron size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </span>
        </label>
      </div>

      {loading ? <Spinner /> : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line px-4 py-16 text-center">
          <h2 className="font-display text-xl font-bold uppercase">Nothing here yet</h2>
          <p className="mb-5 mt-1 text-xs text-mute">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn btn-lime">Go to workouts</Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((w) => {
            const isDone = tab === "plan" && done.includes(w.id);
            return (
              <li key={w.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel p-3 sm:flex-nowrap sm:gap-4">
                <WorkoutImage src={w.image} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className={"font-display text-sm font-bold uppercase tracking-wide " + (isDone ? "text-mute line-through" : "")}>{w.name}</h3>
                  <p className="text-xs text-mute">{w.equipment}</p>
                  <Stats w={w} className="mt-1" />
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Link href={`/workout/${w.id}`} className="btn btn-ghost !px-3 !py-1.5 text-xs">View Details</Link>
                  {tab === "plan" && (
                    <button onClick={() => toggleDone(w)} className={"btn !px-3 !py-1.5 text-xs " + (isDone ? "btn-ghost text-lime" : "btn-lime")}>
                      <Check size={14} />{isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button onClick={() => remove(tab, w)} aria-label={`Remove ${w.name}`} className="p-1.5 text-mute hover:text-white"><X size={16} /></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
