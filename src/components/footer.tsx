import * as React from "react";
import { Link } from "gatsby";
import { Logo } from "./brand";
import { Phone, Mail, Whatsapp, Instagram, Facebook, MapPin } from "./icons";
import {
  trackPhoneCall,
  trackWhatsApp,
  trackEmail,
  trackDirections,
  trackSocialClick,
} from "../utils/analytics";
import products from "../data/products";
import site from "../data/site";

const footerLink = "text-[#cbc5ba] no-underline text-[14px] hover:text-forge";
const socialLink =
  "text-[#cbc5ba] flex transition-[color,transform] duration-200 hover:text-forge hover:-translate-y-0.5";

export default function Footer() {
  return (
    <footer className="bg-graphite text-[#cbc5ba] border-t-[3px] border-forge pt-10 pb-8">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-8 max-[1024px]:grid-cols-2 max-[560px]:grid-cols-1">
          <div>
            <Logo variant="dark" showSub />
            <p className="text-[#9aa1a8] text-[14px] mt-[14px] max-w-[320px]">
              Rolling shutters and gates custom-built and fitted across Amroha
              and nearby for 35+ years.
            </p>
            <div className="flex items-center gap-[26px] justify-start mt-[18px]">
              <a
                href={site.phoneHref}
                aria-label="Call"
                className={socialLink}
                onClick={() => trackPhoneCall("footer_social")}
              >
                <Phone size={20} />
              </a>
              <a
                href={site.whatsappHref}
                aria-label="WhatsApp"
                className={socialLink}
                onClick={() => trackWhatsApp("footer_social")}
              >
                <Whatsapp size={20} />
              </a>
              <a
                href={site.emailHref}
                aria-label="Email"
                className={socialLink}
                onClick={() => trackEmail("footer_social")}
              >
                <Mail size={20} />
              </a>
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                className={socialLink}
                onClick={() => trackSocialClick("instagram", "footer")}
              >
                <Instagram size={20} />
              </a>
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                className={socialLink}
                onClick={() => trackSocialClick("facebook", "footer")}
              >
                <Facebook size={20} />
              </a>
              <a
                href={site.address.mapHref}
                aria-label="Location"
                className={socialLink}
                onClick={() => trackDirections("footer_social")}
              >
                <MapPin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-[14px] mt-0 mb-3">Products</h4>
            <div className="flex flex-col gap-2">
              {products.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}/`} className={footerLink}>
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-[14px] mt-0 mb-3">Contact</h4>
            <div className="flex flex-col gap-2">
              <a
                href={site.phoneHref}
                className={footerLink}
                onClick={() => trackPhoneCall("footer")}
              >
                {site.phoneDisplay}
              </a>
              <a
                href={site.emailHref}
                className={footerLink}
                onClick={() => trackEmail("footer")}
              >
                {site.email}
              </a>
              <a
                href={site.address.mapHref}
                className={footerLink}
                onClick={() => trackDirections("footer")}
              >
                {site.address.line1}
                <br />
                {site.address.line2}
              </a>
              <span className="text-[#9aa1a8] text-[14px]">{site.hours}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-5 border-t border-[#34393f] font-mono text-[12px] text-[#6f7780]">
          © {new Date().getFullYear()} {site.name} · Amroha, Uttar Pradesh · All
          rights reserved.
          <br />
          Built & designed by{" "}
          <a
            href="https://manikdhanjal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6f7780] no-underline hover:text-forge"
          >
            Manik Dhanjal
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
