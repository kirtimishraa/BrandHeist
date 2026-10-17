"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

// Components use the light `m` element; the ~40KB animation engine downloads in the background
// instead of blocking first load. `strict` makes a stray `motion.` import fail loudly in dev.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
