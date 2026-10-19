const base = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const mk = (d) => function Icon({ size = 16, className = "" }) {
  return <svg {...base} width={size} height={size} className={className}>{d}</svg>;
};
export const Clock = mk(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const Flame = mk(<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z" />);
export const Star = mk(<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />);
export const Check = mk(<path d="m5 12 5 5 9-10" />);
export const Plus = mk(<path d="M12 5v14M5 12h14" />);
export const Bookmark = mk(<path d="M6 4h12v17l-6-4-6 4z" />);
export const Chevron = mk(<path d="m6 9 6 6 6-6" />);
export const X = mk(<path d="M6 6l12 12M18 6 6 18" />);
export const Search = mk(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const ArrowDown = mk(<path d="M12 5v14m0 0 6-6m-6 6-6-6" />);
export const Dumbbell = mk(<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11" />);
