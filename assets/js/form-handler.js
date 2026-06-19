/**
 * BrandHeist — Web3Forms AJAX Handler
 * Intercepts all .php-email-form submissions, posts via fetch,
 * then redirects to thank-you.html?form=<type> on success.
 */
(function () {
  "use strict";

  const FORM_TYPE_MAP = {
    "get-audit"  : "audit",
    "contact-us" : "contact",
    "newsletter" : "newsletter"
  };

  function setState(form, state, msg) {
    const loading  = form.querySelector(".loading");
    const errorEl  = form.querySelector(".error-message");
    const sentEl   = form.querySelector(".sent-message");
    const submitEl = form.querySelector("[type='submit']");

    if (loading)  loading.style.display  = state === "loading" ? "block" : "none";
    if (errorEl)  errorEl.style.display  = state === "error"   ? "block" : "none";
    if (sentEl)   sentEl.style.display   = state === "sent"    ? "block" : "none";
    if (submitEl) submitEl.disabled      = state === "loading";

    if (state === "error" && msg && errorEl) errorEl.textContent = msg;
  }

  document.querySelectorAll("form.php-email-form").forEach(function (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formName = form.getAttribute("name") || "unknown";
      setState(form, "loading");

      try {
        const res  = await fetch("https://api.web3forms.com/submit", {
          method : "POST",
          body   : new FormData(form)
        });
        const data = await res.json();

        if (data.success) {
          setState(form, "sent");
          const formType = FORM_TYPE_MAP[formName] || "contact";
          setTimeout(function () {
            window.location.href = "thank-you.html?form=" + formType;
          }, 500);
        } else {
          throw new Error(data.message || "Something went wrong. Please try again.");
        }

      } catch (err) {
        setState(form, "error", err.message || "Connection error. Check your internet and try again.");
      }
    });
  });

})();
