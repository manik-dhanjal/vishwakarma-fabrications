import React from "react";
import { Link } from "gatsby";
import { Logo } from "./brand";
import { Phone, Mail, Whatsapp, Instagram, Facebook, MapPin } from "./icons";
import products from "../data/products.json";
import site from "../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Logo variant="dark" showSub />
            <p style={{ color: "#9aa1a8", fontSize: 14, marginTop: 14, maxWidth: 320 }}>
              Rolling shutters, gates and steel fabrication — custom-built and
              fitted across Amroha and nearby for 30+ years.
            </p>
            <div className="mobilemenu__social" style={{ justifyContent: "flex-start", marginTop: 18 }}>
              <a href={site.phoneHref} aria-label="Call"><Phone size={20} /></a>
              <a href={site.whatsappHref} aria-label="WhatsApp"><Whatsapp size={20} /></a>
              <a href={site.emailHref} aria-label="Email"><Mail size={20} /></a>
              <a href={site.social.instagram} aria-label="Instagram"><Instagram size={20} /></a>
              <a href={site.social.facebook} aria-label="Facebook"><Facebook size={20} /></a>
              <a href={site.address.mapHref} aria-label="Location"><MapPin size={20} /></a>
            </div>
          </div>

          <div>
            <h4>Products</h4>
            <div className="footer__list">
              {products.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}/`}>{p.name}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="footer__list">
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
              <a href={site.emailHref}>{site.email}</a>
              <a href={site.address.mapHref}>{site.address.line1}<br />{site.address.line2}</a>
              <span style={{ color: "#9aa1a8" }}>{site.hours}</span>
            </div>
          </div>
        </div>
        <div className="footer__legal">
          © {new Date().getFullYear()} {site.name} · Amroha, Uttar Pradesh · All rights reserved.
        </div>
      </div>
    </footer>
  );
}
