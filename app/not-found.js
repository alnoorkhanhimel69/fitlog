import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="font-display text-7xl font-bold text-lime">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase">Page not found</h1>
      <p className="mb-6 mt-2 text-sm text-mute">That page doesn&apos;t exist. Head back to the library.</p>
      <Link href="/" className="btn btn-lime">Go to workouts</Link>
    </div>
  );
}
