import Reveal from "@/components/Reveal";
import AuditForm from "@/components/AuditForm";

// Target of every "Get My Diwali Plan" button (id kept as #get-free-audit so
// existing links and campaign URLs keep working).
export default function GetFreeAudit() {
  return (
    <section id="get-free-audit" className="border-y border-white/[0.06] bg-white/[0.025] py-24 md:py-32">
      <Reveal className="section-title container mx-auto mb-4 max-w-7xl px-4">
        <h2>Diwali Plans</h2>
        <p>Get Your Free Diwali Plan</p>
      </Reveal>
      <Reveal className="container mx-auto mb-10 max-w-7xl px-4">
        <p className="max-w-2xl text-[15px] leading-relaxed text-[#fffaf0]/65 md:text-base">
          Tell us about your business and get a free business audit to plan your festive growth.
        </p>
      </Reveal>

      <Reveal className="container mx-auto max-w-4xl px-4">
        <AuditForm />
      </Reveal>
    </section>
  );
}
