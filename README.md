# FitLog — Workout Library

A dark, no-nonsense gym companion. Browse a library of lifts, lock your picks into today's plan, save others for later, and watch minutes and calories add up.

**Live demo:** _add your Vercel/Netlify link here_

## Technologies Used

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- Fetch API + `localStorage`
- Deployed on Vercel / Netlify

## Key Features

1. **Workout library** — responsive 3-column grid (1 on mobile, 2 on tablet) loaded from the FitLog API, with a loading spinner and retry on error.
2. **Search** — filter the library by workout name or muscle tag.
3. **Workout details** — two-column page with specs table, 4-step instructions, "Add to today's plan" and "Save for later" buttons, each with a toast.
4. **My Plan** — Today's Plan / Saved tabs. Exercises, Minutes and Calories totals update live and **change when you switch tabs**.
5. **Sort, Mark as Done and Remove** — sort by Duration, Calories or Rating; mark lifts done; remove with the X button.
6. **5-lift cap** — "Add to today's plan" is disabled once the plan has 5 lifts.
7. **Persistence** — plan, saved and done lists survive a page reload via `localStorage`.
8. **Navbar badges** — live Plan (filled) and Saved (outline) counters that link to `/my-plan`.
9. **Custom 404 page** and fully responsive layout (mobile, tablet, desktop).

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # run the production build
```

The API URL is set in `lib/data.js` and can be overridden with `NEXT_PUBLIC_API_URL`.

## Project Structure

```
app/            pages (home, workout/[id], my-plan, not-found) + providers (state)
components/     Navbar, Hero, Footer, WorkoutCard, Stats, Spinner, Icons
lib/data.js     API fetch + response normalizer
public/         hero and placeholder illustrations
```

## Deployment

Import the repository in Vercel or Netlify (Next.js is auto-detected). Every route is handled by Next.js, so reloading any page works.
