"use client";

import { useState, type ReactNode } from "react";

type FormName = "get-audit" | "contact-us" | "newsletter";

const FORM_TYPE_MAP: Record<FormName, string> = {
  "get-audit": "audit",
  "contact-us": "contact",
  newsletter: "newsletter",
};

const GA_EVENT_MAP: Record<FormName, string> = {
  "get-audit": "audit_form_submit",
  "contact-us": "message_form_submit",
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

    // GA4 event (matches original inline tracking)
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...a: unknown[]) => void }).gtag("event", GA_EVENT_MAP[name], {
        form_name: name,
        form_location: window.location.href,
      });
    }

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
      setErrorMsg(err instanceof Error ? err.message : "Connection error. Check your internet and try again.");
    }
  }

  return (
    <form name={name} method="post" onSubmit={onSubmit} className={className}>
      <input type="hidden" name="access_key" value={accessKey} />
      <fieldset disabled={state === "loading"} className="m-0 border-0 p-0 min-w-0">
        {children}
      </fieldset>

      {state === "loading" && <div className="form-msg loading mt-3">Loading</div>}
      {state === "error" && <div className="form-msg error mt-3">{errorMsg}</div>}
      {state === "sent" && <div className="form-msg sent mt-3">{sentMessage}</div>}
    </form>
  );
}
