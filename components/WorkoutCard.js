import Link from "next/link";
import WorkoutImage from "./WorkoutImage";
import Stats from "./Stats";

export default function WorkoutCard({ w }) {
  return (
    <Link href={`/workout/${w.id}`} className="group block overflow-hidden rounded-2xl border border-line bg-panel transition hover:border-white/25">
      <WorkoutImage src={w.image} alt={w.name} className="h-40 w-full object-cover" />
      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">{w.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        <h3 className="font-display text-base font-bold uppercase tracking-wide">{w.name}</h3>
        <p className="text-xs text-mute">{w.equipment}</p>
        <Stats w={w} className="mt-3.5 border-t border-line pt-3" />
      </div>
    </Link>
  );
}
