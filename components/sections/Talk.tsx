"use client";

import { BsTelephone, BsEnvelope, BsGeoAlt, BsWhatsapp, BsArrowRight } from "react-icons/bs";
import { site } from "@/content/site-data";
import Reveal from "@/components/Reveal";
import { track } from "@/lib/analytics";

// Direct contact options only. The page already has one lead form (Diwali plan, also in
// the popup), so a second near-identical form here would just make visitors choose.
const WA_MESSAGE = "Hi BrandHeist! I have a question about your services.";

type Item = {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
  event?: string;
};

const ITEMS: Item[] = [
  { Icon: BsTelephone, title: "Buzz Us", value: site.phoneDisplay, href: site.phoneHref, event: "phone_click" },
  { Icon: BsWhatsapp, title: "Chat With Us", value: "Message us on WhatsApp", href: `${site.whatsapp}?text=${encodeURIComponent(WA_MESSAGE)}`, external: true, event: "whatsapp_click" },
  { Icon: BsEnvelope, title: "Write Us", value: site.email, href: site.emailHref },
  { Icon: BsGeoAlt, title: "Find Us", value: site.address },
];

export default function Talk() {
  return (
    <section id="talk" className="py-24 md:py-32">
      <Reveal className="section-title container mx-auto mb-12 max-w-7xl px-4">
        <h2>Let&apos;s Talk</h2>
        <p>Don&apos;t Be Shy We&rsquo;re Nicer Than We Look</p>
      </Reveal>

      <div className="container mx-auto max-w-7xl px-4">
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <InfoItem key={item.title} {...item} />
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-8 text-center text-[15px] text-[#fffaf0]/60">
          Want a festive plan for your business instead?{" "}
          <a href="#get-free-audit" className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-accent hover:underline">
            Get My Diwali Plan <BsArrowRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function InfoItem({ Icon, title, value, href, external, event }: Item) {
  const body = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-lg text-accent">
        <Icon />
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-base font-bold text-heading">{title}</span>
        <span className="block wrap-break-word text-[#fffaf0]/70 transition-colors group-hover:text-accent">{value}</span>
      </span>
    </>
  );
  const box = "flex h-full items-start gap-4 rounded-xl bg-white/3 p-5";

  // Whole card is the tap target when it does something.
  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => event && track(event, { link_url: href, link_location: "talk" })}
      className={`group ${box} transition-colors hover:bg-white/6`}
    >
      {body}
    </a>
  ) : (
    <div className={box}>{body}</div>
  );
}
