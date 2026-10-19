"use client";
import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Spinner from "@/components/Spinner";
import { Search } from "@/components/Icons";
import { useApp } from "./providers";

export default function Home() {
  const { workouts, loading, error, load } = useApp();
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return workouts;
    return workouts.filter((w) => w.name.toLowerCase().includes(s) || w.tags.some((t) => t.toLowerCase().includes(s)));
  }, [workouts, q]);

  return (
    <>
      <Hero />
      <section id="library" className="scroll-mt-20 pt-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">The Library</h2>
            <p className="text-sm text-mute">Twelve lifts covering every major muscle group.</p>
          </div>
          <label className="relative block sm:w-64">
            <span className="sr-only">Search workouts</span>
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or tag"
              className="w-full rounded-lg border border-line bg-panel py-2 pl-9 pr-3 text-sm placeholder:text-mute focus:border-lime focus:outline-none" />
          </label>
        </div>

        {loading ? <Spinner /> : error ? (
          <div className="rounded-2xl border border-dashed border-line py-16 text-center">
            <p className="mb-4 text-sm text-mute">{error}</p>
            <button onClick={load} className="btn btn-lime">Try again</button>
          </div>
        ) : list.length === 0 ? (
          <p className="py-16 text-center text-sm text-mute">No workouts match &ldquo;{q}&rdquo;.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((w) => <WorkoutCard key={w.id} w={w} />)}</div>
        )}
      </section>
    </>
  );
}
