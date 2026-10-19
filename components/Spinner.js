export default function Spinner({ label = "Loading workouts…" }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-4 py-24 text-mute">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-lime" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
