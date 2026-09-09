import { BsTelephone, BsEnvelope, BsGeoAlt } from "react-icons/bs";
import { site } from "@/content/site-data";
import Reveal from "@/components/Reveal";
import Web3Form from "@/components/Web3Form";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-heading placeholder:text-[#fffaf0]/40 focus:border-accent focus:outline-none";

export default function Talk() {
  return (
    <section id="talk" className="py-20">
      <Reveal className="section-title container mx-auto mb-12 max-w-7xl px-4">
        <h2>Let&apos;s Talk</h2>
        <p>Don&apos;t Be Shy We&rsquo;re Nicer Than We Look</p>
      </Reveal>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Info */}
          <Reveal className="space-y-4">
            <InfoItem Icon={BsTelephone} title="Buzz Us" href={site.phoneHref} value={site.phoneDisplay} />
            <InfoItem Icon={BsEnvelope} title="Write Us" href={site.emailHref} value={site.email} />
            <InfoItem Icon={BsGeoAlt} title="Find Us" value={site.address} />
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <Web3Form name="contact-us" accessKey={site.web3forms.contact} sentMessage="Your message has been sent. Thank you!">
              <div className="grid gap-4 md:grid-cols-2">
                <input type="text" name="name_contact" placeholder="Your Name" required className={inputClass} />
                <input type="tel" name="phone_contact" placeholder="Phone" required className={inputClass} />
              </div>
              <input type="text" name="business_contact" placeholder="Website URL or Business Name" required className={`${inputClass} mt-4`} />
              <textarea name="message" rows={6} placeholder="Message" required className={`${inputClass} mt-4`} />
              <div className="mt-5 text-center">
                <button type="submit" className="rounded-xl bg-accent px-6 py-3 font-extrabold text-contrast transition hover:brightness-110 hover:-translate-y-0.5">
                  Send Message
                </button>
              </div>
            </Web3Form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  Icon,
  title,
  value,
  href,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-lg text-accent">
        <Icon />
      </div>
      <div>
        <h3 className="font-heading text-base font-bold text-heading">{title}</h3>
        {href ? (
          <a href={href} className="text-[#fffaf0]/70 hover:text-accent">{value}</a>
        ) : (
          <p className="text-[#fffaf0]/70">{value}</p>
        )}
      </div>
    </div>
  );
}
