"use client";

import { useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { site } from "@/content/site-data";

type FormName = "get-audit" | "newsletter";

const FORM_TYPE_MAP: Record<FormName, string> = {
  "get-audit": "audit",
  newsletter: "newsletter",
};

const GA_EVENT_MAP: Record<FormName, string> = {
  "get-audit": "audit_form_submit",
  newsletter: "newsletter_signup",
};

type State = "idle" | "loading" | "sent" | "error";

// Reusable Web3Forms handler — mirrors the original form-handler.js:
// intercept submit, POST to Web3Forms, fire GA4 event, redirect to thank-you.
export default function Web3Form({
  name,
  accessKey,
  sentMessage,
  className,
  children,
}: {
  name: FormName;
  accessKey: string;
  sentMessage: string;
  className?: string;
  children: ReactNode;
}) {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("loading");

    // GTM dataLayer event (GA4 event is mapped in the GTM container)
    track(GA_EVENT_MAP[name], { form_name: name, form_location: window.location.href });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        setState("sent");
        setTimeout(() => {
          window.location.href = `/thank-you/?form=${FORM_TYPE_MAP[name]}`;
        }, 500);
      } else {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setState("error");
      // Network failures surface as a TypeError ("Failed to fetch") — say it plainly.
      setErrorMsg(
        err instanceof TypeError || !(err instanceof Error)
          ? "We couldn't reach our server. Check your internet connection and try again."
          : err.message
      );
    }
  }

  return (
    <form name={name} method="post" onSubmit={onSubmit} className={className}>
      <input type="hidden" name="access_key" value={accessKey} />
      <fieldset disabled={state === "loading"} className="m-0 border-0 p-0 min-w-0">
        {children}
      </fieldset>

      {/* Immediate feedback (well under 400ms): fields lock and a status line appears */}
      {state === "loading" && (
        <div role="status" className="form-msg loading mt-3 flex items-center justify-center gap-2.5">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-accent" aria-hidden="true" />
          Sending…
        </div>
      )}
      {state === "error" && (
        <div role="alert" className="form-msg error mt-3">
          {errorMsg} Your details are still filled in, so just press the button again, or{" "}
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            message us on WhatsApp
          </a>
          .
        </div>
      )}
      {state === "sent" && <div role="status" className="form-msg sent mt-3">{sentMessage}</div>}
    </form>
  );
}
