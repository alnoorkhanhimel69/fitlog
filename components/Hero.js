import { ArrowDown } from "./Icons";

export default function Hero() {
  return (
    <section className="grid items-center gap-8 rounded-2xl border border-line bg-panel px-6 py-10 sm:px-10 md:grid-cols-2 md:py-14">
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-lime">Workout Library</p>
        <h1 className="mb-4 font-display text-4xl font-bold uppercase leading-[1.1] sm:text-5xl">Train with intent. Log every set.</h1>
        <p className="mb-6 max-w-md text-sm text-mute">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn btn-lime uppercase tracking-wide">Browse workouts <ArrowDown size={16} /></a>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/workout-hero.png" alt="workout-hero" className="mx-auto w-full max-w-xs md:max-w-sm" />
    </section>
  );
}
