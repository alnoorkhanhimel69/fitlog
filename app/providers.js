"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchWorkouts } from "@/lib/data";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);
export const CAP = 5; // max lifts in today's plan

export default function Providers({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    fetchWorkouts().then(setWorkouts).catch((e) => setError(e.message || "Something went wrong")).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  // restore from localStorage once, then keep it in sync
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("fitlog") || "{}");
      setPlan(s.plan || []); setSaved(s.saved || []); setDone(s.done || []);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("fitlog", JSON.stringify({ plan, saved, done })); } catch {}
  }, [plan, saved, done, ready]);

  const notify = useCallback((m) => setToast({ m, k: Date.now() }), []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const byId = (id) => workouts.find((w) => w.id === String(id));

  const addToPlan = (w) => {
    if (plan.includes(w.id)) return notify("Already in today's plan");
    if (plan.length >= CAP) return notify(`Plan is full — max ${CAP} lifts`);
    setPlan([...plan, w.id]);
    notify("Added to today's plan");
  };
  const saveForLater = (w) => {
    if (saved.includes(w.id)) return notify("Already saved");
    setSaved([...saved, w.id]);
    notify("Saved for later");
  };
  const remove = (list, w) => {
    if (list === "plan") { setPlan(plan.filter((x) => x !== w.id)); setDone(done.filter((x) => x !== w.id)); notify("Removed from today's plan"); }
    else { setSaved(saved.filter((x) => x !== w.id)); notify("Removed from saved"); }
  };
  const toggleDone = (w) => {
    const on = done.includes(w.id);
    setDone(on ? done.filter((x) => x !== w.id) : [...done, w.id]);
    notify(on ? "Marked as not done" : "Marked as done — nice work");
  };

  return (
    <Ctx.Provider value={{ workouts, loading, error, load, plan, saved, done, byId, addToPlan, saveForLater, remove, toggleDone }}>
      {children}
      {toast && (
        <div key={toast.k} role="status" aria-live="polite"
          className="toast-in fixed bottom-6 left-1/2 z-50 rounded-lg bg-lime px-5 py-2.5 text-sm font-semibold text-black shadow-lg">
          {toast.m}
        </div>
      )}
    </Ctx.Provider>
  );
}
