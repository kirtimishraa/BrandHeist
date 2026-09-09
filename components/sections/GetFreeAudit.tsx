import { site } from "@/content/site-data";
import Reveal from "@/components/Reveal";
import Web3Form from "@/components/Web3Form";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-heading placeholder:text-[#fffaf0]/40 focus:border-accent focus:outline-none";

export default function GetFreeAudit() {
  return (
    <section id="get-free-audit" className="py-20">
      <Reveal className="section-title container mx-auto mb-10 max-w-7xl px-4">
        <h2>Audits</h2>
        <p>This One&rsquo;s On Us</p>
      </Reveal>

      <Reveal className="container mx-auto max-w-4xl px-4">
        <Web3Form
          name="get-audit"
          accessKey={site.web3forms.audit}
          sentMessage="Your Audit request was sent. We will contact you shortly. Thank you!"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <input type="text" name="name" placeholder="Your Name" required className={inputClass} />
            <input type="tel" name="phone" placeholder="Phone" required className={inputClass} />
            <input type="text" name="business" placeholder="Website URL or Business Name" required className={`${inputClass} md:col-span-1`} />
          </div>
          <textarea name="message" rows={5} placeholder="What should we audit first?" className={`${inputClass} mt-4`} />
          <div className="mt-5 text-center">
            <button type="submit" className="rounded-xl bg-accent px-6 py-3 font-extrabold text-contrast transition hover:brightness-110 hover:-translate-y-0.5">
              Request Free Audit
            </button>
          </div>
        </Web3Form>
      </Reveal>
    </section>
  );
}
