import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { Logo } from "./brand";
import { Menu, Close, Phone, Mail, Whatsapp, Instagram, Facebook, MapPin } from "./icons";
import site from "../data/site";

/* Full-screen mobile menu overlay (dark, Forge & Steel). */
function MobileMenu({ open, onClose }) {
  // lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <div className={`mobilemenu${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open}>
      <div className="mobilemenu__top">
        <Logo variant="dark" showSub={false} size={36} />
        <button className="mobilemenu__close" onClick={onClose} aria-label="Close menu">
          <Close />
        </button>
      </div>

      <nav className="mobilemenu__items">
        {site.nav.map((item) => (
          <Link key={item.path} to={item.path} activeClassName="active" onClick={onClose}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mobilemenu__bottom">
        <div className="mobilemenu__callbar">
          <a className="btn btn--amber" href={site.phoneHref}>
            <Phone size={18} /> Call now
          </a>
          <a className="btn btn--outline" href={site.whatsappHref} style={{ color: "#f4f1ea", borderColor: "rgba(255,255,255,0.16)" }}>
            WhatsApp
          </a>
        </div>
        <div className="mobilemenu__social">
          <a href={site.phoneHref} aria-label="Call"><Phone /></a>
          <a href={site.emailHref} aria-label="Email"><Mail /></a>
          <a href={site.whatsappHref} aria-label="WhatsApp"><Whatsapp /></a>
          <a href={site.social.instagram} aria-label="Instagram"><Instagram /></a>
          <a href={site.social.facebook} aria-label="Facebook"><Facebook /></a>
          <a href={site.address.mapHref} aria-label="Location"><MapPin /></a>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header__inner">
        <Logo variant="dark" showSub />
        <nav className="header__links">
          {site.nav.map((item) => (
            <Link key={item.path} to={item.path} activeClassName="active">
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="header__phone" href={site.phoneHref}>
          <Phone size={16} /> {site.phoneDisplay}
        </a>
        <button className="header__burger" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
