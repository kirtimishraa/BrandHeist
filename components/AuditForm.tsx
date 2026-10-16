import { site } from "@/content/site-data";
import Web3Form from "@/components/Web3Form";

// `peer` lets the error line below each field react to the field's validity.
// `:user-invalid` only matches after the visitor has interacted (or tried to submit),
// so nobody sees red before they've typed anything.
const inputClass =
  "peer w-full rounded-xl border border-transparent bg-white/[0.06] px-4 py-3 text-heading placeholder:text-[#fffaf0]/35 transition-[border-color,box-shadow,background-color] duration-200 focus:border-accent/20 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-accent/[0.06] [&:user-invalid]:border-accent-3/50";

const labelClass = "mb-1.5 block text-[13px] font-medium text-[#fffaf0]/75";
const hintClass = "mt-1.5 block text-xs text-[#fffaf0]/45 peer-[:user-invalid]:hidden";
const errorClass = "mt-1.5 hidden text-xs text-accent-3 peer-[:user-invalid]:block";

function Field({
  label,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  error: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>{label}</span>
      {children}
      {hint && <span className={hintClass}>{hint}</span>}
      <span className={errorClass}>{error}</span>
    </label>
  );
}

// The Diwali plan request form, shared by the in-page section and the on-visit
// popup so both stay identical. `source` travels with the submission (shown in the
// Web3Forms email) to tell the two apart.
export default function AuditForm({
  variant = "page",
  source = "page",
}: {
  variant?: "page" | "popup";
  source?: string;
}) {
  const popup = variant === "popup";
  return (
    <Web3Form
      name="get-audit"
      accessKey={site.web3forms.audit}
      sentMessage="Request sent. Taking you to the next step…"
    >
      <input type="hidden" name="source" value={source} />
      <div className={popup ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "grid grid-cols-1 gap-4 md:grid-cols-3"}>
        <Field label="Your name" error="Please add your name so we know who to reply to.">
          <input type="text" name="name" placeholder="Elon Musk" autoComplete="name" required className={inputClass} />
        </Field>
        <Field label="Phone" error="Please add a phone number we can call or WhatsApp.">
          <input type="tel" name="phone" placeholder="Your mobile number" autoComplete="tel" inputMode="tel" minLength={7} required className={inputClass} />
        </Field>
        <Field
          label="Website or business name"
          error="Please add your website or business name."
          className={popup ? "sm:col-span-2" : ""}
        >
          <input type="text" name="business" placeholder="e.g. www.spacex.com" autoComplete="organization" required className={inputClass} />
        </Field>
      </div>
      <label className={`block ${popup ? "mt-4" : "mt-4"}`}>
        <span className={labelClass}>
          Anything we should know? <span className="text-[#fffaf0]/40">(optional)</span>
        </span>
        <textarea
          name="message"
          rows={popup ? 3 : 4}
          placeholder="e.g. We build rockets and spacecraft and want to sell more this Diwali"
          className={`${inputClass} resize-none`}
        />
      </label>
      <div className={popup ? "mt-5" : "mt-6 text-center"}>
        <button
          type="submit"
          className={`rounded-xl bg-accent px-6 py-3 font-extrabold text-contrast transition hover:brightness-110 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-60 ${popup ? "w-full" : ""}`}
        >
          Get My Diwali Plan
        </button>
        <p className="mt-3 text-xs text-[#fffaf0]/45">We usually reply within 24 hours.</p>
      </div>
    </Web3Form>
  );
}
