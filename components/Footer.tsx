import Link from "next/link";
import Image from "next/image";
import { BsLinkedin, BsInstagram, BsTwitterX } from "react-icons/bs";
import { site } from "@/content/site-data";
import Web3Form from "./Web3Form";

const USEFUL_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Flex", href: "/#flex" },
  { label: "Arsenal", href: "/#arsenal" },
  { label: "Menu", href: "/#menu" },
  { label: "Blogs", href: "/blog/" },
  { label: "Crew", href: "/#crew" },
];

const MENU_LINKS = ["SEO & Socials", "Growth Marketing", "Design & Motion", "Web Development", "Content"];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-[#070706] pt-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div>
            <Link href="/" aria-label="BrandHeist home" className="flex items-center gap-2.5">
              <Image src="/assets/img/brandheist-logo.svg" alt="BrandHeist logo" width={44} height={44} />
              <span className="font-heading text-xl font-extrabold text-heading">BrandHeist</span>
            </Link>
            <div className="mt-4 space-y-2 text-sm text-[#fffaf0]/70">
              <p>{site.address}</p>
              <p><strong className="text-heading">Phone:</strong> {site.phoneDisplay}</p>
              <p><strong className="text-heading">Email:</strong> {site.email}</p>
            </div>
            <div className="mt-5 flex gap-3">
              {[
                { href: site.social.linkedin, Icon: BsLinkedin, label: "BrandHeist on LinkedIn" },
                { href: site.social.instagram, Icon: BsInstagram, label: "BrandHeist on Instagram" },
                { href: site.social.x, Icon: BsTwitterX, label: "BrandHeist on X" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#fffaf0]/70 transition hover:bg-accent hover:text-contrast">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <div>
              <h4 className="mb-4 font-heading text-base font-bold text-heading">Useful Links</h4>
              <ul className="space-y-2 text-sm">
                {USEFUL_LINKS.map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-[#fffaf0]/70 hover:text-accent">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-heading text-base font-bold text-heading">The Menu</h4>
              <ul className="space-y-2 text-sm">
                {MENU_LINKS.map((l) => (
                  <li key={l}><Link href="/#menu" className="text-[#fffaf0]/70 hover:text-accent">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 font-heading text-base font-bold text-heading">Our Newsletter</h4>
            <p className="mb-4 text-sm text-[#fffaf0]/70">
              Subscribe to our newsletter and receive the latest news about our products and services!
            </p>
            <Web3Form name="newsletter" accessKey={site.web3forms.newsletter} sentMessage="Your subscription request has been sent. Thank you!">
              <div className="flex gap-2">
                <input type="email" name="email" aria-label="Email address" placeholder="Email address" required
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-heading placeholder:text-[#fffaf0]/40 focus:border-accent focus:outline-none" />
                <input type="submit" value="Subscribe"
                  className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-extrabold text-contrast hover:brightness-110" />
              </div>
            </Web3Form>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 py-6 text-center text-sm text-[#fffaf0]/55">
          <p>&copy; <strong className="px-1 text-heading">BrandHeist</strong> &bull; All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
