import Link from "next/link";
import Image from "next/image";
import { BsLinkedin, BsInstagram, BsTwitterX, BsTelephone, BsEnvelope, BsGeoAlt } from "react-icons/bs";
import { site } from "@/content/site-data";
import Web3Form from "./Web3Form";

// Page links live in the nav, so the footer only carries brand, contact, newsletter
// and socials — no duplicate link columns.
const SOCIALS = [
  { href: site.social.linkedin, Icon: BsLinkedin, label: "BrandHeist on LinkedIn" },
  { href: site.social.instagram, Icon: BsInstagram, label: "BrandHeist on Instagram" },
  { href: site.social.x, Icon: BsTwitterX, label: "BrandHeist on X" },
];

const CONTACT = [
  { Icon: BsTelephone, label: site.phoneDisplay, href: site.phoneHref },
  { Icon: BsEnvelope, label: site.email, href: site.emailHref },
  { Icon: BsGeoAlt, label: site.address },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/[0.06] bg-[#070706]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 md:gap-16">
          {/* Brand + contact */}
          <div>
            <Link href="/" aria-label="BrandHeist home" className="inline-flex min-h-[44px] items-center gap-2.5">
              <Image src="/assets/img/brandheist-logo.svg" alt="" width={40} height={40} />
              <span className="font-heading text-xl font-extrabold">
                <span className="text-heading">Brand</span>
                <span className="text-accent">Heist</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#fffaf0]/60">
              Your customers are already searching. We make sure they find your brand first.
            </p>
            <ul className="mt-4 text-sm">
              {CONTACT.map(({ Icon, label, href }) => {
                const row = (
                  <>
                    <Icon className="shrink-0 text-accent" aria-hidden="true" />
                    {label}
                  </>
                );
                // Whole row (icon + text) is the tap target, at least 44px tall.
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="inline-flex min-h-[44px] items-center gap-3 text-[#fffaf0]/70 transition-colors hover:text-heading">
                        {row}
                      </a>
                    ) : (
                      <span className="inline-flex min-h-[44px] items-center gap-3 text-[#fffaf0]/70">{row}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:justify-self-end md:max-w-md md:w-full">
            <h4 className="font-heading text-base font-bold text-heading">Our Newsletter</h4>
            <p className="mb-4 mt-2 text-sm leading-relaxed text-[#fffaf0]/60">
              Sharp marketing insights, zero fluff. We only send when there&apos;s something worth reading.
            </p>
            <Web3Form name="newsletter" accessKey={site.web3forms.newsletter} sentMessage="Your subscription request has been sent. Thank you!">
              <div className="flex gap-2">
                <input type="email" name="email" aria-label="Email address" placeholder="Email address" required
                  className="min-w-0 flex-1 rounded-xl border border-transparent bg-white/[0.06] min-h-[44px] px-4 py-2.5 text-sm text-heading placeholder:text-[#fffaf0]/40 transition-[border-color,box-shadow,background-color] duration-200 focus:border-accent/20 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-accent/[0.06]" />
                <input type="submit" value="Subscribe"
                  className="min-h-[44px] cursor-pointer rounded-xl bg-accent px-4 py-2.5 text-sm font-extrabold text-contrast hover:brightness-110" />
              </div>
            </Web3Form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/[0.06] pb-24 pt-6 sm:flex-row sm:pb-6 sm:pr-20">
          {/* Sign-off: the site's cheeky side. A handwritten margin note rather
              than legal small print: "red flag" gets a coral highlighter stroke,
              "Marry us" a hand-drawn gold squiggle and links to the plan form (soft CTA). */}
          <div className="text-center sm:text-left">
            <p className="inline-block font-hand text-[26px] font-semibold leading-snug text-[#fffaf0]/85 sm:text-[28px]">
              You read the footer. That&apos;s a <span className="roast-highlight">red flag</span>.{" "}
              <Link href="/#get-free-audit" className="marry-link whitespace-nowrap font-bold text-accent">
                <span className="relative inline-block">
                  Marry us
                  <svg className="marry-squiggle" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 6 Q 10 1, 18 6 T 34 6 T 50 6 T 66 6 T 82 6 T 98 5" pathLength={1} />
                  </svg>
                </span>{" "}
                <span className="marry-ring inline-block" aria-hidden="true">💍</span>
              </Link>
            </p>
            <p className="mt-3 text-[13px] text-[#fffaf0]/45">
              &copy; {new Date().getFullYear()} BrandHeist. All rights reserved.
            </p>
          </div>
          <div className="flex gap-2">
            {SOCIALS.map(({ href, Icon, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.05] text-[#fffaf0]/60 transition-colors hover:bg-accent hover:text-contrast">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
