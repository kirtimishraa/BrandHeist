import Image from "next/image";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { crew } from "@/content/site-data";
import Reveal from "@/components/Reveal";

export default function Crew() {
  return (
    <section id="crew" className="py-20">
      <Reveal className="section-title container mx-auto mb-12 max-w-7xl px-4">
        <h2>The Crew</h2>
        <p>Mischief Minds Built For Virality</p>
      </Reveal>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {crew.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="flex items-end justify-between p-5">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-heading">{m.name}</h4>
                    <span className="text-sm text-accent">{m.role}</span>
                  </div>
                  <div className="flex gap-2">
                    <a href={m.linkedin} aria-label={`${m.name} on LinkedIn`} target="_blank" rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#fffaf0]/70 transition hover:bg-accent hover:text-contrast">
                      <BsLinkedin />
                    </a>
                    <a href={m.x} aria-label={`${m.name} on X`} target="_blank" rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[#fffaf0]/70 transition hover:bg-accent hover:text-contrast">
                      <BsTwitterX />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
