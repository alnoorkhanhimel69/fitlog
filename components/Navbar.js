"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/app/providers";
import { Dumbbell } from "./Icons";

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = useApp();
  const link = (href, label, active) => (
    <Link href={href} aria-current={active ? "page" : undefined}
      className={"rounded-full px-3 py-1.5 text-xs transition sm:px-4 " + (active ? "bg-lime/15 text-lime" : "text-mute hover:text-white")}>
      {label}
    </Link>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-wide">
          <Dumbbell size={20} className="text-lime" /><span className="hidden min-[380px]:inline">FitLog</span>
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main">
          {link("/", "Workouts", path === "/" || path.startsWith("/workout"))}
          {link("/my-plan", "My Plan", path === "/my-plan")}
        </nav>
        <div className="flex items-center gap-2 text-xs">
          <Link href="/my-plan" aria-label={`Plan: ${plan.length}`} className="flex items-center gap-1.5 text-mute">
            Plan <span className="min-w-[22px] rounded-full bg-lime px-1.5 py-0.5 text-center font-bold text-black">{plan.length}</span>
          </Link>
          <Link href="/my-plan" aria-label={`Saved: ${saved.length}`} className="flex items-center gap-1.5 text-mute">
            Saved <span className="min-w-[22px] rounded-full border border-white/40 px-1.5 py-0.5 text-center font-semibold text-white">{saved.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
