import Image from "next/image";
import { clients } from "@/content/site-data";
import Reveal from "@/components/Reveal";

export default function Flex() {
  const loop = [...clients, ...clients]; // duplicate for seamless marquee
  return (
    <section id="flex" className="py-20">
      <div className="section-title container mx-auto mb-12 max-w-7xl px-4 text-center">
        <h2>The Flex</h2>
        <p>Brands We Have Worked With</p>
      </div>

      <Reveal>
        <div className="marquee-mask relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee-track gap-6 px-3">
            {loop.map((c, i) => (
              <div
                key={`${c.src}-${i}`}
                className="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-5"
              >
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={140}
                  height={64}
                  className="max-h-14 w-auto object-contain opacity-80 transition hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
