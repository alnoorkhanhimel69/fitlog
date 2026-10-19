"use client";
import Link from "next/link";
import WorkoutImage from "@/components/WorkoutImage";
import Spinner from "@/components/Spinner";
import { Plus, Bookmark, Check } from "@/components/Icons";
import { useApp, CAP } from "../../providers";

export default function WorkoutDetail({ params }) {
  const { loading, byId, plan, saved, addToPlan, saveForLater } = useApp();
  if (loading) return <Spinner label="Loading workout…" />;
  const w = byId(decodeURIComponent(params.id));
  if (!w) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-2 font-display text-3xl font-bold uppercase">Workout not found</h1>
        <p className="mb-6 text-sm text-mute">That lift is not in the library.</p>
        <Link href="/" className="btn btn-lime">Go to workouts</Link>
      </div>
    );
  }
  const inPlan = plan.includes(w.id), isSaved = saved.includes(w.id);
  const full = !inPlan && plan.length >= CAP;
  const specs = [["Equipment", w.equipment], ["Difficulty", w.difficulty], ["Sets", w.sets], ["Reps", w.reps], ["Duration", `${w.duration} min`], ["Calories", `${w.calories} kcal`], ["Rating", w.rating]];

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] lg:gap-12">
      <WorkoutImage src={w.image} alt={w.name} className="aspect-square w-full rounded-2xl object-cover md:sticky md:top-24" />
      <div>
        <h1 className="mb-2 font-display text-3xl font-bold uppercase tracking-wide">{w.name}</h1>
        <p className="mb-4 text-sm text-mute">{w.description}</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {w.tags.map((t) => <span key={t} className="tag normal-case">{t}</span>)}
        </div>
        <dl className="mb-6 divide-y divide-line rounded-xl border border-line bg-panel">
          {specs.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-4 py-3 text-xs">
              <dt className="uppercase tracking-wider text-mute">{k}</dt><dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-wide">Instructions</h2>
        <ol className="mb-6 list-decimal space-y-1 pl-5 text-sm text-white/80">
          {w.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => addToPlan(w)} disabled={inPlan || full} className="btn btn-lime">
            {inPlan ? <Check size={16} /> : <Plus size={16} />}
            {inPlan ? "In today's plan" : full ? `Plan full (${CAP}/${CAP})` : "Add to today's plan"}
          </button>
          <button onClick={() => saveForLater(w)} disabled={isSaved} className="btn btn-ghost">
            {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
            {isSaved ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}
