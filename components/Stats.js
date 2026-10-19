import { Clock, Flame, Star } from "./Icons";

export default function Stats({ w, className = "" }) {
  return (
    <div className={"flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mute " + className}>
      <span className="flex items-center gap-1.5"><Clock size={13} />{w.duration} min</span>
      <span className="flex items-center gap-1.5"><Flame size={13} />{w.calories} kcal</span>
      <span className="flex items-center gap-1.5"><Star size={13} />{w.rating}</span>
    </div>
  );
}
