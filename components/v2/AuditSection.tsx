"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site-data";
import { Arrow, EASE, MONO, SectionLabel } from "./ui";

const STEPS = [
  "We audit your site for SEO, speed, and conversion gaps",
  "We put together a clear, tailored findings report",
  "We reach out to walk you through every finding",
];

type Values = { name: string; phone: string; business: string; message: string };
type Field = "name" | "phone" | "business";
type Status = "idle" | "loading" | "sent" | "error";

function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!v.name.trim()) e.name = "Add your name so we know who to reply to.";
  const digits = v.phone.replace(/\D/g, ""); // accept spaces, dashes, +91 etc.
  if (!digits) e.phone = "Add a phone number. We only use it for the audit.";
  else if (digits.length < 7 || digits.length > 15) e.phone = "That number looks too short or long. Include the country code if you're outside India.";
  if (!v.business.trim()) e.business = "Add your website or business name so we know what to audit.";
  return e;
}

const EMPTY: Values = { name: "", phone: "", business: "", message: "" };

// mock = simulate the request (used on /mockup so nothing is really sent).
export default function AuditSection({ mock = false }: { mock?: boolean }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const errors = validate(values);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: Field) => () => setTouched((t) => ({ ...t, [k]: true }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, phone: true, business: true });
    const firstBad = (["name", "phone", "business"] as Field[]).find((f) => errors[f]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      if (mock) {
        await new Promise((r) => setTimeout(r, 1100));
        setStatus("sent");
        return;
      }
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: site.web3forms.audit, ...values }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      window.location.href = "/thank-you/?form=audit";
    } catch {
      setStatus("error"); // values are kept, so nothing has to be retyped
    }
  }

  return (
    <section id="get-free-audit" className="scroll-mt-16 border-t border-white/[0.06] bg-[#0d0c09] py-24 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Left: pitch + what happens next */}
        <div className="min-w-0 lg:col-span-5">
          <SectionLabel>Audits</SectionLabel>
          <h2 className="mt-5 font-heading text-[clamp(2.6rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#f6efe1] text-balance">
            This One&rsquo;s On Us
          </h2>
          <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-[#f6efe1]/60">
            Send us your site. We&apos;ll dig in and come back with real, actionable findings, usually within 24 hours.
          </p>

          <ol className="relative mt-12 space-y-8">
            <span className="absolute bottom-3 left-[15px] top-3 w-px bg-white/10" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <li key={s} className="relative flex gap-5">
                <span className={`${MONO} relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#f4b63d]/40 bg-[#0d0c09] text-[12px] text-[#f4b63d]`}>
                  {i + 1}
                </span>
                <span className="pt-1 text-[15.5px] leading-relaxed text-[#f6efe1]/80">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: the form (or its success state) */}
        <div className="min-w-0 lg:col-span-7">
          <div className="rounded-[28px] border border-white/[0.08] bg-[#13110c] p-6 md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <Success key="sent" onReset={() => { setValues(EMPTY); setTouched({}); setStatus("idle"); }} />
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-5"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Input label="Your name" name="name" autoComplete="name" value={values.name} onChange={set("name")} onBlur={blur("name")} error={touched.name ? errors.name : undefined} />
                    <Input label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" hint="Any format works, e.g. +91 91379 20469" value={values.phone} onChange={set("phone")} onBlur={blur("phone")} error={touched.phone ? errors.phone : undefined} />
                  </div>
                  <Input label="Website URL or business name" name="business" autoComplete="url" value={values.business} onChange={set("business")} onBlur={blur("business")} error={touched.business ? errors.business : undefined} />
                  <label className="grid gap-2">
                    <span className="text-[13.5px] font-medium text-[#f6efe1]/80">
                      What should we audit first? <span className="text-[#f6efe1]/40">(optional)</span>
                    </span>
                    <textarea
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={set("message")}
                      placeholder="e.g. Our traffic dropped after March. Or: is our site slow on mobile?"
                      className="resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-[#f6efe1] outline-none transition-colors placeholder:text-[#f6efe1]/30 focus:border-[#f4b63d] focus:bg-white/[0.05]"
                    />
                  </label>

                  {status === "error" && (
                    <p role="alert" className="rounded-2xl border border-[#ff6a4a]/40 bg-[#ff6a4a]/10 px-4 py-3 text-[14px] text-[#ffb3a3]">
                      We couldn&apos;t send that. Check your connection and try again. Your answers are still here.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group mt-1 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#f4b63d] text-[15px] font-bold text-[#0a0907] transition-[background-color,transform] duration-200 hover:bg-[#ffc757] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a0907]/30 border-t-[#0a0907]" />
                        Sending your request…
                      </>
                    ) : (
                      <>
                        {status === "error" ? "Try again" : "Request Free Audit"}
                        <Arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[13px] text-[#f6efe1]/40">Free. No pitch attached. Reply usually within 24 hours.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({
  label,
  hint,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: Field; hint?: string; error?: string }) {
  const id = `audit-${props.name}`;
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className="grid content-start gap-2">
      <label htmlFor={id} className="text-[13.5px] font-medium text-[#f6efe1]/80">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`h-14 rounded-2xl border bg-white/[0.03] px-4 text-[15px] text-[#f6efe1] outline-none transition-colors focus:bg-white/[0.05] ${
          error ? "border-[#ff6a4a]/70 focus:border-[#ff6a4a]" : "border-white/10 focus:border-[#f4b63d]"
        }`}
        {...props}
      />
      {error ? (
        <p id={`${id}-err`} className="text-[13px] text-[#ff9a85]">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[12.5px] text-[#f6efe1]/40">{hint}</p>
      ) : null}
    </div>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="py-6 text-center"
      role="status"
    >
      <svg viewBox="0 0 56 56" className="mx-auto h-14 w-14" aria-hidden="true">
        <circle cx="28" cy="28" r="26" fill="none" stroke="#f4b63d" strokeOpacity="0.25" strokeWidth="2" />
        <motion.path
          d="M17 29l7 7 15-16"
          fill="none"
          stroke="#f4b63d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        />
      </svg>
      <h3 className="mt-6 font-heading text-[30px] font-extrabold tracking-[-0.02em] text-[#f6efe1]">Your audit is in the queue.</h3>
      <p className="mx-auto mt-3 max-w-[40ch] text-[15px] leading-relaxed text-[#f6efe1]/60">
        We&apos;ll dig into your site and come back with real, actionable findings, usually within 24 hours.
      </p>
      <button type="button" onClick={onReset} className="mt-8 min-h-[44px] text-[14px] font-semibold text-[#f4b63d] hover:underline">
        Request another audit
      </button>
    </motion.div>
  );
}
