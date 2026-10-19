"use client";
import { useState } from "react";

// Shows the API image, falls back to a local illustration if it is missing or broken
export default function WorkoutImage({ src, alt, className = "" }) {
  const [bad, setBad] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={!src || bad ? "/placeholder.svg" : src} alt={alt} onError={() => setBad(true)} className={className} loading="lazy" />
  );
}
