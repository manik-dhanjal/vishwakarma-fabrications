import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "gatsby";
import { Logo } from "./brand";
import { Menu, Close, Phone, Mail, Whatsapp, Instagram, Facebook, MapPin } from "./icons";
import { btnAmber, btnOutline } from "./ui";
import {
  trackPhoneCall,
  trackWhatsApp,
  trackEmail,
  trackDirections,
  trackSocialClick,
  trackMobileMenuOpen,
} from "../utils/analytics";
import site from "../data/site";

const navLink =
  "text-[#c2c8ce] no-underline text-[15px] font-medium py-1 border-b-2 border-transparent hover:text-bone";

const mobileLink =
  "text-[#dfdcd5] no-underline text-[28px] font-normal tracking-[0.3px] relative transition-colors duration-200 hover:text-forge";
const mobileLinkActive =
  "text-forge before:content-[''] before:absolute before:left-[-18px] before:top-1/2 before:w-[7px] before:h-[7px] before:rounded-full before:bg-forge before:-translate-y-1/2";

const menuBackground =
  "radial-gradient(70% 38% at 78% 8%, rgba(120,90,140,0.2), transparent 60%), radial-gradient(55% 30% at 50% 14%, rgba(224,122,47,0.1), transparent 70%), radial-gradient(130% 90% at 65% 0%, #2b2c33 0%, #1e2227 46%, #14171b 100%)";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/* Full-screen mobile menu overlay (dark, Forge & Steel). */
function MobileMenu({ open, onClose }: MobileMenuProps) {
  // lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col transition-[opacity,visibility] duration-[340ms] after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:shadow-[inset_0_0_140px_rgba(0,0,0,0.55)] ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ background: menuBackground }}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between pt-[22px] px-5">
        <Logo variant="dark" showSub={false} size={36} />
        <button
          className="w-11 h-11 flex items-center justify-center text-[#c8ccd0] bg-transparent border-0 cursor-pointer"
          onClick={onClose}
          aria-label="Close menu"
        >
          <Close />
        </button>
      </div>

      <nav className="flex-1 flex flex-col items-center justify-center gap-[42px] relative z-[2]">
        {site.nav.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={mobileLink}
            activeClassName={mobileLinkActive}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-6 pb-10 relative z-[2]">
        <div className="flex gap-[10px] mb-6">
          <a
            className={`${btnAmber} flex-1`}
            href={site.phoneHref}
            onClick={() => trackPhoneCall("mobile_menu")}
          >
            <Phone size={18} /> Call now
          </a>
          <a
            className={`${btnOutline} flex-1`}
            href={site.whatsappHref}
            onClick={() => trackWhatsApp("mobile_menu")}
            style={{ color: "#f4f1ea", borderColor: "rgba(255,255,255,0.16)" }}
          >
            WhatsApp
          </a>
        </div>
        <div className="flex items-center justify-center gap-[26px]">
          {[
            { href: site.phoneHref, label: "Call", icon: <Phone />, track: () => trackPhoneCall("mobile_menu_social") },
            { href: site.emailHref, label: "Email", icon: <Mail />, track: () => trackEmail("mobile_menu_social") },
            { href: site.whatsappHref, label: "WhatsApp", icon: <Whatsapp />, track: () => trackWhatsApp("mobile_menu_social") },
            { href: site.social.instagram, label: "Instagram", icon: <Instagram />, track: () => trackSocialClick("instagram", "mobile_menu_social") },
            { href: site.social.facebook, label: "Facebook", icon: <Facebook />, track: () => trackSocialClick("facebook", "mobile_menu_social") },
            { href: site.address.mapHref, label: "Location", icon: <MapPin />, track: () => trackDirections("mobile_menu_social") },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              onClick={s.track}
              className="text-iron flex transition-[color,transform] duration-200 hover:text-forge hover:-translate-y-0.5"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-graphite text-bone border-b-[3px] border-forge">
      <div className="max-w-site mx-auto px-6 flex items-center gap-5 min-h-[64px]">
        <Logo variant="dark" showSub />
        <nav className="flex gap-5 ml-auto max-[860px]:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={navLink}
              activeClassName="text-bone border-forge"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="inline-flex items-center gap-2 bg-forge text-[#1b1b1b] font-extrabold text-[14px] px-[15px] py-[9px] rounded-sm no-underline hover:bg-molten hover:text-white max-[860px]:hidden"
          href={site.phoneHref}
          onClick={() => trackPhoneCall("header")}
        >
          <Phone size={16} /> {site.phoneDisplay}
        </a>
        <button
          className="hidden max-[860px]:flex ml-auto w-11 h-11 items-center justify-center rounded-[11px] text-bone cursor-pointer bg-white/[0.06] border border-white/[0.08]"
          onClick={() => {
            setOpen(true);
            trackMobileMenuOpen();
          }}
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
