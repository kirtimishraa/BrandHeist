import Image from "next/image";
import { clients } from "@/content/site-data";
import Reveal from "@/components/Reveal";

// Two marquee rows drifting in opposite directions, the client list split evenly
// between them (no brand appears in both). A row's 7 tiles are narrower than wide
// screens, so each row repeats its own set to make one loop copy wider than the
// viewport; the track is that copy twice, so the -50% loop never shows a gap.
const half = Math.ceil(clients.length / 2);
const REPEAT = 2;
const ROWS = [clients.slice(0, half), clients.slice(half)].map((row) =>
  Array.from({ length: REPEAT }, () => row).flat()
);
const PER_ROW = half;

export default function Flex() {
  return (
    <section id="flex" className="py-24 md:py-32">
      <Reveal className="section-title container mx-auto mb-12 max-w-7xl px-4">
        <h2>The Flex</h2>
        <p>Brands We Have Worked With</p>
      </Reveal>

      <Reveal className="space-y-5">
        {ROWS.map((row, r) => (
          <div
            key={r}
            className="marquee-mask relative overflow-hidden mask-[linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
          >
            <div className="marquee-track gap-5 px-3" style={{ animationDuration: "110s", animationDirection: r ? "reverse" : "normal" }}>
              {[...row, ...row].map((c, i) => (
                <div
                  key={`${c.src}-${i}`}
                  className="flex h-24 w-44 shrink-0 items-center justify-center rounded-xl bg-white/4 p-5"
                >
                  <Image
                    src={c.src}
                    alt={i < PER_ROW ? c.alt : ""}
                    width={140}
                    height={64}
                    className="max-h-14 w-auto object-contain opacity-80 transition hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
