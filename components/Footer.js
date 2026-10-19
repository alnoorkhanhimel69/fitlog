import Link from "next/link";
import { Dumbbell } from "./Icons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-mute sm:flex-row sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-white">
          <Dumbbell size={18} className="text-lime" /> FitLog
        </Link>
        <p className="text-center">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
