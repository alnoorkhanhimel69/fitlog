// API endpoint (override with NEXT_PUBLIC_API_URL if needed)
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.api-store.workers.dev/api/fitlog";

const pick = (o, keys, d) => {
  for (const k of keys) if (o && o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
  return d;
};
const toList = (v) =>
  Array.isArray(v) ? v.map(String) : String(v || "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
const num = (v) => {
  const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

// Accepts different response shapes: [..] or { data|workouts|exercises|items|results: [..] }
function extractArray(json) {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object") {
    for (const k of ["data", "workouts", "exercises", "items", "results"]) if (Array.isArray(json[k])) return json[k];
    const first = Object.values(json).find(Array.isArray);
    if (first) return first;
  }
  return [];
}

// Maps one API item to the shape the UI uses
export function normalize(w, i) {
  const equipment = pick(w, ["equipment", "equipments"], "Bodyweight");
  return {
    id: String(pick(w, ["id", "_id", "slug"], i + 1)),
    name: String(pick(w, ["name", "title"], "Workout")),
    description: String(pick(w, ["description", "summary", "subtitle"], "")),
    tags: toList(pick(w, ["tags", "categories", "category", "muscles", "muscleGroups", "muscle_groups"], [])),
    equipment: toList(equipment).join(", "),
    difficulty: String(pick(w, ["difficulty", "level"], "Beginner")),
    sets: pick(w, ["sets"], "-"),
    reps: pick(w, ["reps", "repetitions"], "-"),
    duration: num(pick(w, ["duration", "durationMin", "duration_min", "minutes", "time"], 0)),
    calories: num(pick(w, ["calories", "kcal", "caloriesBurned"], 0)),
    rating: num(pick(w, ["rating", "rate", "stars"], 0)),
    steps: toList(pick(w, ["instructions", "steps"], [])),
    image: pick(w, ["image", "imageUrl", "image_url", "thumbnail", "img", "photo"], ""),
  };
}

export async function fetchWorkouts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Could not load workouts (" + res.status + ")");
  return extractArray(await res.json()).map(normalize);
}
